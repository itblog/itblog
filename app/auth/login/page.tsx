import { LoginForm } from "@/components/auth/login-form"

export default async function Page() {
  return (
    <main>
      <div className="flex flex-col items-center py-20">
        <LoginForm />
      </div>
    </main>
  )
}
