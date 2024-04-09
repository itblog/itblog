import { formatDistanceToNow, format } from "date-fns"
import { type PostWithUser } from "@/models/post"
import { type WithId } from "mongodb"
import Link from "next/link"
import { UserAvatar } from "../user/user-avatar"
import { PostMenu } from "./post-menu"

export const PostCard = ({ post }: { post: WithId<PostWithUser> }) => {
  return (
    <div className="flex gap-2 border-b">
      <Link href={`/${post.user.username}`}>
        <UserAvatar user={post.user} />
      </Link>
      <div className="flex-1">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <Link href={`/${post.user.username}`}>{post.user?.name}</Link>
            <time
              className="text-xs text-muted-foreground"
              dateTime={format(post.createdAt, "PPP")}
            >
              {formatDistanceToNow(post.createdAt, { addSuffix: true })}
            </time>
          </div>
          <PostMenu
            post={{
              id: post._id.toHexString(),
              userId: post.userId.toHexString(),
            }}
          />
        </div>
        <div className="whitespace-pre-wrap break-all py-4 text-primary/90">
          {post.content}
        </div>
      </div>
    </div>
  )
}
