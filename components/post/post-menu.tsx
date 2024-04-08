import Link from "next/link"

import { Button } from "../ui/button"

import {
  ChatBubbleIcon,
  DotsHorizontalIcon,
  HeartIcon,
} from "@radix-ui/react-icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { WithId } from "mongodb"
import { PostWithUser } from "@/models/post"

export const PostMenu = ({ post }: { post: WithId<PostWithUser> }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DotsHorizontalIcon className="h-4 w-4 cursor-pointer text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuItem>
          <span>Remove this post</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Report abuse</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
