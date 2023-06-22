import { ProductCard } from "@/components/products/ProductCard"
import { dogs } from "@/data/Dogs"
import axios from "@/libs/axios"
import { comfortaa } from "@/libs/font"
import { Dog } from "@/libs/types"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"

export const getServerSideProps: GetServerSideProps<{
  products: Dog[]
}> = async () => {
  const { data: products } = await axios.get("/products")
  const updatedProducts = await Promise.all<Dog>(
    products.map(async (product: Dog, index: number) => {
      const { data } = await axios.get(`/products/${product.id}/image`)
      const image_uri = data.url
      return {
        ...product,
        image_uri,
      }
    })
  )
  // console.log("high: ", updatedProducts)
  const availableProducts = updatedProducts.filter(
    (product: Dog) => product.order_id === null
  )
  console.log("avai: ", availableProducts)

  return { props: { products: availableProducts } }
}

export default function AllPets({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="pt-32 mx-20">
      <p className={"text-center text-3xl font-bold " + comfortaa.className}>
        Available one at store
      </p>

      <div className="grid grid-cols-6 mt-10">
        {products.map((dog, idx) => {
          return (
            <ProductCard
              key={idx}
              id={idx}
              product_name={dog.product_name}
              breed={dog.breed?.name}
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
