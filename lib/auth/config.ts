import { NextAuthConfig } from "next-auth"
import GitHub from "@auth/core/providers/github"

export const authConfig = {
  providers: [
    GitHub({
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
          bio: profile.bio,
          githubUrl: profile.html_url,
        }
      },
    }),
  ],
} satisfies NextAuthConfig
