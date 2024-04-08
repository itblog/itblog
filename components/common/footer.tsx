import Link from "next/link"
import { GitHubLogoIcon } from "@radix-ui/react-icons"

export function Footer() {
  return (
    <footer className="border-t px-4 py-6">
      <div className="mx-auto flex max-w-screen-md justify-between text-sm">
        <div className="flex items-center gap-1">
          <span>&copy; 2024 </span>
          <Link href="https://itblog.com">itblog</Link>
        </div>
        <Link
          href="https://github.com/itblog/itblog"
          className="flex items-center gap-1"
        >
          <GitHubLogoIcon />
          <span>Github</span>
        </Link>
      </div>
    </footer>
  )
}
