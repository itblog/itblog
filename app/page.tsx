import { getUserById } from "@/models/user"

export default async function Page() {
  const user = await getUserById("660f8a35d0e1070a9daebecb")
  console.log({ user })
  return (
    <main className="mx-auto my-6 max-w-4xl space-y-6">
      <h1 className="break-words text-3xl">Home</h1>
    </main>
  )
}
