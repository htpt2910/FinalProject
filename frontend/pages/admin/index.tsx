/* eslint-disable react/jsx-no-target-blank */
import { TableComponent } from "@/components/tables/TableComponent"
import axios from "@/libs/axios"
import { User } from "@/libs/types"

import AdminNavbar from "@/navbars/AdminNavbar"
import HeaderStats from "@/navbars/HeaderStats"
import type { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

export const getServerSideProps: GetServerSideProps<{
  users: User[]
}> = async () => {
  const { data: users } = await axios.get("/users/")
  const updatedUsers = await Promise.all<User>(
    users.map(async (user: User, index: number) => {
      const { data } = await axios.get(`/users/${user.id}/avatar`)
      const image_uri = data.url
      return {
        ...user,
        image_uri,
      }
    })
  )
  return { props: { users: updatedUsers } }
}

export default function Index({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (!session) router.push("/")
  })

  return (
    <>
      {session && (
        <div className="flex flex-wrap">
          <div className="-mt-28 w-full px-4">
            <TableComponent data={users} />
          </div>
        </div>
      )}
    </>
  )
}
