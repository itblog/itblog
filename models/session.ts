import { AdapterSession } from "@auth/core/adapters"
import { db } from "./db"

export interface Session extends AdapterSession {}

export const createSession = async (data: Session) => {
  const sessions = db.collection<Session>("sessions")
  const { insertedId } = await sessions.insertOne(data)
  return insertedId
}

export const getSession = async (sessionToken: string) => {
  const sessions = db.collection<Session>("sessions")

  return await sessions.findOne({ sessionToken })
}

export const updateSession = async (data: Session) => {
  const sessions = db.collection<Session>("sessions")
  const { sessionToken } = data
  return await sessions.findOneAndUpdate({ sessionToken }, { $set: data })
}

export const deleteSession = async (sessionToken: string) => {
  const sessions = db.collection<Session>("sessions")
  return await sessions.findOneAndDelete({ sessionToken })
}
