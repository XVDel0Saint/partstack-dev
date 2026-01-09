import type React from "react"
import type { Metadata } from "next"
import { Open_Sans, Montserrat } from "next/font/google"
import "./globals.css"

const openSans = Open_Sans({ subsets: ["latin"] })
const montserrat = Montserrat({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PartStack - PC Hardware Store",
  description: "Your One-Stop Shop for Computer Hardware - High-quality components at unbeatable prices.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/apple-icon.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/apple-icon.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
