import Image from "next/image"
import { Row } from "./Row"
import { Dog, User } from "@/libs/types"
import { Type } from "typescript"
import { ubuntu } from "@/libs/font"

interface TableComponentProps {
  data: any
}

export const TableComponent = ({ data }: TableComponentProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead>
          <tr>
            <th className={"text-2xl p-5 text-gray-700 " + ubuntu.className}>
              Users Management
            </th>
          </tr>
        </thead>
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900 text-center"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900 text-center"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900 text-center"
            >
              Phone
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900 text-center"
            ></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {data.map((user: User, index: number) => {
            return (
              <Row
                key={index}
                id={user.id}
                name={user.name}
                email={user.email}
                phone={user.phone}
                image_uri={user.image_uri}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
