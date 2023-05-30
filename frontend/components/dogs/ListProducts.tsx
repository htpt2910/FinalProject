import { comfortaa } from "@/libs/font"
import { dogs } from "@/data/Dogs"
import { ProductCard } from "../products/ProductCard"

export const ListProducts = () => {
  return (
    <div className="mt-32 ">
      <p
        className={"text-5xl text-gray-700 text-center " + comfortaa.className}
      >
        Let's find yourself "the one"
      </p>
      <div className="flex mt-20">
        {dogs.map((dog, idx) => {
          return (
            <ProductCard
              key={idx}
              image_url={dog.image_url}
              category={dog.category}
              desc={dog.desc}
            />
          )
        })}
      </div>
    </div>
  )
}
