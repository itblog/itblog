import NextAuth from "next-auth"

import { MyAdapter } from "./adapter"
import { authConfig } from "./config"

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: MyAdapter,
  pages: {
    signIn: "/auth/login",
  },
  ...authConfig,
})

export const getSessionUserId = async () => {
  const session = await auth()
  return session?.user.id
}
