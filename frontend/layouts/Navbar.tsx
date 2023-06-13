import { WebsiteIcon } from "@/components/icon/WebsiteIcon"
import { AccountInfo } from "@/components/session/AccountInfo"
import { comfortaa } from "@/libs/font"
import { useSession, signIn } from "next-auth/react"
import React from "react"

export const Navbar = () => {
  const { data: session } = useSession()

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
            href="#responsive-header"
            className="block mt-4 px-7 lg:inline-block lg:mt-0 text-gray-800 hover:text-orange-300 mr-4"
          >
            Services
          </a>
          <a
            href="#responsive-header"
            className="block mt-4 px-7 lg:inline-block lg:mt-0 text-gray-800 hover:text-orange-300"
          >
            Contact
          </a>
        </div>
        {session ? (
          <AccountInfo user={session?.user} />
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
