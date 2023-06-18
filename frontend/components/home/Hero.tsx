import { comfortaa } from "@/libs/font"
import ForFun from "../../assets/hero.png"

import Image from "next/image"

export const Hero = () => {
  return (
    <div className="grid grid-cols-2 gap-2 py-32 relative">
      <div>
        <div className={comfortaa.className}>
          <p className="text-5xl w-9/12 text-gray-700 leading-snug">
            Let's get yourself a lifetime friend.
          </p>
          <p className="text-lg w-10/12 mt-5">
            Get a friend and give him her best service with special packages.
          </p>
        </div>
        <div className={"mt-10 text-xl " + comfortaa.className}>
          <button className="bg-orange-400 text-white w-64 py-3 rounded-full">
            Book a schedule
          </button>
          <button className="ml-5 bg-white border-orange-400 border-2 text-orange-400 w-64 py-3 rounded-full">
            Pricing pack
          </button>
        </div>
      </div>
      <div className="flex justify-center relative right-0">
        {/* <Image src={RoundBg} alt="round-bg" className="bottom-1 absolute" /> */}
        <Image src={ForFun} alt="for-fun" className="w-7/12 absolute" />
      </div>
    </div>
  )
}
