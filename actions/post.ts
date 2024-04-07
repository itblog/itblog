"use server"

import { getSessionUserId } from "@/lib/auth"
import { Post, createPost } from "@/models/post"
import { PostSchema, postSchema } from "@/schemas/post"
import { ObjectId } from "mongodb"

export const submitPost = async (data: PostSchema) => {
  const userId = await getSessionUserId()
  if (!userId) {
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

  const post: Post = {
    userId: new ObjectId(userId),
    content: content,
  }
  await createPost(post)
}
