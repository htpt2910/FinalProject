import axios from "@/libs/axios"
import { comfortaa, ubuntu } from "@/libs/font"
import { Breed, Dog } from "@/libs/types"
import { useEffect, useState } from "react"
import { ProductCard } from "../products/ProductCard"

interface ViewResultAreaProps {
  breed_name: string
  breed_id: number | undefined
}

export const ViewResultArea = ({
  breed_name,
  breed_id,
}: ViewResultAreaProps) => {
  const [breedInfo, setBreedInfo] = useState<Breed>()
  const [allOfBreed, setAllOfBreed] = useState<Dog[]>()
  useEffect(() => {
    async function fetchBreedInfo() {
      console.log(breed_name)
      const response = await axios.get(`/breeds/${breed_name}`)
      const productsByBreed = await axios.get(`/products/by_breed/${breed_id}`)

      const updatedProducts = await Promise.all<Dog>(
        productsByBreed.data.map(async (product: Dog, index: number) => {
          const { data } = await axios.get(`/products/${product.id}/image`)
          const image_uri = data.url
          return {
            ...product,
            image_uri,
          }
        })
      )

      setBreedInfo(response.data)
      setAllOfBreed(updatedProducts)
    }
    if (breed_name !== "" || breed_name !== undefined) fetchBreedInfo()
  }, [breed_name, breed_id])
  return (
    <div className="mt-28 px-32 text-center">
      <p className={"text-3xl text-teal-500 " + ubuntu.className}>Result</p>
      <p
        className={
          "text-xl my-10 text-gray-600 capitalize " + comfortaa.className
        }
      >
        {breed_name}
      </p>
      <p className="text-start mx-32">{breedInfo?.desc}</p>
      <div className="flex flex-wrap">
        {allOfBreed?.map((dog: Dog, index: number) => {
          return (
            <ProductCard
              key={index}
              id={dog.id}
              product_name={dog.product_name}
              breed={breed_name}
              desc={dog.desc}
              price={dog.price}
              image={dog.image_uri}
            />
          )
        })}
      </div>
    </div>
  )
}
