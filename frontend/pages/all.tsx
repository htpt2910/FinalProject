import { ProductCard } from "@/components/products/ProductCard"
import { dogs } from "@/data/Dogs"
import { comfortaa } from "@/libs/font"

export default function AllPets() {
  return (
    <div className="pt-32 mx-20">
      <p className={"text-center text-3xl font-bold " + comfortaa.className}>
        Available one at store
      </p>

      <div className="grid grid-cols-6 mt-10">
        {dogs.map((dog, idx) => {
          return (
            <ProductCard
              key={idx}
              id={idx}
              product_name={dog.dog_name}
              breed={dog.category}
              desc={dog.desc}
              price={dog.price}
              image={dog.image_url}
            />
          )
        })}
      </div>
    </div>
  )
}
