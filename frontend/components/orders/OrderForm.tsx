import axios from "@/libs/axios"
import { ubuntu } from "@/libs/font"
import { Dog, User } from "@/libs/types"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"

interface OrderFormProps {
  selectedProductIdsInInteger: number[]
  user_id: number
  totalPrice: string
  productIdsInIntegerInCart: number[]
  userInfo: User | undefined
  products: Dog[]
}

export const OrderForm = ({
  selectedProductIdsInInteger,
  user_id,
  totalPrice,
  productIdsInIntegerInCart,
  userInfo,
  products,
}: OrderFormProps) => {
  const router = useRouter()

  function updateCart(
    selectedProductIds: number[],
    beforeSelectProductIdsInCart: number[]
  ) {
    const remainProductIds = beforeSelectProductIdsInCart.filter(
      (beforeSelectProductIdInCart) =>
        !selectedProductIds.includes(beforeSelectProductIdInCart)
    )

    console.log("filtered: ", remainProductIds)
    return remainProductIds.join(",")
  }

  const [info, setInfo] = useState({
    phone: userInfo?.phone,
    address: userInfo?.address,
  })

  function handleInfoChange(event: any) {
    const { name, value } = event.target

    setInfo((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      }
    })
  }

  async function handleCreateNewOrder() {
    if (info.phone === null || info.address === null) {
      window.alert("Please fill in your information.")
      return
    }
    if (userInfo?.phone === null || userInfo?.address === null) {
      const updateUserInfo = await axios.patch(`/users/${user_id}`, {
        phone: info.phone,
        address: info.address,
      })
    }

    const response = await axios.post(`/orders/`, {
      user_id: Number(user_id),
      ordered_day: Date.now(),
      total_price: Number(totalPrice),
      product_ids: selectedProductIdsInInteger,
      type: "shopping",
    })

    const res = await axios.patch(`/users/${user_id}`, {
      products_in_cart: updateCart(
        selectedProductIdsInInteger,
        productIdsInIntegerInCart
      ),
    })

    return response.data.id
  }

  async function createPayment() {
    const oid = await handleCreateNewOrder()
    console.log("order id: ", oid)
    if (typeof window !== undefined) {
      window.localStorage.setItem("new_order_id", oid)
    }

    const value = {
      total_price: parseInt(totalPrice),
      user_id: user_id,
    }
    const response = await axios.post("/payment/create_payment", null, {
      params: value,
    })

    router.push(response.data)
  }
  return (
    <div className="mt-32">
      <div>
        <p>Client information </p>
        <p>{userInfo?.name}</p>
        <p>
          {userInfo?.phone ? (
            userInfo?.phone
          ) : (
            <>
              <span>Please type your phone number </span>
              <input
                name="phone"
                type="text"
                placeholder="phone number..."
                value={info.phone}
                onChange={handleInfoChange}
              />
            </>
          )}
        </p>
        <p>
          {userInfo?.address ? (
            userInfo?.address
          ) : (
            <>
              <span>Please type your address </span>
              <input
                name="address"
                type="text"
                placeholder="address..."
                value={info.address}
                onChange={handleInfoChange}
              />
            </>
          )}
        </p>
      </div>
      <p>Products information</p>
      <div className="bg-slate-50 m-5 rounded-lg p-3 text-center">
        <p className={"text-gray-500 mb-2 text-start " + ubuntu.className}>
          Type: {`order.type`}
        </p>
        {products.map((product: any, index: number) => {
          return (
            <table className="my-3 w-full table-fixed" key={index}>
              <tbody>
                <tr>
                  <th className="w-">
                    <Image
                      src={product.image_uri}
                      alt="alt"
                      width={100}
                      height={100}
                    />
                  </th>
                  <th className="text-left">{product.product_name}</th>
                  <th className="w-fit text-right">{product.price}</th>
                </tr>
              </tbody>
            </table>
          )
        })}
        <p className="text-end text-red-400 text-2xl">Total: {totalPrice}</p>
      </div>
      <div className="flex justify-end mr-10">
        <button
          className="bg-red-600 text-white rounded-lg px-3 py-2 text-xl"
          onClick={handleCreateNewOrder}
        >
          Confirm
        </button>
        <button
          className="text-white bg-red-500 px-5 py-2"
          onClick={createPayment}
        >
          Thanh toan ngay
        </button>
      </div>
    </div>
  )
}
