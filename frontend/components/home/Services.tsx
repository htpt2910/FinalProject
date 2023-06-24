import { comfortaa, montserrat, ubuntu } from "@/libs/font"
import { Card } from "./Card"
import PetShop from "../../assets/pet_shop_img.jpeg"
import DogFood from "../../assets/pet_food.jpeg"
import TakeCareDog from "../../assets/take_care.jpeg"
import Link from "next/link"

export const Services = () => {
  return (
    <div className="text-center mt-64 px-32">
      <p className={"text-5xl text-gray-700 " + comfortaa.className}>
        What Can We Do
      </p>
      <p className={"flex justify-center mt-10 " + comfortaa.className}>
        We can bring you a new friend and cherries them like our family ❤️
      </p>
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div>
          <Card
            name={"Pet shop"}
            img={PetShop}
            desc={
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            }
            bg_color="bg-orange-200"
            route="all"
          />
        </div>

        <div>
          <Card
            name={"Take care"}
            img={TakeCareDog}
            desc={
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            }
            bg_color="bg-orange-400"
            route="service"
          />
        </div>
        <div>
          <Card
            name={"Pet food"}
            img={DogFood}
            desc={
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            }
            bg_color="bg-orange-200"
            route="#"
          />
        </div>
      </div>
    </div>
  )
}
