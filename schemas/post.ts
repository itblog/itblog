import { z } from "zod"

export const postSchema = z.object({
  content: z.string().min(1, {
    message: "content is required",
  }),
})

export type PostSchema = z.infer<typeof postSchema>
