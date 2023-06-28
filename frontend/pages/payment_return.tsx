import axios from "@/libs/axios"
import { convertDateType } from "@/libs/convertDay"
import { Payment } from "@/libs/types"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function PaymentReturnPage() {
  const router = useRouter()
  const paymentInfo = router.query

  useEffect(() => {
    if (paymentInfo.vnp_TransactionNo !== undefined) {
      const date = new Date(convertDateType(paymentInfo.vnp_PayDate as string))
      const body: Payment = {
        code: paymentInfo?.vnp_TransactionNo as string,
        money: String(
          parseInt(paymentInfo.vnp_Amount as string) / 10000
        ) as string,
        payment_content: paymentInfo.vnp_OrderInfo as string,
        status: paymentInfo.vnp_ResponseCode == "00" ? "Success" : "Fail",
        bank_code: paymentInfo.vnp_BankCode as string,
        payment_date: date,
        order_id:
          typeof global.window !== undefined
            ? parseInt(window.localStorage.getItem("new_order_id") as string)
            : 0,
      }

      try {
        const response = axios.post("/payment/save_payment", body)
      } catch (e) {
        console.log(e)
      }
    }
  })
  return (
    <div className="mt-64">
      {paymentInfo.vnp_TransactionNo !== undefined && (
        <div>
          <div>
            <p>Kết quả thanh toán</p>
            <p>{paymentInfo.vnp_OrderInfo}</p>
            <p>
              Số tiền: {parseInt(paymentInfo.vnp_Amount as string) / 10000}$
            </p>
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
        </div>
      )}
    </div>
  )
}
