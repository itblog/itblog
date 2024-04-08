import { type Metadata } from "next"
import { Navbar } from "@/components/common/navbar"
import { getUserByUsername } from "@/models/user"

export async function generateMetadata({
  params: { username },
}: {
  params: { username: string }
}): Promise<Metadata> {
  const user = await getUserByUsername(username)
  if (!user) {
    return {
      title: "",
    }
  }
  return {
    title: user.name || user.username,
    description: user.bio,
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
