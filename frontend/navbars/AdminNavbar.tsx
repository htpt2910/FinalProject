import { AccountInfo } from "@/components/session/AccountInfo"
import { comfortaa } from "@/libs/font"
import { useSession } from "next-auth/react"
import React from "react"

export default function Navbar() {
  const { data: session } = useSession()
  return (
    <>
      {/* Navbar */}
      <nav className="relative top-0 left-100 w-full z-10  md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>
          <div>
            <span className={"text-white " + comfortaa.className}>
              {session?.user?.name}
            </span>
            <span className="ml-5">
              <AccountInfo user={session?.user} />
            </span>
          </div>
        </div>
      </nav>
    </>
  )
}
