import { LoginForm } from "@/components/auth/login-form"

export default async function Page() {
  return (
    <main>
      <div className="flex min-h-[calc(100vh-150px)] flex-col items-center justify-center">
        <LoginForm />
      </div>
    </main>
  )
}
