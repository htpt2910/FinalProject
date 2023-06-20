import { OrderItem } from "@/components/orders/OrderItem"
import axios from "@/libs/axios"
import { Order, User } from "@/libs/types"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"

export const getServerSideProps: GetServerSideProps<{
  orders: Order[]
}> = async (context) => {
  const uid = context.params?.uid

  console.log("uid: ", uid)
  const { data: orders } = await axios.get(`/orders/${uid}`)
  // const { data: image_uri } = await axios.get(`/users/${uid}/avatar`)

  console.log("orders: ", orders)
  return { props: { orders } }
}

export default function ListOrders({
  orders,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="mt-32">
      <div>Sort by options area</div>
      <div>List orders</div>
      {orders.map((order, index) => {
        return <OrderItem key={index} order={order} />
      })}
    </div>
  )
}
