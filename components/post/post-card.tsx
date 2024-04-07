import { type Post } from "@/models/post"
import { type WithId } from "mongodb"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"

export const PostCard = ({ post }: { post: WithId<Post> }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <time dateTime={post.createdAt?.toLocaleString()}>
            {post.createdAt?.toLocaleString()}
          </time>
        </CardTitle>
      </CardHeader>
      <CardContent>{post.content}</CardContent>
    </Card>
  )
}
