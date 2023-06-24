import { dogs } from "@/data/Dogs"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
interface ProductCardProps {
  id: number
  product_name: string
  breed: string
  desc: string
  price: number
  image: any
}

export const ProductCard = (props: ProductCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg w-52 h-11/12 shadow m-1">
      <Link
        href={{
          pathname: `/products/${props.id}`,
        }}
      >
        {props.image && (
          <Image
            src={props.image}
            alt="alt"
            className="rounded-t-lg w-full "
            width={200}
            height={200}
          />
        )}
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {props.product_name} - {props.breed}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {props.desc.substring(0, 50)}...
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {props.price}
          </p>
        </div>
      </Link>
    </div>
  )
}
