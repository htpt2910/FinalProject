import axios from "@/libs/axios"
import { Dog } from "@/libs/types"
import Image from "next/image"
import { useEffect, useState } from "react"

interface ProductRowProps {
  dog: Dog
  color: string
}
export const ProductRow = ({ dog, color }: ProductRowProps) => {
  return (
    <tr>
      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
        <Image
          src={dog.image_uri}
          className="h-12 w-12 bg-white rounded-full border"
          alt="..."
          width={200}
          height={200}
        />{" "}
        <span
          className={
            "ml-3 font-bold " +
            +(color === "light" ? "text-blueGray-600" : "text-white")
          }
        >
          {dog.product_name}
        </span>
      </th>
      <td className="capitalize border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {dog.breed.name}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <i className="fas fa-circle text-orange-500 mr-2"></i> pending
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <div className="flex">...</div>
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <div className="flex items-center">
          <span className="mr-2">60%</span>
          <div className="relative w-full">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
              <div
                style={{ width: "60%" }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
              ></div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  )
}
