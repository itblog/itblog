import { z } from "zod"

export const postSchema = z.object({
  content: z
    .string()
    .min(1, {
      message: "The post content is required",
    })
    .max(512, { message: "The post content is too long" }),
})

export type PostSchema = z.infer<typeof postSchema>
