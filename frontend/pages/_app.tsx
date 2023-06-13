import { Navbar } from "@/layouts/Navbar"
import type { AppProps } from "next/app"
import "@/styles/globals.css"
import { Footbar } from "@/layouts/Footbar"
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <div className="bg-orange-50 px-32 w-full">
      <SessionProvider session={session}>
        <Navbar />
        <Component {...pageProps} />
        <Footbar />
      </SessionProvider>
    </div>
  )
}
