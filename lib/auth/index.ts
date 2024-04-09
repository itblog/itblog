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
  callbacks: {
    async session({ session }) {
      return {
        user: {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
          username: session.user.username,
        },
        expires: session.expires,
      }
    },
  },
  ...authConfig,
})

export const getSessionUser = async () => {
  const session = await auth()
  return session?.user
}
