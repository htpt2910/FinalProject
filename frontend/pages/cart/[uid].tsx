// import { OrderItem } from "@/components/orders/OrderItem"
import axios from "@/libs/axios"
import { montserrat, ubuntu } from "@/libs/font"
import { Dog, Order, User, Cart } from "@/libs/types"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export const getServerSideProps: GetServerSideProps<{
  cart: Cart
}> = async (context) => {
  const uid = context.params?.uid

  console.log("uid: ", uid)
  const { data: cart } = await axios.get(`/carts/cart/${uid}`)

  const products = await Promise.all<Dog>(
    cart.products.map(async (product: Dog, index: number) => {
      const { data: image_uri } = await axios.get(
        `/products/${product.id}/image`
      )
      return { ...product, image_uri: image_uri.url }
    })
  )

  console.log("cart: ", cart.products)
  return { props: { cart: { ...cart, products } } }
}

export default function CartPage({
  cart,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [selectedProductIds, setselectedProductIds] = useState<number[]>([])
  const [selectedProducts, setselectedProducts] = useState<Dog[]>([])

  const productIdsInCart = cart.products.map((product: Dog, index: number) => {
    return product.id
  })
  function handleselectedProductIds(
    productIndex: number,
    product: Dog,
    event: any
  ) {
    const isChecked = event.target.checked
    console.log("is checked: ", isChecked)
    if (isChecked) {
      setselectedProductIds([...selectedProductIds, product.id])
      setselectedProducts([...selectedProducts, product])
    } else {
      setselectedProductIds(
        selectedProductIds.filter((id) => id !== product.id)
      )
      setselectedProducts(
        selectedProducts.filter(
          (oldProducts: Dog) => oldProducts.id !== product.id
        )
      )
      console.log(
        "selected products: ",
        selectedProductIds.filter((id) => id !== product.id)
      )
    }
  }
  function totalPrice(products: Dog[]) {
    var sum = 0
    products.forEach((product: Dog, index: number) => {
      var price = Number(product.price)
      sum += price
    })

    return sum
  }
  return (
    <div className="mt-32 mx-96 bg-white">
      <p>this is cart page</p>
      <div>
        <div className="bg-slate-50 m-5 rounded-lg p-3 text-center">
          {cart.products?.map((product: Dog, productIndex: number) => {
            return (
              <table
                className={
                  "my-3 w-full table-fixed " +
                  (product.order_id !== null ? " opacity-50 " : "")
                }
                key={productIndex}
              >
                <tbody>
                  <tr>
                    <th>
                      <input
                        name={`${product.id}`}
                        type="checkbox"
                        id={`${productIndex}`}
                        onChange={(event) =>
                          handleselectedProductIds(productIndex, product, event)
                        }
                      />
                    </th>
                    <th className="w-">
                      <Image
                        src={product.image_uri}
                        alt="alt"
                        width={100}
                        height={100}
                      />
                    </th>
                    <th className="text-left">{product.product_name}</th>
                    <th className="w-fit text-right">
                      {product.order_id ? "Out of stock" : product.price}
                    </th>
                  </tr>
                </tbody>
              </table>
            )
          })}
        </div>
        <div className="text-end">
          <p className="text-xl">
            Total:{" "}
            <span className="text-red-500">
              {totalPrice(selectedProducts)} $
            </span>
          </p>
          <button className="bg-red-400 text-white border-2 rounded-md px-3 py-2">
            <Link
              href={{
                pathname: `/orders/new`,
                query: {
                  productIds: selectedProductIds.join(","),
                  user_id: JSON.stringify(cart.user_id),
                  totalPrice: JSON.stringify(totalPrice(selectedProducts)),
                  productsInCart: productIdsInCart.join(","),
                  cartId: JSON.stringify(cart.id),
                },
              }}
            >
              Book
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}
