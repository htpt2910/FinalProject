import axios from "@/libs/axios"
import convertDaySetting from "@/libs/convertDay"
import { montserrat } from "@/libs/font"
import { Order } from "@/libs/types"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

interface ProductRowProps {
  order: Order
}
export const OrderRow = ({ order }: ProductRowProps) => {
  const [editMode, setEditMode] = useState(false)
  const [finishDay, setFinishDay] = useState("")
  const router = useRouter()

  async function deleteOrder(id: number) {
    const response = await axios.delete(`/orders/${id}`)
    return
  }
  async function updateFinishDay(order_id: number, finish_day: string) {
    const date = new Date(finishDay)
    const response = await axios.patch(`/orders/${order_id}`, {
      finished_day: date,
    })

    setEditMode(false)
  }

  function handleChange(event: any) {
    setFinishDay(event.target.value)
  }
  return (
    <tr className={"text-center " + montserrat.className}>
      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4 text-left flex items-center">
        <Image
          src={order?.image_uri}
          className="h-12 w-12 bg-white rounded-full border"
          alt="..."
          width={200}
          height={200}
        />{" "}
        <span className={"ml-3 font-bold text-blueGray-600 "}>
          {order.user.name}
        </span>
      </th>
      <td className="text-center">{order?.type}</td>
      <td className="capitalize text-center border-t-0 px-6 align-middle border-l-0 text-sm  border-r-0 whitespace-nowrap p-4">
        {convertDaySetting(order.ordered_day)}
      </td>

      <td className="border-t-0 text-center px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
        {editMode ? (
          <input
            type="datetime-local"
            placeholder="complete day..."
            onChange={handleChange}
          />
        ) : order.finished_day ? (
          convertDaySetting(order.finished_day)
        ) : (
          "waiting"
        )}
      </td>
      <td className="px-20 py-4">
        <div className="flex justify-end gap-4">
          <button
            x-data="{ tooltip: 'Delete' }"
            onClick={() => {
              const result = confirm(
                `Are you sure you want to delete order "${order?.id}"?`
              )
              if (result) {
                deleteOrder(order?.id)

                window.alert("Delete order successfully!")
                router.push("/admin/orders")
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
          <button>
            {editMode ? (
              <div className="flex">
                <svg
                  onClick={() => {
                    updateFinishDay(order?.id, finishDay)
                  }}
                  stroke="currentColor"
                  fill="currentColor"
                  className="h-6 w-6 "
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path>
                </svg>
                <svg
                  onClick={() => {
                    setEditMode(false)
                    setFinishDay("")
                  }}
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="ml-2 h-6 w-6 "
                  aria-hidden="true"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            ) : (
              <svg
                onClick={() => setEditMode(true)}
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
            )}
          </button>
        </div>
      </td>
    </tr>
  )
}
