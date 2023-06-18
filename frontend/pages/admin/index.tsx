/* eslint-disable react/jsx-no-target-blank */
import { TableComponent } from "@/components/tables/TableComponent"
import axios from "@/libs/axios"
import { User } from "@/libs/types"

import type { GetServerSideProps, InferGetServerSidePropsType } from "next"

export const getServerSideProps: GetServerSideProps<{
  users: User[]
}> = async () => {
  const { data: users } = await axios.get("/users/")
  return { props: { users } }
}

export default function Index({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
      <div className="container mx-auto items-center flex flex-wrap">
        <div className="">
          <p>index</p>
          <TableComponent
            data={users}
            field_1={"Name"}
            field_2={"Email"}
            field_3={"Phone"}
          />
        </div>
      </div>
    </section>
  )
}
