import Image from "next/image"
import dogImage from "../../assets/hero.png"
import { dogs } from "@/data/Dogs"
import { comfortaa, montserrat, ubuntu } from "@/libs/font"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from "@/libs/axios"
import { Dog } from "@/libs/types"
import type { InferGetServerSidePropsType, GetServerSideProps } from "next"

export const getServerSideProps: GetServerSideProps<{
  product: Dog
  image_uri: string
}> = async (context) => {
  const pid = context.params?.pid
  const { data: product } = await axios.get(`/products/${pid}`)
  const { data: image_uri } = await axios.get(`/products/${pid}/image`)

  return { props: { product, image_uri: image_uri.url } }
}

const ProductDetail = ({
  product,
  image_uri,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className={"grid grid-cols-2 mt-28 bg-gray-200 bg-opacity-20 p-10"}>
      <div>
        <Image
          src={image_uri}
          alt="alt"
          width={500}
          height={500}
          className="mx-auto"
        />
      </div>
      <div className={"" + montserrat.className}>
        <p className="text-3xl text-gray-800 mb-10">{product?.product_name}</p>
        <div className={"bg-gray-50 " + ubuntu.className}>
          <p className="text-xl mb-3">About</p>
          <p className="my-5 ">
            Breed:
            <span className={"font-bold ml-10  " + comfortaa.className}>
              {product?.breed}
            </span>
          </p>
          <p className="my-5 ">
            Age:
            <span className={"font-bold ml-10  " + comfortaa.className}>
              {product?.desc}
            </span>
          </p>
          <div className="my-5 flex justify-start bg-red-100">
            <p>Price: </p>
            <span
              className={
                "font-bold text-3xl text-red-600 ml-20 " + comfortaa.className
              }
            >
              {product?.price} VND
            </span>
          </div>
          <p className="my-5 ">
            Quantity:{" "}
            <span className={"font-bold ml-10  " + comfortaa.className}>
              {product?.quantity}
            </span>{" "}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
