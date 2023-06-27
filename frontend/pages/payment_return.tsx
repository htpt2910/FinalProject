import axios from "@/libs/axios"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function PaymentReturnPage() {
  // useEffect(() => {
  //   async function getParams() {
  //     const params = await axios.get("/payment/payment_returnnn", {params: {request: }})
  //     console.log("params: ", params, params.data)
  //   }

  //   getParams()
  // }, [])
  const router = useRouter()
  const paymentInfo = router.query
  return (
    <div className="mt-64">
      <p>Kết quả thanh toán</p>
      <p>{paymentInfo.vnp_OrderInfo}</p>
      <p>Số tiền: {paymentInfo.vnp_Amount / 10000}$</p>
      <p>
        Tình trạng:{" "}
        {paymentInfo.vnp_ResponseCode === "00"
          ? "Thành công"
          : paymentInfo.vnp_ResponseCode === "51"
          ? "Thất bại do không đủ số dư "
          : "Thất bại"}
      </p>
      <p>Mã giao dịch: {paymentInfo.vnp_TransactionNo}</p>
    </div>
  )
}
