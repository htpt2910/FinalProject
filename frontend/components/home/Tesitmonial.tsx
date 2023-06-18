import { comfortaa } from "@/libs/font"
import img from "../../assets/dog_food.webp"
import img2 from "../../assets/pawprint_white.png"
import { CarouselItem } from "../carousel/CarouselItem"
import { SliderIndicator } from "../carousel/Slider"
import { SliderControl } from "../carousel/SliderControl"

export const Testimonial = () => {
  return (
    <div className="mt-32">
      <p
        className={"text-5xl text-gray-700 text-center " + comfortaa.className}
      >
        Feedbacks
      </p>
      <div
        id="default-carousel"
        className="relative w-full mt-24 bg-teal-500"
        data-carousel="slide"
      >
        <div className="relative overflow-hidden rounded-lg md:h-96">
          <CarouselItem img={img} />
          <CarouselItem img={img2} />
        </div>
        <SliderIndicator />
        <SliderControl />
      </div>
    </div>
  )
}
