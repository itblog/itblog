"use client"

import { signIn } from "next-auth/react"
import { Button } from "../ui/button"
import { useState } from "react"
import { FaGithub } from "react-icons/fa"
import { FaSpinner } from "react-icons/fa"
import { useSearchParams } from "next/navigation"

export const AuthGitHub = () => {
  const [loading, setLoading] = useState(false)

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const handleClick = async () => {
    setLoading(true)
    await signIn("github", {
      callbackUrl: callbackUrl,
    })
  }

  return (
    <Button onClick={handleClick} disabled={loading} className="gap-x-2">
      {loading ? (
        <FaSpinner className="h-5 w-5 animate-spin" />
      ) : (
        <FaGithub className="h-5 w-5" />
      )}
      <span>Login with GitHub</span>
    </Button>
  )
}
