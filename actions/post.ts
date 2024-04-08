"use server"

import { getSessionUser } from "@/lib/auth"
import { Post, createPost } from "@/models/post"
import { PostSchema, postSchema } from "@/schemas/post"
import { ObjectId } from "mongodb"
import { revalidatePath } from "next/cache"

export const submitPost = async (data: PostSchema) => {
  const user = await getSessionUser()
  if (!user) {
    return {
      error: "Unauthorized",
    }
  }
  const validation = postSchema.safeParse(data)
  if (!validation.success) {
    return {
      error: "Invalid fields",
    }
  }
  const { content } = validation.data

  const post = {
    userId: new ObjectId(user.id),
    content: content,
  }
  await createPost(post)
  revalidatePath("/")
}
