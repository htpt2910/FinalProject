import Image from "next/image"
import ServiceImage from "../assets/service.png"
import { montserrat, ubuntu } from "@/libs/font"
import { useState } from "react"
import { Dog, Order, Service, User } from "@/libs/types"
import CalculatePriceBaseOnWeight from "@/libs/calculation"

import { getServerSession } from "next-auth/next"
import { options } from "./api/auth/[...nextauth]"
import axios from "@/libs/axios"
import { InferGetServerSidePropsType } from "next"

type DogInfoForService = {
  breed?: string
  age?: number | 0
  weight?: number | 0
}

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, options)

  const { data: user } = await axios.get(`/users/${session?.user.email}/info`)
  const { data: services } = await axios.get(`/services/`)
  console.log("user: ", user)
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: user,
      services: { services },
    },
  }
}
export default function ServicePage({
  user,
  services,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [userInfo, setUserInfo] = useState<User>(user)
  const [destination, setDestination] = useState("")
  const [dogInfo, setDogInfo] = useState<DogInfoForService>({})
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [show, setShow] = useState(false)
  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [date, setDate] = useState<Date>()
  const [serviceIds, setServiceIds] = useState<number[]>([])

  function handleChangeRadioButton(event: any) {
    const value = event.target.id
    console.log("value: ", value, typeof value)
    setDestination(value)
  }

  function handleUserInfoChange(event: any) {
    const { name, value } = event.target
    setUserInfo((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      }
    })
    console.log(name + ": " + value)
  }

  function handleMeetingDayChange(event: any) {
    setDate(event.target.value)
  }

  function handleCheckbox(event: any) {
    const { name, checked } = event.target
    setShow(false)
    if (checked) setSelectedServices([...selectedServices, name])
    else
      setSelectedServices(
        selectedServices.filter((service_name) => name !== service_name)
      )
  }

  async function handleDogInfoChange(event: any) {
    const { name, value } = event.target
    console.log(name, value)
    console.log(dogInfo)
    setShow(false)
    setDogInfo((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      }
    })

    console.log(dogInfo)
  }

  async function estimatePrice() {
    console.log("selectedServices: ", selectedServices)
    console.log("avai service: ", services)
    var estimate_price = 0

    var matchedIds: number[] = []
    const cal = await Promise.all(
      services.services.map((service: Service) => {
        selectedServices.forEach((selectedService: string) => {
          if (service.service_name === selectedService) {
            estimate_price += service.price
            matchedIds.push(service.id)
          }
        })
      })
    )
    console.log(matchedIds)
    setServiceIds(matchedIds)

    console.log("estimate_price: ", estimate_price)
    console.log("service idS: ", serviceIds)
    setEstimatedPrice(estimate_price)
  }

  async function createServiceOrder() {
    const type = "Service"
    var meetingDate: Date = new Date()
    console.log("meetingDate: ", meetingDate)

    if (destination === "home")
      if (userInfo.address === "" || userInfo.phone === "")
        window.alert("Please fill out your information to continue order!")

    if (date !== undefined) meetingDate = new Date(date)
    else window.alert("Please fill out appointment day to continue order!")

    console.log("destination: ", destination)
    const body = {
      user_id: userInfo.id,
      type: type,
      ordered_day: meetingDate,
      finished_day: null,
      total_price: estimatedPrice,
      destination: destination === "home" ? userInfo?.address : "At store",
      service_ids: serviceIds,
    }

    console.log("body: ", body)
    const response = await axios.post(`/orders/`, body)
    window.alert("Create appointment successfully!")
  }
  return (
    <div
      className={"pt-32 px-32 h-screen bg-orange-50 " + montserrat.className}
    >
      <Image
        src={ServiceImage}
        alt="alt"
        width={1500}
        height={500}
        className="rounded-lg"
      />
      <div className="mb-20 bg-orange-50 ">
        <p className="text-center my-20 text-xl mx-32 text-orange-400 ">{`Wanna book your baby a meeting? Write your information here and we'll get to you in no time`}</p>
        <div className="px-72">
          <table className="text-left w-full">
            <tbody>
              <tr>
                <th>Destination:</th>
                <th className="flex items-center">
                  <input
                    id="home"
                    type="radio"
                    name="destination"
                    className="text-teal-500 "
                    onChange={handleChangeRadioButton}
                  />
                  <label htmlFor="store" className="px-2">
                    At home
                  </label>

                  <input
                    id="store"
                    type="radio"
                    name="destination"
                    className="text-teal-500 "
                    onChange={handleChangeRadioButton}
                  />
                  <label htmlFor="store" className="px-2">
                    At store
                  </label>
                </th>
              </tr>
              <tr>
                <th></th>
                <th>
                  {destination === "home" ? (
                    <>
                      <input
                        type="text"
                        name="address"
                        placeholder="your address... "
                        value={userInfo.address || ""}
                        onChange={handleUserInfoChange}
                        className="border-2 rounded-lg border-white bg-white w-full  "
                      />

                      <input
                        type="text"
                        name="phone"
                        placeholder="your phone number... "
                        value={userInfo.phone || ""}
                        onChange={handleUserInfoChange}
                        className="mt-2 border-2 rounded-lg border-white bg-white  w-full"
                        required
                      />
                    </>
                  ) : destination === "store" ? (
                    <label>
                      {
                        "543 Tôn Đức Thắng, phường Hoà Khánh, quận Liên Chiểu, TP. Đà Nẵng"
                      }
                    </label>
                  ) : (
                    <></>
                  )}
                </th>
              </tr>
              <tr className="pt-10">
                <th>Meeting day: </th>
                <th>
                  <input
                    type="datetime-local"
                    onChange={handleMeetingDayChange}
                    className="border-2 rounded-lg border-white bg-white  w-full"
                  />
                </th>
              </tr>
            </tbody>
          </table>
          <p className={"my-10 text-center text-2xl " + ubuntu.className}>
            Pet information
          </p>
          <table className="text-left w-full">
            <tbody>
              <tr>
                <th className="w-32">Breed:</th>
                <th>
                  <input
                    value={dogInfo?.breed}
                    name="breed"
                    type="text"
                    placeholder="pet's breed..."
                    className="border-2 rounded-lg border-white bg-white  w-full"
                    onChange={handleDogInfoChange}
                  />
                </th>
              </tr>
              <tr>
                <th>Age: </th>
                <th>
                  <input
                    value={dogInfo?.age}
                    type="text"
                    name="age"
                    placeholder="pet's age (in months)..."
                    className="border-2 rounded-lg border-white bg-white  w-full"
                    onChange={handleDogInfoChange}
                  />
                </th>
              </tr>
              <tr>
                <th>Weight: </th>
                <th>
                  <input
                    value={dogInfo?.weight}
                    type="text"
                    name="weight"
                    placeholder="pet's weight (in kg)..."
                    className="border-2 rounded-lg border-white bg-white  w-full"
                    onChange={handleDogInfoChange}
                  />
                </th>
              </tr>
              <tr>
                <th>Sickness: </th>
                <th>
                  <input
                    type="text"
                    placeholder="history sickness..."
                    className="border-2 rounded-lg border-white bg-white  w-full"
                  />
                </th>
              </tr>
              <tr>
                <th>Services</th>
                <th>
                  <input
                    name="hair_cut"
                    type="checkbox"
                    className="border-teal-500 bg-teal-50 text-teal-500 rounded-sm ml-3 mr-2"
                    onChange={handleCheckbox}
                  />
                  Hair cut
                  <input
                    name="dog_bath"
                    type="checkbox"
                    className="border-teal-500 bg-teal-50 text-teal-500 rounded-sm ml-3 mr-2"
                    onChange={handleCheckbox}
                  />
                  Dog Bath
                  <input
                    name="nail_trim"
                    type="checkbox"
                    className="border-teal-500 bg-teal-50 text-teal-500 rounded-sm ml-3 mr-2"
                    onChange={handleCheckbox}
                  />
                  Nail Trim
                </th>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-10 px-64 pb-60">
          {show ? (
            <div>
              <div className="flex  items-center">
                <label className="text-xl text-red-400 opacity-80">
                  Estimate price:
                </label>
                <p className="ml-2 text-xl text-red-400">{estimatedPrice}$</p>
              </div>

              <label className="text-md text-gray-500 opacity-80">
                {
                  "＊ Estimate price for dog under 5 kg with selected service(s)."
                }
              </label>
              <button
                className="bg-red-400 text-white w-full py-2 rounded-lg mt-5"
                onClick={createServiceOrder}
              >
                Book now!
              </button>
            </div>
          ) : (
            <div className="flex justify-center mt-10">
              <button className="bg-teal-100 border-2 border-teal-500 text-teal-500 rounded-lg px-3 py-2 mr-2">
                Reset
              </button>
              <button
                className="bg-teal-500 border-2 border-teal-500 text-white rounded-lg px-3 py-2"
                onClick={() => {
                  setShow(true)
                  estimatePrice()
                  console.log("click confirm")
                }}
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
