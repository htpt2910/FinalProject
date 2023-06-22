import OrderTable from "@/components/tables/OrderTable"
import axios from "@/libs/axios"
import { Dog, Order, User } from "@/libs/types"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export const getServerSideProps: GetServerSideProps<{
  orders: Order[]
}> = async () => {
  const { data: orders } = await axios.get("/orders/")

  // const updatedOrders = await Promise.all<Order[]>(
  //   orders.map(async (order: Order, index: number) => {

  //     const { data } = await axios.get(`/users/${order.user_id}/avatar`)
  //     const image_uri = data.url
  //     return { ...order, image_uri }
  //   })
  // )

  const updatedOrders = await Promise.all<Order[]>(
    orders.map(async (order: Order, index: number) => {
      const { data: user } = await axios.get(`/users/${order.user_id}`)

      const { data } = await axios.get(`/users/${user.id}/avatar`)
      const image_uri = data.url
      return {
        ...order,
        user,
        image_uri,
      }
    })
  )

  console.log("updatedOrders: ", updatedOrders)
  return { props: { orders: updatedOrders } }
}

export default function OrderManagement({
  orders,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession()
  const router = useRouter()
  // useEffect(() => {
  //   if (!session) router.push("/")
  // })
  return (
    <>
      {session && (
        <div className="flex flex-wrap">
          <div className="-mt-20 w-full px-4">
            <OrderTable orders={orders} />
          </div>
        </div>
      )}
    </>
  )
}
