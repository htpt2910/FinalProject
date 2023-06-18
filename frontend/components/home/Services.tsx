import { comfortaa, montserrat, ubuntu } from "@/libs/font"
import { Card } from "./Card"

export const Services = () => {
  return (
    <div className="text-center mt-64">
      <p className={"text-5xl text-gray-700 " + comfortaa.className}>
        What Can We Do
      </p>
      <p className="flex justify-center mt-10">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout.{" "}
      </p>
      <div className="grid grid-cols-3 grid-rows-1 gap-4">
        <div>
          <Card
            name={"Pet shop"}
            desc={
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            }
            bg_color="bg-orange-200"
          />
        </div>
        <div>
          <Card
            name={"Pet food"}
            desc={
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            }
            bg_color="bg-orange-400"
          />
        </div>
        <div>
          <Card
            name={"Take care"}
            desc={
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            }
            bg_color="bg-orange-200"
          />
        </div>
      </div>
    </div>
  )
}
