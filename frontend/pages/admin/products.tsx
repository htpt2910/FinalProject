/* eslint-disable react/jsx-no-target-blank */
import React from "react"
import type { GetServerSideProps, InferGetServerSidePropsType } from "next"
import axios from "@/libs/axios"
import { Dog } from "@/libs/types"
import { TableComponent } from "@/components/tables/TableComponent"

export const getServerSideProps: GetServerSideProps<{
  products: Dog[]
}> = async () => {
  const { data: products } = await axios.get("/products/")
  return { props: { products } }
}

export default function Product({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <p>product</p>
            <input
              type="search"
              className="w-full pl-10 pr-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
              placeholder="Search..."
            />
            <TableComponent
              data={products}
              field_1={"Name"}
              field_2={"Breed"}
              field_3={"Price"}
            />
          </div>
        </div>
      </section>
    </>
  )
}
