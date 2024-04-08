import { type FindOptions, ObjectId } from "mongodb"
import { db } from "./db"
import { AdapterUser } from "@auth/core/adapters"

export interface User extends AdapterUser {
  username?: string | null
  password?: string
  bio?: string
  githubUrl?: string
  createdAt?: Date
  updatedAt?: Date
}

export async function getUserById(
  id: string | ObjectId,
  options?: FindOptions,
) {
  const users = db.collection<User>("users")
  const _id = typeof id === "string" ? new ObjectId(id) : id
  const filter = { _id }
  return await users.findOne(filter, options)
}

export async function getUserByEmail(email: string, options?: FindOptions) {
  const users = db.collection<User>("users")
  return await users.findOne({ email }, options)
}

export async function getUserByUsername(
  username: string,
  options?: FindOptions,
) {
  const users = db.collection<User>("users")
  const user = await users.findOne({ username }, options)
  return user
}

export async function updateUserById(
  id: string | ObjectId,
  user: Partial<User>,
) {
  const users = db.collection<User>("users")
  const _id = typeof id === "string" ? new ObjectId(id) : id
  const filter = { _id }
  return await users.findOneAndUpdate(filter, {
    $set: { ...user, updatedAt: new Date() },
  })
}

export async function createUser(user: User) {
  if (user.username) {
    const existsUser = await getUserByUsername(user.username)
    if (existsUser) {
      user.username = null
    }
  }
  const doc = {
    ...user,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  const users = db.collection<User>("users")
  const { insertedId } = await users.insertOne(doc)
  if (!user.username) {
    updateUserById(insertedId, { username: insertedId.toHexString() })
  }
  return insertedId
}
