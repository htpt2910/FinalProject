import Image from "next/image"
import { Row } from "./Row"
import { Dog, User } from "@/libs/types"
import { Type } from "typescript"

interface TableComponentProps {
  data: any
  field_1: string
  field_2: string
  field_3: string
}

export const TableComponent = (props: TableComponentProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              {props.field_1}
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              {props.field_2}
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              {props.field_3}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {props.field_2 !== "Breed"
            ? props.data.map((user: User, index: number) => {
                return (
                  <Row
                    key={index}
                    field1={user.name}
                    field2={user.email}
                    field3={user.phone}
                    field4={user.image_uri}
                  />
                )
              })
            : props.data.map((product: Dog, index: number) => {
                return (
                  <Row
                    key={index}
                    field1={product.product_name}
                    field2={product.breed}
                    field3={product.price}
                    field4={product.image_uri}
                  />
                )
              })}
        </tbody>
      </table>
    </div>
  )
}
