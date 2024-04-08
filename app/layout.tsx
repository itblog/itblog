import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SessionProvider } from "next-auth/react"
import "@/styles/index.css"
import { auth } from "@/lib/auth"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

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
      <body className={cn("", inter.className)}>
        <SessionProvider session={session}>{children}</SessionProvider>
        <Toaster />
      </body>
    </html>
  )
}
