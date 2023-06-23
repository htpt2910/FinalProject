import { WebsiteIcon } from "@/components/icon/WebsiteIcon"
import { AccountInfo } from "@/components/session/AccountInfo"
import axios from "@/libs/axios"
import { comfortaa } from "@/libs/font"
import { useSession, signIn } from "next-auth/react"
import Link from "next/link"
import React, { useEffect, useState } from "react"

export const Navbar = () => {
  const { data: session } = useSession()
  const [userId, setUserId] = useState<number>()
  const [avatar, setUserAvatar] = useState<string>()
  const [prodsInCart, setProdsInCart] = useState<number>(0)

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await axios.get(`/users/${session?.user?.email}/info`)
      setUserId(userInfo?.data.id)
      const { data: image_uri } = await axios.get(
        `/users/${userInfo?.data.id}/avatar`
      )
      const { data: productsIncart } = await axios.get(
        `/carts/cart/${userInfo.data.id}`
      )

      setUserAvatar(image_uri.url)
      setProdsInCart(productsIncart?.products.length)
    }

    if (session) getUserInfo()
  }, [session, prodsInCart])

  return (
    <nav
      className={
        "flex items-center justify-between py-6 fixed w-full z-20 top-0 left-0 px-32 bg-orange-500"
      }
    >
      <div className="flex items-center flex-shrink-0 text-white">
        <WebsiteIcon />
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-orange-300 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={
          "w-full block flex-grow lg:flex lg:w-auto " + comfortaa.className
        }
      >
        <div className="text-lg lg:flex-grow flex justify-center">
          <a
            href="/"
            className="block mt-4 p px-7 lg:inline-block lg:mt-0 text-gray-800 hover:text-orange-300 mr-4"
          >
            Home
          </a>
          <a
            href="/detect"
            className="block mt-4 px-7 lg:inline-block lg:mt-0 text-gray-800 hover:text-orange-300 mr-4"
          >
            AI
          </a>
          <a
            href="#responsive-header"
            className="block mt-4 px-7 lg:inline-block lg:mt-0 text-gray-800 hover:text-orange-300"
          >
            Contact
          </a>
        </div>
        {session ? (
          <div className="flex">
            <label className="z-50 relative left-14 w-5 h-5 bg-teal-500 rounded-full text-center text-white">
              {prodsInCart}
            </label>

            <Link href={`/cart/${userId}`}>
              <svg
                className="w-12 h-12 mr-6 text-white"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path>
              </svg>
            </Link>
            <AccountInfo user={session?.user} id={userId} avatar={avatar} />
          </div>
        ) : (
          <div className="flex justify-center items-center">
            Not signed in?
            <button
              className="inline-block text-sm px-6 py-3 leading-none border border-orange-400 rounded-3xl text-white bg-orange-400 hover:bg-white hover:text-orange-400 mt-4 ml-2 lg:mt-0"
              onClick={() => signIn()}
            >
              Sign in
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
