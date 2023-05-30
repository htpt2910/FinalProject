import { ListProducts } from "@/components/dogs/ListProducts"
import { Hero } from "@/components/home/Hero"
import { Services } from "@/components/home/Services"
import { Testimonial } from "@/components/home/Tesitmonial"

export default function Home() {
  return (
    <div>
      {/* hero */}
      <Hero />
      {/* what we can do */}
      <Services />
      {/* Our family */}
      <ListProducts />
      {/* What others tell about us */}
      <Testimonial />
    </div>
  )
}
