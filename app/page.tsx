import { AuthGitHub } from "@/components/auth/auth-github"
import { auth } from "@/lib/auth"

export default async function Home() {
  const session = await auth()
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl">itblog</h1>

      <AuthGitHub />
    </main>
  )
}
