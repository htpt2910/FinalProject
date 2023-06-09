import { OrderForm } from "@/components/orders/OrderForm"
import axios from "@/libs/axios"
import { Dog, User } from "@/libs/types"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useState } from "react"

export const getServerSideProps = async (context: {
  query: {
    productIds: string
    user_id: string
    totalPrice: string
    productsInCart: string
  }
}) => {
  const productIds = context.query.productIds
  const user_id = parseInt(context.query.user_id)
  const totalPrice = context.query.totalPrice
  const productsInCart = context.query.productsInCart
  const selectedProductIds = productIds.split(",")
  const selectedProductIdsInInteger = selectedProductIds.map((id: string) => {
    return parseInt(id)
  })
  const productIdsInIntegerInCart = productsInCart
    .split(",")
    .map((id: string) => {
      return parseInt(id)
    })

  const products = await Promise.all(
    selectedProductIdsInInteger.map(async (id: number) => {
      const response = await axios.get(`/products/${id}`)
      const product = response.data
      const { data } = await axios.get(`/products/${id}/image`)
      const image_uri = data.url
      return { ...product, image_uri }
    })
  )
  const { data: userInfo } = await axios.get(`/users/${user_id}`)
  return {
    props: {
      selectedProductIdsInInteger: selectedProductIdsInInteger,
      productIdsInIntegerInCart: productIdsInIntegerInCart,
      user_id: user_id,
      totalPrice: totalPrice,
      products: products,
      userInfo: userInfo,
    },
  }
}

export default function NewOrder({
  selectedProductIdsInInteger,
  productIdsInIntegerInCart,
  user_id,
  totalPrice,
  products,
  userInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <OrderForm
        selectedProductIdsInInteger={selectedProductIdsInInteger}
        user_id={user_id}
        totalPrice={totalPrice}
        productIdsInIntegerInCart={productIdsInIntegerInCart}
        userInfo={userInfo}
        products={products}
      />
    </div>
  )
}
