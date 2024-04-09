import { ObjectId, WithId } from "mongodb"
import { db } from "./db"
import { User } from "./user"

export interface Post {
  userId: ObjectId
  content: string
  createdAt: Date
  updatedAt: Date
}

export interface PostWithUser extends Post {
  user: WithId<User>
}

export const createPost = async (
  post: Omit<Post, "createdAt" | "updatedAt">,
) => {
  const posts = db.collection<Post>("posts")

  const { insertedId } = await posts.insertOne({
    ...post,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  return insertedId
}

export const getPostById = async (id: string | ObjectId) => {
  const posts = db.collection<Post>("posts")
  const _id = typeof id === "string" ? new ObjectId(id) : id
  const post = await posts.findOne({ _id })
  return post
}

export const deletePostById = async (
  id: string | ObjectId,
  userId: string | ObjectId,
) => {
  const posts = db.collection<Post>("posts")
  const _id = typeof id === "string" ? new ObjectId(id) : id
  const _userId = typeof userId === "string" ? new ObjectId(userId) : userId
  const post = await posts.findOneAndDelete({ _id, userId: _userId })
  return post
}

export const getUserPosts = async (
  userId: string | ObjectId,
  page: number = 1,
  limit: number = 10,
) => {
  const posts = db.collection<Post>("posts")
  const _userId = typeof userId === "string" ? new ObjectId(userId) : userId
  const skip = (page - 1) * limit
  const docs = await posts
    .find({
      userId: _userId,
    })
    .skip(skip)
    .limit(limit)
    .toArray()
  return docs
}

export const getLatestPosts = async (page: number = 1, limit: number = 10) => {
  const posts = db.collection<Post>("posts")
  const pipeline = []

  pipeline.push({
    $sort: { createdAt: -1 },
  })

  const skip = (page - 1) * limit
  pipeline.push({
    $skip: skip,
  })
  pipeline.push({
    $limit: limit,
  })

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

  pipeline.push({
    $unset: ["_user"],
  })

  const docs = await posts.aggregate(pipeline).toArray()

  return docs as WithId<PostWithUser>[]
}
