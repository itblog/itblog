import Link from "next/link"
import { auth } from "@/lib/auth"
import { LoginButton } from "../auth/login-button"
import { UserMenu } from "../user/user-menu"

export const Navbar = async () => {
  const session = await auth()
  return (
    <nav className="w-full border-b">
      <div className="flex h-12 items-center justify-between gap-x-2 px-4 md:gap-x-6">
        <div className="flex items-center gap-x-4">
          <h1 className="text-2xl">
            <Link href="/">itblog</Link>
          </h1>
        </div>

        <div className="flex items-center gap-x-2">
          {session?.user ? <UserMenu /> : <LoginButton />}
        </div>
      </div>
    </nav>
  )
}
