"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useSessionUser } from "@/hooks/use-session-user"

export interface PostMenuProps {
  post: { id: string; userId: string }
}

export const PostMenu = ({ post }: PostMenuProps) => {
  const user = useSessionUser()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <DotsHorizontalIcon className="h-4 w-4 cursor-pointer text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px]">
          {user?.id === post.userId && (
            <DropdownMenuItem>
              <span>Remove this post</span>
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
