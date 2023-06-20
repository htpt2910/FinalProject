import { Navbar } from "@/layouts/Navbar"
import type { AppProps } from "next/app"
import "@/styles/globals.css"
import { Footbar } from "@/layouts/Footbar"
import { SessionProvider, useSession } from "next-auth/react"
import { Layouts } from "@/layouts/Layouts"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layouts pageProps={pageProps} Component={Component} />
    </SessionProvider>
  )
}
