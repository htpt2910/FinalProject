import Image from "next/image"
import dogImage from "../../assets/hero.png"
import { dogs } from "@/data/Dogs"
import { montserrat } from "@/libs/font"
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
    <div className="grid grid-cols-2">
      <div>
        <Image src={dogImage} alt="alt" />
      </div>
      <div className={"" + montserrat.className}>
        <p className="text-3xl">{dogInfo?.product_name}</p>
        <p></p>
        <p>
          Giống loài: <span className="font-bold">{dogInfo?.breed}</span>
        </p>
        <p>
          Độ tuổi (theo tuổi người):{" "}
          <span className="font-bold">{dogInfo?.desc}</span>
        </p>
        <p>
          Giá tiền: <span className="font-bold">{dogInfo?.price} VND</span>
        </p>
        <p>
          Số lượng: <span className="font-bold">{dogInfo?.quantity}</span>{" "}
        </p>
      </div>
    </div>
  )
}

export default ProductDetail
