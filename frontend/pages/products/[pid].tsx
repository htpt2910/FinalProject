import Image from "next/image"
import dogImage from "../../assets/hero.png"
import { dogs } from "@/data/Dogs"
import { comfortaa, montserrat, ubuntu } from "@/libs/font"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import axios from "@/libs/axios"
import { Dog } from "@/libs/types"

const ProductDetail = () => {
  const router = useRouter()
  const [dogInfo, setDogInfo] = useState<Dog>()

  useEffect(() => {
    const product_id = router.query.pid
    if (product_id !== undefined)
      axios.get(`/products/${product_id}`).then((res) => {
        setDogInfo(res.data)
      })
  }, [router])

  return (
    <div className={"grid grid-cols-2 mt-28 bg-gray-200 bg-opacity-20 p-10"}>
      <div>
        <Image
          src={dogImage}
          alt="alt"
          width={500}
          height={500}
          className="mx-auto"
        />
      </div>
      <div className={"" + montserrat.className}>
        <p className="text-3xl text-gray-800 mb-10">{dogInfo?.product_name}</p>
        <div className={"bg-gray-50 " + ubuntu.className}>
          <p className="text-xl mb-3">About</p>
          <p className="my-5 ">
            Breed:
            <span className={"font-bold ml-10  " + comfortaa.className}>
              {dogInfo?.breed}
            </span>
          </p>
          <p className="my-5 ">
            Age:
            <span className={"font-bold ml-10  " + comfortaa.className}>
              {dogInfo?.desc}
            </span>
          </p>
          <div className="my-5 flex justify-start bg-red-100">
            <p>Price: </p>
            <span
              className={
                "font-bold text-3xl text-red-600 ml-20 " + comfortaa.className
              }
            >
              {dogInfo?.price} VND
            </span>
          </div>
          <p className="my-5 ">
            Quantity:{" "}
            <span className={"font-bold ml-10  " + comfortaa.className}>
              {dogInfo?.quantity}
            </span>{" "}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
