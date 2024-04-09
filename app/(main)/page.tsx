import { PostCard } from "@/components/post/post-card"
import { PostForm } from "@/components/post/post-form"
import { getLatestPosts } from "@/models/post"

export default async function Page() {
  const posts = await getLatestPosts()

  return (
    <>
      <PostForm />
      <h1 className="text-2xl">Posts</h1>
      <div>
        {posts.map((post) => (
          <PostCard post={post} key={post._id.toHexString()} />
        ))}
      </div>
    </>
  )
}
