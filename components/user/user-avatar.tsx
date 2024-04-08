import { User } from "@/models/user"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { cn } from "@/lib/utils"

interface UserAvatarProps {
  user: User
  className?: string
}

export const UserAvatar = ({ user, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn("h-10 w-10", className)}>
      <AvatarImage src={user.image ?? ""} alt={user.name || ""} />
      <AvatarFallback>{user.name?.slice(0, 1)}</AvatarFallback>
    </Avatar>
  )
}
