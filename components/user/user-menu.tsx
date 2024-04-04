"use client"

import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { LoginButton } from "../auth/login-button"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { IoSettingsOutline } from "react-icons/io5"
import { PiSignOut } from "react-icons/pi"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu"
import { useSessionUser } from "@/hooks/use-session-user"

export const UserMenu = () => {
  const router = useRouter()
  const user = useSessionUser()

  if (!user) {
    return <LoginButton />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src={user.image ?? ""} alt={user.name || ""} />
          <AvatarFallback>{user.name?.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={8} align="end" className="w-[180px] p-3">
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-x-2"
          onSelect={(e) => {
            e.preventDefault()
            router.push("/settings")
          }}
        >
          <IoSettingsOutline className="text-muted-foreground h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault()
            signOut()
          }}
          className="flex cursor-pointer items-center gap-x-2"
        >
          <PiSignOut className="text-muted-foreground h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
