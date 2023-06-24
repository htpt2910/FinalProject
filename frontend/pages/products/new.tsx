import { ProductItem } from "@/components/products/ProductItem"
import axios from "@/libs/axios"
import { montserrat, ubuntu } from "@/libs/font"
import { Dog } from "@/libs/types"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"

type CreateDogSchema = Partial<
  Omit<Dog, "breed"> & {
    breed: string
  }
>

export default function CreateProductPage() {
  const [productInfo, setProductInfo] = useState<CreateDogSchema>({})
  const [image, setImage] = useState()
  const router = useRouter()

  function handleChange(event: any) {
    const { name, value } = event.target
    console.log("productInfo: ", productInfo)

    console.log(name + ": " + value)
    setProductInfo((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      }
    })
  }

  function handleUploadImage(event: any) {
    setImage(event.target.files[0])
  }

  async function updateProductInfo() {
    if (image === null || image === undefined) {
      window.alert("Please choose product image!")
    } else {
      try {
        const response = await axios.post(`/products/`, {
          product_name: productInfo.product_name,
          breed_id: productInfo.breed, // lay breed id
          desc: productInfo.desc,
          price: productInfo.price,
          age: productInfo.age,
          order_id: productInfo.order_id,
        })

        const formData = new FormData()
        formData.set("file", image)
        const { data: image_uri } = await axios.patch(
          `/products/${response?.data.id}/image`,
          formData
        )

        window.alert("Create product successfully")
        router.push("/admin/products")
      } catch (error) {
        console.error(error)
      }
    }
  }

  function handleReset() {
    setProductInfo({})
    setImage(undefined)
  }

  return (
    <div>
      <p
        className={
          "text-center text-3xl text-gray-700 py-10 " + ubuntu.className
        }
      >
        Add new product
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div
            className={
              "flex relative bg-gray-50 w-[40rem] h-96 border-orange-300 border-2 rounded-md " +
              (image === undefined
                ? "justify-center items-center opacity-50"
                : "justify-end items-start ")
            }
          >
            {image && (
              <Image
                src={
                  typeof image === "string" ? image : URL.createObjectURL(image)
                }
                alt="image"
                fill
              />
            )}

            <label
              htmlFor="file-upload"
              className={
                "flex z-50 p-2 " +
                (image === undefined ? "" : "bg-orange-300 text-amber-100 ")
              }
            >
              <span className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6 "
                  x-tooltip="tooltip"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
              </span>
              {image === undefined ? "Click here to upload image" : ""}
            </label>

            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleUploadImage}
            />
          </div>
        </div>
        <div>
          <table>
            <tbody>
              <ProductItem
                editMode={true}
                field={"Name"}
                content={productInfo?.product_name}
                name={"product_name"}
                placeholder="product name..."
                handleChange={handleChange}
              />
              <ProductItem
                editMode={true}
                field={"Breed"}
                content={productInfo?.breed}
                name={"breed"}
                placeholder="Breed..."
                handleChange={handleChange}
              />
              <ProductItem
                editMode={true}
                field={"age"}
                content={productInfo?.age}
                name={"age"}
                placeholder="Age..."
                handleChange={handleChange}
              />
              <ProductItem
                editMode={true}
                field={"About"}
                content={productInfo?.desc}
                name={"desc"}
                placeholder="Description..."
                handleChange={handleChange}
              />
              <ProductItem
                editMode={true}
                field={"price"}
                content={productInfo?.price}
                name={"price"}
                placeholder="Price..."
                handleChange={handleChange}
              />
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <button
          className="flex items-center mr-2 rounded-lg bg-slate-50 border-2 border-sky-950 text-sky-950 py-2 px-5 "
          onClick={() => {
            handleReset()
          }}
        >
          Reset
        </button>
        <button
          className="py-2 px-5 bg-sky-950 rounded-lg border-2 border-sky-950 text-white "
          onClick={updateProductInfo}
        >
          Save
        </button>
      </div>
    </div>
  )
}
