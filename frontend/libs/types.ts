import internal from "stream"
import { StringDecoder } from "string_decoder"

export type Dog = {
  id: number
  product_name: string
  breed: Breed
  desc: string
  age: string
  price: number
  image_uri: string
  order_id: number
}

export type User = {
  id: number
  role: number
  name: string
  email: string
  phone: string
  address: string
  image_uri: string
  products_in_cart: string
}

export type Breed = {
  id: number
  name: string
  desc: string
}

export type Order = {
  id: number
  type: string
  ordered_day: Date
  finished_day: Date
  total_price: number
  products: Dog[]
  user_id: number
  user: User
  image_uri: string
  services: Service[]
}

export type Service = {
  id: number
  service_name: string
  price: number
}

export type Payment = {
  code: string | undefined
  money: string
  status: string
  bank_code: string
  payment_content: string
  payment_date: Date
  order_id: number
}
