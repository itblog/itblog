import { PostCard } from "@/components/post/post-card"
import { UserAvatar } from "@/components/user/user-avatar"
import { getUserPosts } from "@/models/post"
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

  const posts = await getUserPosts(user._id)

  return (
    <main className="mx-auto max-w-4xl">
      <div className="my-10 flex flex-col items-center gap-4">
        <UserAvatar user={user} className="h-20 w-20" />
        <h1>{user.name}</h1>
        <p>{user.bio}</p>
      </div>
      <div>
        <h1 className="text-2xl font-semibold">Posts</h1>
        {posts.map((post) => (
          <PostCard
            key={post._id.toHexString()}
            post={{ ...post, user: user }}
          />
        ))}
      </div>
    </main>
  )
}
