import { type PostWithUser } from "@/models/post"
import { type WithId } from "mongodb"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export const PostCard = ({ post }: { post: WithId<PostWithUser> }) => {
  return (
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage src={post.user?.image || ""} alt={post.user?.name || ""} />
        <AvatarFallback>{post.user?.name?.slice(0, 1)}</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <div>
          <h1 className="font-semibold">{post.user?.name}</h1>
        </div>
        <div className="whitespace-pre-wrap">{post.content}</div>
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
