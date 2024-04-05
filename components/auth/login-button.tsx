"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "../ui/button"
import { signIn } from "next-auth/react"

export const LoginButton = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  return (
    <Button
      onClick={() =>
        signIn(undefined, {
          callbackUrl: callbackUrl,
        })
      }
      variant="ghost"
    >
      Login
    </Button>
  )
}
