import { useEffect, useReducer, useState } from "react"
import Image from "next/image"
import { comfortaa } from "@/libs/font"
import axios from "@/libs/axios"
import { UploadArea } from "@/components/detect/UploadArea"
import { ViewResultArea } from "@/components/detect/ViewResultArea"
import Link from "next/link"

export default function DetectPage() {
  const [image, setImage] = useState()
  const [breed, setBreed] = useState<string>("")
  const [breed_id, setBreed_id] = useState<number>()
  const [isLoading, setIsLoading] = useState(false)

  const validFileExtension = [".jpg", "jpeg", ".png"]

  function handleUploadImage(event: any) {
    setImage(event.target.files[0])
    // if (event.target.files && event.target.files[0]) {
    //   const i = event.target.files[0]
    //   console.log("file: ", i)
    //   const fileName = i.name
    //   if (parseFloat((i.size / 10485760).toFixed(2)) > 0.5) {
    //     window.alert(
    //       "Sorry, " +
    //         fileName +
    //         " has size bigger than 5 MB. Please choose another smaller size image!"
    //     )
    //     // setImage(null)
    //     return
    //   }

    //   if (
    //     fileName.includes(".png") ||
    //     fileName.includes(".jpg") ||
    //     fileName.includes(".jpeg")
    //   ) {
    //     setImage(i)
    //     return
    //   }

    //   window.alert(
    //     "Sorry, " +
    //       fileName +
    //       " is invalid! Allowed extension are: " +
    //       validFileExtension.join(", ")
    //   )
    //   setShowLink(true)
    //   // setImage("")
    //   return
    // }
  }

  async function handleUploadToServer() {
    if (image === undefined) {
      console.error("oh no")
      return
    }
    const body = new FormData()
    body.set("img", image)
    const response = await axios.post(`/detect/`, body)

    if (response.data === "No result") {
      window.alert(
        "This breed is not in our collection. Please choose another one to detect."
      )
      return
    } else {
      setBreed(response.data.name)
      setBreed_id(response.data.id)

      setIsLoading(true)
    }
  }

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <div>
      <UploadArea
        image={image}
        handleUploadImage={handleUploadImage}
        handleUploadToServer={handleUploadToServer}
      />
      {isLoading ? (
        <ViewResultArea breed_name={breed} breed_id={breed_id} />
      ) : (
        <></>
      )}
    </div>
  )
}
