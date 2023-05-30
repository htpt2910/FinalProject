import img from "../../assets/hero.png"
import Image from "next/image"

interface CardCarouselProps {
  img: any
}

export const CarouselItem = ({ img }: CardCarouselProps) => {
  return (
    <div className="hidden duration-700 ease-in-out" data-carousel-item>
      <Image
        src={img}
        className="absolute block w-5/12 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        alt="..."
      />
    </div>
  )
}
