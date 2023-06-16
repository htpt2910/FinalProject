import axios from "@/libs/axios"
import { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FormData from "form-data"

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  debug: false,
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub
      }

      console.log("sub: ", token)
      var formData = new FormData()
      formData.append("id", token.sub || "myuid")
      formData.append("name", token.name || "myname")
      formData.append("email", token.email || "myemail")
      // formData.append("phone", "00000000")
      formData.append("image_uri", token.picture || "myimage")

      // const data = {
      //   id: token.sub,
      //   name: token.name,
      //   email: token.email,
      //   image_uri: token.image_uri,
      // }

      console.log("hihi: ", token.name)
      await axios
        .post(`/users/save_user`, formData)
        .then((res) => console.log("res: ", res.data))
        .catch((err) => console.log("error~: ", err.response.data))
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
}

export default NextAuth(options)
