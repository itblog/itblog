import { ObjectId } from "mongodb"
import { db } from "./db"

export interface Post {
  userId: ObjectId
  content: string
  createdAt?: Date
  updatedAt?: Date
}

export const createPost = async (data: Post) => {
  const posts = db.collection<Post>("posts")
  const doc: Post = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const { insertedId } = await posts.insertOne(doc)

  return insertedId
}

export const getLatestPosts = async () => {
  const posts = db.collection<Post>("posts")
  const docs = await posts.find().sort({ _id: -1 }).limit(50).toArray()
  return docs
}
