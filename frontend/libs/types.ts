import { StringDecoder } from "string_decoder"

export type Dog = {
  id: number
  product_name: string
  breed: Breed
  desc: string
  quantity: number
  price: number
  image_uri: string
}

export type User = {
  id: number
  role: number
  name: string
  email: string
  phone: string
  image_uri: string
}

export type Breed = {
  id: number
  name: string
  desc: string
}
