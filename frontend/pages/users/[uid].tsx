import { RowItem } from "@/components/user/RowItem"
import axios from "@/libs/axios"
import { montserrat } from "@/libs/font"
import { User } from "@/libs/types"
import type { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"

export const getServerSideProps: GetServerSideProps<{
  user: User
  image_uri: string
}> = async (context) => {
  const uid = context.params?.uid

  console.log("uid: ", uid)
  const { data: user } = await axios.get(`/users/${uid}`)
  const { data: image_uri } = await axios.get(`/users/${uid}/avatar`)

  return { props: { user, image_uri: image_uri.url } }
}

const ProductDetail = ({
  user,
  image_uri,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [userInfo, setUserInfo] = useState(user)
  const [avatar, setAvatar] = useState(image_uri)
  const router = useRouter()

  const fields = [
    { name: "Name", value: userInfo.name },
    { name: "Email", value: userInfo.email },
    { name: "Phone", value: userInfo.phone },
    { name: "Address", value: userInfo.address },
  ]

  function handleChange(event: any) {
    const { name, value } = event.target
    console.log("name, value", name, value)

    setUserInfo((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      }
    })
  }

  function resetData(e: any) {
    e.preventDefault()
    setUserInfo(user)
    setAvatar(image_uri)
  }

  async function handleUploadImage(event: any) {
    console.log("upload image: ")
    const image = event?.target.files[0]
    console.log("image: ", image.name)
    setAvatar(image)
  }

  async function updateData(e: any) {
    e.preventDefault()

    const response = await axios.patch(`/users/${userInfo.id}`, userInfo)
    const formData = new FormData()
    formData.set("file", avatar)

    const updateImageLink = await axios.patch(
      `/users/${userInfo.id}/avatar`,
      formData
    )

    window.alert("Profile updated successfully!")
    router.push("/")
  }
  return (
    <div className={"grid grid-cols-2 mt-28 p-10"}>
      <div className="bg-white mx-10">
        <Image
          src={
            typeof avatar === "string" ? avatar : URL.createObjectURL(avatar)
          }
          alt="alt"
          width={300}
          height={300}
          className="mx-auto"
        />
        <button className="w-full bg-gray-50 py-2">
          <label
            htmlFor="avatar"
            className={" text-gray-400 opacity-80 " + montserrat.className}
          >
            Click to change avatar
          </label>
        </button>

        <input
          type="file"
          id="avatar"
          className="hidden"
          onChange={handleUploadImage}
        />
      </div>
      <div>
        <form>
          <table className="ml-10">
            <tbody>
              {fields.map((field, index) => {
                return (
                  <RowItem
                    key={index}
                    field={field.name}
                    value={field.value}
                    handleChange={handleChange}
                  />
                )
              })}
            </tbody>
          </table>
          <div className="flex justify-end mt-10">
            <button
              className={
                "mx-2 font-bold bg-teal-50 text-teal-500 border-2 border-teal-500 px-10 py-2 rounded-lg " +
                montserrat.className
              }
              onClick={resetData}
            >
              Reset
            </button>
            <button
              className={
                "mx-2 font-bold text-white bg-teal-500 px-10 py-2 rounded-lg " +
                montserrat.className
              }
              onClick={updateData}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductDetail
