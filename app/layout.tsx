import "@/styles/index.css"

import type { Metadata } from "next"

import { auth } from "@/lib/auth"
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "next-auth/react"
import { inter } from "@/lib/fonts"

export const metadata: Metadata = {
  title: { default: "itblog", template: "%s - itblog" },
  description: "",
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
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  )
}
