import { FindOptions, ObjectId, OptionalId } from "mongodb"
import { db } from "./db"

export interface User {
  name: string
  username: string

  image?: string
  bio?: string
  email?: string
  emailVerified?: Date
  githubUrl?: string

  createdAt: Date
  updatedAt: Date
}

export const createUser = async (user: User) => {
  if (user.username) {
    const existsUser = await getUserByUsername(user.username)
    if (existsUser) {
      user.username = ""
    }
  }
  const doc = {
    ...user,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  const users = db.collection<User>("users")
  const { insertedId } = await users.insertOne(doc)
  if (user.username === "") {
    updateUserById(insertedId, { username: insertedId.toHexString() })
  }
  return insertedId
}

export const getUserById = async (id: string | ObjectId) => {
  const users = db.collection<User>("users")
  const _id = typeof id === "string" ? new ObjectId(id) : id
  return await users.findOne({ _id })
}

export const getUserByEmail = async (email: string) => {
  const users = db.collection<User>("users")
  return await users.findOne({ email })
}

export const getUserByUsername = async (username: string) => {
  const users = db.collection<User>("users")
  return await users.findOne({ username })
}

export const updateUserById = async (
  id: string | ObjectId,
  user: Partial<User>,
) => {
  const users = db.collection<User>("users")
  const _id = typeof id === "string" ? new ObjectId(id) : id
  const filter = { _id }
  return await users.findOneAndUpdate(filter, {
    $set: { ...user, updatedAt: new Date() },
  })
}
