import axios from "@/libs/axios"
import { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FormData from "form-data"

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  debug: false,
  callbacks: {
    session: async ({ session, token }: any) => {
      if (session?.user) {
        session.user.id = token.sub
      }

      var formData = new FormData()
      formData.append("name", token.name || "myname")
      formData.append("email", token.email || "myemail")
      formData.append("image_uri", token.picture || "myimage")

      await axios
        .post(`/users/save_user`, formData)
        .catch((err) => console.log("error~: ", err.response.data))
      return session
    },
  },
}

export default NextAuth(options)
