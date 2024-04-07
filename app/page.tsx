import { PostCard } from "@/components/post/post-card"
import { PostForm } from "@/components/post/post-form"
import { getLatestPosts } from "@/models/post"

export default async function Page() {
  const posts = await getLatestPosts()

  return (
    <main className="mx-auto my-6 max-w-screen-md space-y-6 px-2 md:px-0">
      <PostForm />
      <h1 className="text-2xl">Posts</h1>
      <div className="space-y-2">
        {posts.map((post) => (
          <PostCard post={post} key={post._id.toHexString()} />
        ))}
      </div>
    </main>
  )
}
