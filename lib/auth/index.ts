import NextAuth from "next-auth"

import { MyAdapter } from "./adapter"
import { authConfig } from "./config"
import { updateUserById } from "@/models/user"

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
  events: {
    async linkAccount({ user }) {
      if (user.id) {
        await updateUserById(user.id, { emailVerified: new Date() })
      }
    },
  },
  callbacks: {
    async session({ session }) {
      console.log("callbacks session", session)
      return session
    },
    async jwt({ token, user }) {
      console.log({ token })
      console.log({ user })

      return token
    },
  },
  ...authConfig,
})
