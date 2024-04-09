"use client"

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
import Link from "next/link"

export const UserMenu = () => {
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
      <DropdownMenuContent sideOffset={8} align="end" className="w-[180px]">
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-x-2"
          asChild
        >
          <Link href={"/settings"}>
            <IoSettingsOutline className="h-4 w-4 text-muted-foreground" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={() => {
            signOut()
          }}
          className="flex cursor-pointer items-center gap-x-2"
        >
          <PiSignOut className="h-4 w-4 text-muted-foreground" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
