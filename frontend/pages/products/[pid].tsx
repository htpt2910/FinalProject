import axios from "@/libs/axios"
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

export const getServerSideProps: GetServerSideProps<{
  product: Dog
  image_uri: string
  user: User
}> = async (context) => {
  const session = await getServerSession(context.req, context.res, options)
  console.log("session: ", session)

  const pid = context.params?.pid

  const { data: product } = await axios.get(`/products/${pid}`)
  const { data: image_uri } = await axios.get(`/products/${pid}/image`)
  const { data: user } = await axios.get(`/users/${session?.user?.email}/info`)
  console.log("user: ", user)

  return {
    props: { product, image_uri: image_uri.url, user: user },
  }
}

const ProductDetail = ({
  product,
  image_uri,
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [userInfo, setUserInfo] = useState<User>()
  const [id, setId] = useState<string | null>()
  const { data: session } = useSession()
  //   return
  // }

  // getUserInfo()

  //TODO
  async function handleAddToCart() {
    if (session) {
      console.log(
        "in cart: ",
        user?.products_in_cart,
        typeof user?.products_in_cart
      )
      console.log("hoho: ", user?.products_in_cart.includes(String(product.id)))
      if (user?.products_in_cart.includes(String(product.id))) {
        window.alert("Product has already in cart!")
        return
      } else {
        const updateCart = await axios.patch(`/users/${userInfo?.id}`, {
          products_in_cart: userInfo?.products_in_cart + "," + `${product.id}`,
        })
        console.log("update : ", updateCart)
      }
    } else {
      window.alert("Please login first to add.")
      signIn()
    }
  }

  return (
    <div className={"grid grid-cols-2 p-10 pt-32"}>
      <div>
        <Image
          src={image_uri}
          alt="alt1"
          width={500}
          height={500}
          className="mx-auto"
        />
      </div>
      <div className={"" + montserrat.className}>
        <p className="text-3xl text-gray-800 mb-10">{product?.product_name}</p>
        <div className={" " + ubuntu.className}>
          <p className="my-5 ">
            Breed:
            <span className={"font-bold ml-10  " + comfortaa.className}>
              {product?.breed.name}
            </span>
          </p>
          <p className="my-5 ">
            Age:
            <span className={"font-bold ml-10  " + comfortaa.className}>
              {product?.age}
            </span>
          </p>
          <p className="my-5 ">
            About:
            <span className={"font-bold ml-10  " + comfortaa.className}>
              {product?.desc}
            </span>
          </p>
          <div className="my-5 flex justify-start">
            <p>Price: </p>
            <span
              className={
                "font-bold text-3xl text-red-600 ml-20 " + comfortaa.className
              }
            >
              {product?.price} $
            </span>
          </div>
          <div className="flex justify-start">
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
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
