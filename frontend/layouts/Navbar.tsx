import { WebsiteIcon } from "@/components/icon/WebsiteIcon"
import { comfortaa } from "@/libs/font"
import React from "react"

export const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = React.useState(false)
  return (
    <nav className="flex items-center justify-between flex-wrap py-6">
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
            href="#responsive-header"
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
        <div>
          <a
            href="#"
            className="inline-block text-sm px-6 py-3 leading-none  text-orange-400 hover:border-transparent hover:text-orange-500 mt-4 lg:mt-0"
          >
            Sign up
          </a>
        </div>
        <div>
          <a
            href="#"
            className="inline-block text-sm px-6 py-3 leading-none border border-orange-400 rounded-3xl text-white bg-orange-400 hover:bg-white hover:text-orange-400 mt-4 lg:mt-0"
          >
            Sign in
          </a>
        </div>
      </div>
    </nav>
  )
}
