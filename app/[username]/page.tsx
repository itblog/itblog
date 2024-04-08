import { UserAvatar } from "@/components/user/user-avatar"
import { getUserByUsername } from "@/models/user"
import { notFound } from "next/navigation"

export default async function Page({
  params: { username },
}: {
  params: { username: string }
}) {
  const user = await getUserByUsername(username)
  if (!user) {
    return notFound()
  }

  return (
    <main className="mx-auto max-w-4xl">
      <div className="my-10 flex flex-col items-center gap-4">
        <UserAvatar user={user} className="h-20 w-20" />
        <h1>{user.name}</h1>
        <p>{user.bio}</p>
      </div>
    </main>
  )
}
