"use client"

import { PostSchema, postSchema } from "@/schemas/post"
import { Button } from "../ui/button"
import { submitPost } from "@/actions/post"
import { Textarea } from "../ui/textarea"
import { useTransition } from "react"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { useToast } from "../ui/use-toast"
import { AutoHeightTextarea } from "../common/autoheight-textarea"

export const PostForm = () => {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()

  const form = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
    },
  })

  const handleSubmit = async (data: PostSchema) => {
    startTransition(async () => {
      const result = await submitPost(data)
      if (result?.error) {
        if (result.error === "Unauthorized") {
          return await signIn()
        }
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: result.error,
        })
      } else {
        form.reset()
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex items-center gap-2"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <>
                  <AutoHeightTextarea
                    rows={1}
                    maxRows={3}
                    className="min-h-0"
                    {...field}
                    placeholder="What's on your mind?"
                  />
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Post
        </Button>
      </form>
    </Form>
  )
}
