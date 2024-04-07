import { ObjectId, WithId } from "mongodb"
import { db } from "./db"
import { User } from "./user"

export interface Post {
  userId: ObjectId
  content: string
  createdAt?: Date
  updatedAt?: Date
}

export interface PostWithUser extends Post {
  user: WithId<User>
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

export const getPosts = async () => {
  const posts = db.collection<Post>("posts")
  const docs = await posts.find().limit(10).toArray()
  return docs
}

export const getLatestPosts = async () => {
  const posts = db.collection<Post>("posts")
  const pipeline = []
  pipeline.push({
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "_user",
    },
  })
  pipeline.push({
    $set: {
      user: {
        $first: "$_user",
      },
    },
  })
  const docs = (await posts
    .aggregate(pipeline)
    .limit(50)
    .sort({ _id: -1 })
    .toArray()) as WithId<PostWithUser>[]

  return docs
}
