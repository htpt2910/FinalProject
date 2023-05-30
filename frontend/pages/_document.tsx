import { Html, Head, Main, NextScript } from "next/document"
import Link from "next/link"
import Script from "next/script"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Link
          href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.css"
          rel="stylesheet"
        />
      </Head>

      <body>
        <Main />
        <NextScript />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"
          strategy="beforeInteractive"
        ></Script>
      </body>
    </Html>
  )
}
