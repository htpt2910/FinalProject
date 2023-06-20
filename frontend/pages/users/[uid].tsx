import axios from "@/libs/axios"
import { User } from "@/libs/types"
import type { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Image from "next/image"

export const getServerSideProps: GetServerSideProps<{
  user: User
  image_uri: string
}> = async (context) => {
  const uid = context.params?.uid

  console.log("uid: ", uid)
  const { data: user } = await axios.get(`/users/${uid}`)
  const { data: image_uri } = await axios.get(`/users/${uid}/avatar`)

  console.log("image~~: ", image_uri.url)
  return { props: { user, image_uri: image_uri.url } }
}

const ProductDetail = ({
  user,
  image_uri,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className={"grid grid-cols-2 mt-28 bg-gray-200 bg-opacity-20 p-10"}>
      <div>
        <Image
          src={image_uri}
          alt="alt"
          width={300}
          height={300}
          className="mx-auto"
        />
      </div>
      <div>
        <form>
          <input placeholder="Name" value={user.name} />
        </form>
      </div>
    </div>
  )
}

export default ProductDetail
