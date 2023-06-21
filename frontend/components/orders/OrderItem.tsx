import { Order } from "@/libs/types"
import Image from "next/image"
import img from "../../assets/dog_food.webp"
import { ubuntu } from "@/libs/font"
import { useEffect, useState } from "react"
import { useSelect } from "@mui/base"
import { Dog } from "@/libs/types"
interface OrderItemProps {
  order: Order
}

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

export const OrderItem = ({ order }: OrderItemProps) => {
  const [showAll, setShowAll] = useState(false)
  // const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone

  // function convertTZ(date: Date, tzString: string) {
  //   return new Date(
  //     (typeof date === "string" && date !== null
  //       ? new Date(date)
  //       : date
  //     ).toLocaleString("en-US", { timeZone: tzString })
  //   )
  // }

  // console.log("order not format: ", order.ordered_day)
  // const newOrderedDate = convertTZ(order.ordered_day, localTz)
  const newOrderedDate = new Date(order.ordered_day)
  // console.log("abc ", newOrderedDate)
  // const newFinishedDate = convertTZ(order.finished_day, localTz)

  /// chinhr utc tu dong locale theo area
  //TODO
  const weekday = weekdays[newOrderedDate.getDay()]
  const date = newOrderedDate.getUTCDate()
  const month = newOrderedDate.getUTCMonth()
  const year = newOrderedDate.getUTCFullYear()
  const second = newOrderedDate.getUTCSeconds()
  const minute = newOrderedDate.getUTCMinutes()
  var hour = newOrderedDate.getUTCHours() + 7
  let ampm
  if (hour >= 12) {
    hour = hour % 12
    ampm = "PM"
  } else ampm = "AM"
  const dayInFull = `${weekday} ${date}/${month}/${year} at ${hour}:${minute}:${second} ${ampm}`

  // console.log("day in full: ", dayInFull)

  return (
    <div className="bg-slate-50 m-5 rounded-lg p-3 text-center">
      <div className="flex ">
        <table className="w-full">
          <tbody>
            <tr>
              <th className="text-left">
                <p className="text-orange-500">Ordered day: {dayInFull}</p>
              </th>
              <th className="text-right">
                {order.finished_day ? (
                  <p className="text-teal-400">Completed</p>
                ) : (
                  <p className="text-cyan-400">In progress</p>
                )}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <p className={"text-gray-500 mb-2 text-start " + ubuntu.className}>
          Type: {order.type}
        </p>
        <div className="">
          {showAll ? (
            <>
              {order.products?.map((product: Dog, index: number) => {
                return (
                  <table className="my-3 w-full table-fixed" key={index}>
                    <tbody>
                      <tr>
                        <th className="w-">
                          <Image
                            src={product.image_uri}
                            alt="alt"
                            width={100}
                            height={100}
                          />
                        </th>
                        <th className="text-left">{product.product_name}</th>
                        <th className="w-fit text-right">{product.price}</th>
                      </tr>
                    </tbody>
                  </table>
                )
              })}
              <button
                className={
                  "opacity-50 border-2 border-gray-200 w-full border-double " +
                  ubuntu.className
                }
                onClick={() => setShowAll(false)}
              >
                Hide products
              </button>
            </>
          ) : (
            <>
              <table className="my-3 w-full table-fixed">
                <tbody>
                  <tr>
                    <th>
                      <Image
                        src={order.products[0].image_uri}
                        alt="alt"
                        width={100}
                        height={100}
                      />
                    </th>
                    <th className="text-left">
                      {order.products[0].product_name}
                    </th>
                    <th className="w-fit text-right">
                      {order.products[0].price}
                    </th>
                  </tr>
                </tbody>
              </table>
              {order.products.length > 1 ? (
                <button
                  className={
                    "opacity-50 border-2 border-gray-200 w-full border-double " +
                    ubuntu.className
                  }
                  onClick={() => setShowAll(true)}
                >
                  Show all products
                </button>
              ) : (
                <></>
              )}
            </>
          )}
          {/* ggo {JSON.stringify(order.products)} */}

          {/* so luong */}
        </div>
        <p className="text-end text-red-400 text-2xl">
          {order.total_price ? order.total_price : "1000$"}
        </p>

        <p>{order.total_price}</p>
      </div>
    </div>
  )
}
