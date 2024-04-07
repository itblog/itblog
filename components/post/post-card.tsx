import { type PostWithUser } from "@/models/post"
import { type WithId } from "mongodb"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Link from "next/link"

export const PostCard = ({ post }: { post: WithId<PostWithUser> }) => {
  return (
    <div className="flex gap-4 border-b py-1">
      <Link href={`/${post.user.username}`}>
        <Avatar>
          <AvatarImage
            src={post.user?.image || ""}
            alt={post.user?.name || ""}
          />
          <AvatarFallback>{post.user?.name?.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="space-y-1">
        <div>
          <Link className=" font-semibold" href={`/${post.user.username}`}>
            {post.user?.name}
          </Link>
        </div>
        <div className="whitespace-pre-wrap px-1 py-1">{post.content}</div>
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
