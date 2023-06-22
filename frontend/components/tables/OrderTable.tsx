import React from "react"
import PropTypes from "prop-types"
import img from "../../assets/dog_food.webp"

import Image from "next/image"
import { Dog, Order } from "@/libs/types"
import { OrderRow } from "./OrderRow"
// components

interface CardTableProps {
  orders: Order[]
}

export default function OrderTable({ orders }: CardTableProps) {
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white "
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={"font-semibold text-lg text-blueGray-700 "}>
                Card Tables
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle bg-blueGray-50 text-blueGray-500 border-blueGray-100 border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                >
                  Client
                </th>
                <th
                  className={
                    "px-6 w-64 text-center align-middle bg-blueGray-50 text-blueGray-500 border-blueGray-100 border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold "
                  }
                >
                  Type
                </th>
                <th
                  className={
                    "px-6 text-center align-middle border bg-blueGray-50 text-blueGray-500 border-blueGray-100 border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold "
                  }
                >
                  Ordered day
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold  "
                  }
                >
                  Finish day
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                return <OrderRow key={index} order={order} />
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
