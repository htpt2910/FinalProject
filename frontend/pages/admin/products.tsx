/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect } from "react"
import type { GetServerSideProps, InferGetServerSidePropsType } from "next"
import axios from "@/libs/axios"
import { Dog } from "@/libs/types"
import { TableComponent } from "@/components/tables/TableComponent"
import ProductTable from "@/components/tables/ProductTable"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

export const getServerSideProps: GetServerSideProps<{
  products: Dog[]
}> = async () => {
  const { data: products } = await axios.get("/products/")

  const updatedProducts = await Promise.all<Dog>(
    products.map(async (product: Dog, index: number) => {
      const { data } = await axios.get(`/products/${product.id}/image`)
      const image_uri = data.url
      return {
        ...product,
        image_uri,
      }
    })
  )
  return { props: { products: updatedProducts } }
}

export default function Product({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (!session) router.push("/")
  })
  return (
    <>
      {session && (
        <div className="flex flex-wrap">
          <div className="-mt-20 w-full px-4">
            <ProductTable products={products} color={"light"} />
          </div>
        </div>
      )}
    </>
  )
}
