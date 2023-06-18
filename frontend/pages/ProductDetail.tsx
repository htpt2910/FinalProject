import Image from "next/image"
import dogImage from "../assets/hero.png"
import { dogs } from "@/data/Dogs"
import { montserrat } from "@/libs/font"

const ProductDetail = () => {
  return (
    <div className="grid grid-cols-2">
      <div>
        <Image src={dogImage} alt="alt" />
      </div>
      <div className={"" + montserrat.className}>
        <p className="text-3xl">{dogs[0].dog_name}</p>
        <p></p>
        <p>
          Giống loài: <span className="font-bold">{dogs[0].category}</span>
        </p>
        <p>
          Độ tuổi (theo tuổi người):{" "}
          <span className="font-bold">{dogs[0].age}</span>
        </p>
        <p>
          Giá tiền: <span className="font-bold">{dogs[0].price} VND</span>
        </p>
        <p>
          Số lượng: <span className="font-bold">{dogs[0].quantity}</span>{" "}
        </p>
      </div>
    </div>
  )
}

export default ProductDetail
