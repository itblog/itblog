import { AdapterSession } from "@auth/core/adapters"
import { db } from "./db"

export interface Session extends AdapterSession {}

export async function createSession(data: Session) {
  const sessions = db.collection<Session>("sessions")
  const { insertedId } = await sessions.insertOne(data)
  return insertedId
}

export async function getSession(sessionToken: string) {
  const sessions = db.collection<Session>("sessions")

  return await sessions.findOne({ sessionToken })
}

export async function updateSession(data: Session) {
  const sessions = db.collection<Session>("sessions")
  const { sessionToken, ...session } = data

  return await sessions.findOneAndUpdate(
    { sessionToken: sessionToken },
    { $set: session },
  )
}

export async function deleteSession(sessionToken: string) {
  const sessions = db.collection<Session>("sessions")
  return await sessions.findOneAndDelete({ sessionToken })
}
