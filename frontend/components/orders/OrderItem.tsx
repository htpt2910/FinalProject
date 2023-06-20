import { Order } from "@/libs/types"
import Image from "next/image"
import img from "../../assets/dog_food.webp"
interface OrderItemProps {
  order: Order
}

export const OrderItem = ({ order }: OrderItemProps) => {
  return (
    <div>
      <div className="flex ">
        <p className="">Ordered day: {JSON.stringify(order.ordered_day)}</p>
        <p className="">{order.finished_day ? "Completed" : "In progress"}</p>
      </div>
      <div>
        <p>Type: {order.type}</p>
        <div className="flex">
          <Image
            src={img}
            alt="alt"
            width={50}
            height={50}
            className="rounded-full"
          />
          <p>product.name</p>
          <p>product.price</p>
          {/* so luong */}
        </div>
        <p>x1</p>
        <button>Show all products</button>
        <p>Price order total</p>
      </div>
    </div>
  )
}
