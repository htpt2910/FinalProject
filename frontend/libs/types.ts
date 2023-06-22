import internal from "stream"
import { StringDecoder } from "string_decoder"

export type Dog = {
  id: number
  product_name: string
  breed: Breed
  desc: string
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
}

export type Cart = {
  id: number
  user_id: number
  products: Dog[]
}
