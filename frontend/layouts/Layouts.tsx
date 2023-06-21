import { useSession } from "next-auth/react"
import { Navbar } from "./Navbar"
import { Footbar } from "./Footbar"
import Sidebar from "./Sidebar"
import AdminNavbar from "@/navbars/AdminNavbar"
import HeaderStats from "@/navbars/HeaderStats"

interface LayoutsProps {
  pageProps: any
  Component: any
}

export const Layouts = ({ pageProps, Component }: LayoutsProps) => {
  const { data: session } = useSession()
  return (
    <>
      {session?.user?.email === "hmc2910@gmail.com" ? (
        <div>
          <Sidebar />
          <div className="relative md:ml-64 bg-slate-800 ">
            <AdminNavbar />
            <HeaderStats />
            <div className="px-4 md:px-10 mx-auto w-full m-36 bg-gray-100 h-screen">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-orange-50 px-32 w-screen h-screen">
          <Navbar />
          <Component {...pageProps} />
          <Footbar />
        </div>
      )}
    </>
  )
}
