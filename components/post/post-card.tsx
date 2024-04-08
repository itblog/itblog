import { type PostWithUser } from "@/models/post"
import { type WithId } from "mongodb"
import Link from "next/link"
import { UserAvatar } from "../user/user-avatar"

export const PostCard = ({ post }: { post: WithId<PostWithUser> }) => {
  return (
    <div className="flex gap-4 border-b py-1">
      <Link href={`/${post.user.username}`}>
        <UserAvatar user={post.user} />
      </Link>
      <div className="space-y-1">
        <div>
          <Link className=" font-semibold" href={`/${post.user.username}`}>
            {post.user?.name}
          </Link>
        </div>
        <div className="whitespace-pre-wrap break-all px-1 py-1">
          {post.content}
        </div>
        <time
          className=" text-xs text-muted-foreground"
          dateTime={post.createdAt?.toLocaleString()}
        >
          {post.createdAt?.toLocaleString()}
        </time>
      </div>
    </div>
  )
}
