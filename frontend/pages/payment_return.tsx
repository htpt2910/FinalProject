import axios from "@/libs/axios"
import { Payment } from "@/libs/types"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function PaymentReturnPage() {
  const router = useRouter()
  const paymentInfo = router.query
  // const body: Payment = {
  //   code: paymentInfo?.vnp_TransactionNo,
  //   money: paymentInfo.vnp_Amount / 10000,
  //   status: paymentInfo.vnp_ResponseCode == "00" ? "Success" : "Fail",
  //   bank_code: paymentInfo.vnp_BankCode,
  //   payment_date: paymentInfo.vnp_PayDate,
  // }
  // const response = axios.post("/payments/", body)
  // console.log("response in payment_return: ", response)

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
