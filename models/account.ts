import { db } from "./db"
import { ObjectId } from "mongodb"

export interface Account {
  userId: ObjectId
  type: "oauth" | "email"
  provider: string
  providerAccountId: string
}

export const createAccount = async (account: Account) => {
  const accounts = db.collection<Account>("accounts")
  return await accounts.insertOne(account)
}

export const getAccount = async (
  provider: string,
  providerAccountId: string,
) => {
  const accounts = db.collection<Account>("accounts")
  const account = await accounts.findOne({
    provider,
    providerAccountId,
  })
  return account
}
