import { comfortaa } from "@/libs/font"
import { dogs } from "@/data/Dogs"
import { ProductCard } from "../products/ProductCard"
import { useEffect, useState } from "react"
import axios from "@/libs/axios"
import { Dog } from "@/libs/types"

export const ListProducts = () => {
  const [listDogs, setListDogs] = useState<Dog[]>([])

  useEffect(() => {
    axios.get("/products/").then((res) => {
      setListDogs(res.data)
    })
  }, [])

  return (
    <div className="mt-32 ">
      <p
        className={"text-5xl text-gray-700 text-center " + comfortaa.className}
      >
        {`Let's find yourself "the one"`}
      </p>
      <div className="flex mt-20">
        {listDogs.map((dog, idx) => {
          return (
            <ProductCard
              key={dog.id}
              id={dog.id}
              product_name={dog.product_name}
              breed={dog.breed}
              desc={dog.desc}
              price={dog.price}
            />
          )
        })}
      </div>
    </div>
  )
}
