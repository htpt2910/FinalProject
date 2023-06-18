import { comfortaa } from "@/libs/font"
import { dogs } from "@/data/Dogs"
import { ProductCard } from "../products/ProductCard"
import { useEffect, useState } from "react"
import axios from "@/libs/axios"
import { Dog } from "@/libs/types"
import ImageStuff from "../../assets/dog_food.webp"

interface ListProductsProps {
  products: Dog[]
}
export const ListProducts = (props: ListProductsProps) => {
  // const [listDogs, setListDogs] = useState<Dog[]>(props.products)

  return (
    <div className="mt-32 ">
      <p
        className={"text-5xl text-gray-700 text-center " + comfortaa.className}
      >
        {`Some members of our family`}
      </p>
      <a
        href="#"
        className="flex justify-end text-orange-600 underline"
      >{`See more >`}</a>
      <div className="flex mt-20 mx-36 flex-wrap">
        {props.products.map((dog, idx) => {
          if (idx > 4) return
          return (
            <ProductCard
              key={dog.id}
              id={dog.id}
              product_name={dog.product_name}
              breed={dog.breed}
              desc={dog.desc}
              price={dog.price}
              image={ImageStuff}
            />
          )
        })}
      </div>
    </div>
  )
}
