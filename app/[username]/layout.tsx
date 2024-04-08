import { type Metadata } from "next"
import { Navbar } from "@/components/common/navbar"

export async function generateMetadata({
  params: { username },
}: {
  params: { username: string }
}): Promise<Metadata> {
  return {
    title: username,
  }
}

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
