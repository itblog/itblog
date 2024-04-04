"use client"

import { Button } from "../ui/button"
import { signIn } from "next-auth/react"

export const LoginButton = () => {
  return (
    <Button onClick={() => signIn()} variant="ghost">
      Login
    </Button>
  )
}
