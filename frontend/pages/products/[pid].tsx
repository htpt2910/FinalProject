import { comfortaa, montserrat, ubuntu } from "@/libs/font"
import { Dog, User } from "@/libs/types"
import type { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getServerSession } from "next-auth/next"
import { options } from "../api/auth/[...nextauth]"
import { ProductItem } from "@/components/products/ProductItem"
import axios from "@/libs/axios"

type UpdateDogSchema = Partial<
  Omit<Dog, "breed"> & {
    breed: string
  }
>
export const getServerSideProps: GetServerSideProps<{
  product: UpdateDogSchema
  image_uri: string
  user: User
}> = async (context) => {
  const session = await getServerSession(context.req, context.res, options)

  const pid = context.params?.pid

  const { data: product } = await axios.get(`/products/${pid}`)
  const { data: image_uri } = await axios.get(`/products/${pid}/image`)
  const { data: user } = await axios.get(`/users/${session?.user?.email}/info`)

  const dog: UpdateDogSchema = {
    ...product,
    breed: product.breed.id,
  }

  return {
    props: { product: dog, image_uri: image_uri.url, user: user },
  }
}

const ProductDetail = ({
  product,
  image_uri,
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [userInfo, setUserInfo] = useState<User>(user)
  const [editMode, setEditMode] = useState(false) // set edit mode -> false -> khong hieenj input chi hien label, true k hien label hien input
  const { data: session } = useSession()
  const [image, setImage] = useState(image_uri)
  const [productInfo, setProductInfo] = useState<UpdateDogSchema>(product)

  async function handleAddToCart() {
    console.log("click add to card")
    if (session) {
      if (user?.products_in_cart.includes(String(product.id))) {
        window.alert("Product has already in cart!")
        return
      } else {
        const updateCart = await axios.patch(`/users/${userInfo?.id}`, {
          products_in_cart: userInfo?.products_in_cart + "," + `${product.id}`,
        })
        window.alert("Add to card successfully")
      }
    } else {
      window.alert("Please login first to add.")
      signIn()
    }
  }

  function handleChange(event: any) {
    const { name, value } = event.target
    console.log("name: ", name, " value: ", value)
    setProductInfo((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      }
    })
  }

  function handleUploadImage(event: any) {
    const image = event?.target.files[0]
    setImage(image)
  }

  function handleReset() {
    setProductInfo(product)
  }

  async function updateProductInfo() {
    const response = await axios.patch(`/products/${product?.id}`, {
      ...productInfo,
      breed_id: productInfo.breed,
    })

    if (image !== image_uri) {
      const formData = new FormData()
      formData.set("file", image)
      const updateImage = await axios.patch(
        `/products/${productInfo?.id}/image`,
        formData
      )
    }
    window.alert("Update product successfully!")
    setEditMode(false)
  }

  return (
    <div>
      <div className={"grid grid-cols-2 p-10 pt-32"}>
        <div>
          <Image
            src={typeof image === "string" ? image : URL.createObjectURL(image)}
            alt="alt1"
            width={500}
            height={500}
            className="mx-auto"
          />
          {editMode ? (
            <button className="w-full bg-gray-50 py-2">
              <label
                htmlFor="avatar"
                className={" text-gray-400 opacity-80 " + montserrat.className}
              >
                Click to change avatar
              </label>
              <input
                id="avatar"
                type="file"
                className="hidden"
                onChange={handleUploadImage}
              />
            </button>
          ) : (
            <></>
          )}
        </div>

        <div>
          <div
            className={
              "flex justify-start items-start px-5 " + montserrat.className
            }
          >
            {editMode ? (
              <>
                <p>Name:</p>
                <textarea
                  name="product_name"
                  value={productInfo?.product_name}
                  placeholder={productInfo?.product_name}
                  className="w-full overflow-scroll ml-5 "
                  onChange={handleChange}
                />
              </>
            ) : (
              <p className="text-3xl text-gray-800 mb-10">
                {productInfo?.product_name}
              </p>
            )}
            {editMode ? (
              <></>
            ) : userInfo?.role === 1 ? (
              <button className="ml-2" onClick={() => setEditMode(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                  x-tooltip="tooltip"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
            ) : (
              <></>
            )}
          </div>
          <table className={" " + montserrat.className}>
            <tbody>
              <ProductItem
                name={"breed"}
                editMode={editMode}
                field={"Breed: "}
                content={productInfo?.breed}
                handleChange={handleChange}
              />
              <ProductItem
                name={"age"}
                editMode={editMode}
                field={"Age"}
                content={productInfo?.age}
                handleChange={handleChange}
              />
              <ProductItem
                name="about"
                editMode={editMode}
                field={"About"}
                content={productInfo?.desc}
                handleChange={handleChange}
              />
              <ProductItem
                name="price"
                editMode={editMode}
                field={"Price"}
                content={productInfo?.price}
                handleChange={handleChange}
              />
            </tbody>
          </table>
        </div>
      </div>
      {editMode ? (
        <div className="flex relative -right-[54rem]">
          <button
            className="flex items-center mr-2 rounded-lg bg-red-50 border-2 border-red-500 text-red-500 py-2 px-5 "
            onClick={() => {
              setEditMode(false)
              handleReset()
            }}
          >
            Cancel
          </button>
          <button
            className="py-2 px-5 bg-red-500 rounded-lg border-2 border-red-500 text-white "
            onClick={updateProductInfo}
          >
            Save
          </button>
        </div>
      ) : userInfo.role === 1 ? (
        <></>
      ) : (
        <div className="flex relative -right-[44rem]">
          <button
            className="flex items-center mr-7  bg-red-50 border-2 border-red-500 text-red-500 py-2 px-5 "
            onClick={handleAddToCart}
          >
            <span>
              <svg
                className="w-12 h-12 mr-6"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path>
              </svg>
            </span>
            <span>Add to cart</span>
          </button>
          <button className="py-2 px-5 bg-red-500 border-2 border-red-500 text-white">
            <Link
              href={{
                pathname: `/orders/new`,
                query: {
                  productIds: JSON.stringify(product.id),
                  user_id: JSON.stringify(user?.id),
                  totalPrice: JSON.stringify(product.price),
                  productsInCart: JSON.stringify(userInfo?.products_in_cart),
                },
              }}
            >
              Order now!
            </Link>
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
