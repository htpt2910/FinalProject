import { OrderItem } from "@/components/orders/OrderItem"
import axios from "@/libs/axios"
import { montserrat, ubuntu } from "@/libs/font"
import { Dog, Order, Service } from "@/libs/types"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"

//list orders of user

export const getServerSideProps: GetServerSideProps<{
  orders: Order[]
}> = async (context) => {
  const uid = context.query?.uid

  const { data: orders } = await axios.get(`/orders/${uid}/all`)
  const { data: image_uri } = await axios.get(`/users/${uid}/avatar`)

  const updatedOrders = await Promise.all<Order[]>(
    orders.map(async (order: Order, index: number) => {
      if (order.type === "shopping" || order.type === null) {
        const products = await Promise.all<any>(
          order.products.map(async (product: Dog, index: number) => {
            const { data } = await axios.get(`/products/${product.id}/image`)
            const image_uri = data.url
            return { ...product, image_uri }
          })
        )
        return { ...order, products }
      } else {
        var serviceNames: Service[] = []
        const services = await axios.get(`/orders/${order.id}/service`)
        const service_ids: string[] = services.data

        service_ids.map(async (id: string) => {
          const { data: service_names } = await axios.get(`/services/${id}`)
          console.log("service_name:  ", service_names)
          serviceNames.push(service_names)
        })

        return { ...order, services: serviceNames }
      }
    })
  )

  return { props: { orders: updatedOrders } }
}

export default function ListOrders({
  orders,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={"mt-32 mx-96 bg-white " + montserrat.className}>
      <p className={"text-center text-2xl text-gray-700 " + ubuntu.className}>
        My orders
      </p>
      <div className={"flex justify-end mt-10 mr-10 " + ubuntu.className}>
        <p>Sort by: </p>
        <form className="mx-2">
          <label>
            <input type="checkbox" className="accent-orange-400 rounded-sm" />{" "}
            Shopping
          </label>
          <label className="mx-2">
            <input type="checkbox" className="accent-orange-400 rounded-sm" />{" "}
            Service
          </label>
          <label>
            <input type="checkbox" className="accent-orange-400 rounded-sm" />{" "}
            Not complete
          </label>
          <label className="mx-2">
            <input type="checkbox" className="accent-orange-400 rounded-sm" />{" "}
            Completed
          </label>

          <input id="submit" type="submit" className="hidden" />
        </form>
        <label htmlFor="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            id="search"
            className="w-5 h-5"
          >
            <path
              fill="#231f20"
              d="M242.36,96.64l-7.41,13a95.68,95.68,0,0,0-130.47,35.93l-13-7.4A110.69,110.69,0,0,1,242.36,96.64Z"
            ></path>
            <path
              fill="#231f20"
              d="M322.36,58.4c-68.1-73-182.91-77-255.92-8.91A181.08,181.08,0,0,0,307.87,319.32q2.84-2.43,5.59-5c1.84-1.71,3.63-3.46,5.38-5.23A181.08,181.08,0,0,0,322.36,58.4Zm14.73,128.7a147.21,147.21,0,0,1-147,142.1q-2.61,0-5.25-.09A146.27,146.27,0,0,1,82.31,282.4C26.94,223,30.19,129.7,89.55,74.33A147.21,147.21,0,0,1,337.09,187.1Z"
            ></path>
            <path
              fill="#fff"
              d="M242.36,96.64l-7.41,13a95.68,95.68,0,0,0-130.47,35.93l-13-7.4A110.69,110.69,0,0,1,242.36,96.64Z"
            ></path>
            <path
              fill="#231f20"
              d="M494.87,455.2,371.74,327.92l-49,45.73L445.89,501a33.3,33.3,0,0,0,23.3,10.58l1.19,0a33.53,33.53,0,0,0,24.49-56.39Z"
            ></path>
            <line
              x1="352.47"
              x2="308.34"
              y1="356.15"
              y2="308.84"
              fill="none"
            ></line>
            <rect
              width="15"
              height="64.69"
              x="322.9"
              y="300.15"
              fill="#231f20"
              transform="rotate(-43.01 330.367 332.477)"
            ></rect>
            <path
              fill="#231f20"
              d="M242.36,96.64l-7.41,13a95.68,95.68,0,0,0-130.47,35.93l-13-7.4A110.69,110.69,0,0,1,242.36,96.64Z"
            ></path>
          </svg>
        </label>
      </div>

      <div className="mt-10">
        {/* {JSON.stringify(orders)} */}
        {orders?.reverse().map((order, index) => {
          return <OrderItem key={index} order={order} />
        })}
      </div>
    </div>
  )
}
