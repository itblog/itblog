import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SessionProvider } from "next-auth/react"
import "@/styles/index.css"
import { auth } from "@/lib/auth"
import { Navbar } from "@/components/common/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "itblog",
  description: "itblog",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
