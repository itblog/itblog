import { AdapterAccount } from "@auth/core/adapters"
import { db } from "./db"

export interface Account extends AdapterAccount {}

export const createAccount = async (data: Account) => {
  const accounts = db.collection<Account>("accounts")
  return await accounts.insertOne(data)
}

export const getAccount = async (
  provider: string,
  providerAccountId: string,
) => {
  const accounts = db.collection<Account>("accounts")
  return await accounts.findOne({
    provider,
    providerAccountId,
  })
}
