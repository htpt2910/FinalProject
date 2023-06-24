import { ListProducts } from "@/components/dogs/ListProducts"
import { Hero } from "@/components/home/Hero"
import { Services } from "@/components/home/Services"
import { Testimonial } from "@/components/home/Tesitmonial"
import axios from "@/libs/axios"
import { Dog } from "@/libs/types"
import type { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useSession } from "next-auth/react"
import { useContext } from "react"

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

  return { props: { products: updatedProducts } }
}

export default function Home({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      {/* hero */}
      <Hero />
      {/* what we can do */}
      <Services />
      {/* Our family */}
      <ListProducts products={products} />
      {/* What others tell about us */}
      {/* <Testimonial /> */}
    </div>
  )
}
