import axios from "@/libs/axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
interface RowProps {
  id: number
  name: string
  email: string
  phone: string
  image_uri: string
}
export const Row = (props: RowProps) => {
  const router = useRouter()
  async function deleteUser(id: number) {
    console.log("id : ", id)
    const response = await axios.delete(`/users/${id}`)
    console.log("response: ", response.data)
    return
  }

  return (
    <tr className="hover:bg-gray-50">
      <th className="flex gap-3 pl-14 pr-24 py-4 font-normal text-gray-900">
        <div className="relative h-10 w-10">
          {props.image_uri && (
            <Image
              width={50}
              height={50}
              className="h-full w-full rounded-full object-cover object-center"
              src={props.image_uri}
              alt=""
            />
          )}
          <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
        </div>
        <div className="text-sm">
          <div className="font-medium text-gray-700">{props.name}</div>
          <div className="text-gray-400">{props.email}</div>
        </div>
      </th>
      <td className="px-6 py-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
          {props.email}
        </span>
      </td>
      <td className="px-20 py-4">{props.phone}</td>
      <td className="px-20 py-4">
        <div className="flex justify-end gap-4">
          <button
            x-data="{ tooltip: 'Delete' }"
            onClick={() => {
              const result = confirm(
                `Are you sure you want to delete user "${props.name}"?`
              )
              if (result) {
                deleteUser(props.id)
                window.alert("Delete user successfully!")
                router.push("/admin/users")
              }
            }}
          >
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
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
          <Link
            x-data="{ tooltip: 'Edite' }"
            href={{
              pathname: `/users/${props.id}`,
            }}
          >
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
          </Link>
        </div>
      </td>
    </tr>
  )
}
