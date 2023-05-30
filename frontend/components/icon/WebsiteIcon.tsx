import Image from "next/image"
import PawPrintIcon from "../../assets/pawprint_white.png"
import { pacifico } from "@/libs/font"

export const WebsiteIcon = () => {
  return (
    <>
      <div className="flex">
        <div className="bg-orange-300 rounded-full p-2 w-10 mr-3">
          <Image src={PawPrintIcon} alt="icon" width={30} height={50} />
        </div>
        <p
          className={
            "font-semibold  text-3xl tracking-tight text-orange-300 " +
            pacifico.className
          }
        >
          Pet
        </p>
        <p
          className={
            "font-semibold  text-3xl tracking-tight text-teal-400 " +
            pacifico.className
          }
        >
          Pal
        </p>
      </div>
    </>
  )
}
