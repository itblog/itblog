import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"

export default async function Page() {
  return (
    <main className="flex min-h-[calc(100vh-320px)] flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <Link href="/">
          <h1 className="text-2xl">itblog</h1>
        </Link>
        <LoginForm />
      </div>
    </main>
  )
}
