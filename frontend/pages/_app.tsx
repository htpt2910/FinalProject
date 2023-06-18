import { Navbar } from "@/layouts/Navbar"
import type { AppProps } from "next/app"
import "@/styles/globals.css"
import { Footbar } from "@/layouts/Footbar"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-orange-50 px-32 w-full">
      <Navbar />
      <Component {...pageProps} />
      <Footbar />
    </div>
  )
}
