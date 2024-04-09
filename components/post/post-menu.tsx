"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useSessionUser } from "@/hooks/use-session-user"
import { removePost } from "@/actions/post"

export interface PostMenuProps {
  post: { id: string; userId: string }
}

export const PostMenu = ({ post }: PostMenuProps) => {
  const user = useSessionUser()

  const handleRemove = async () => {
    await removePost(post.id)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <DotsHorizontalIcon className="h-5 w-5 cursor-pointer text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px]">
          {user?.id === post.userId && (
            <DropdownMenuItem onSelect={handleRemove}>
              <span className=" text-destructive">Remove this post</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <span>Report abuse</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
