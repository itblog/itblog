import { AdapterAccount } from "@auth/core/adapters"
import { db } from "./db"

export interface Account extends AdapterAccount {}

export async function createAccount(data: Account) {
  const accounts = db.collection<Account>("accounts")
  return await accounts.insertOne(data)
}

export async function getAccount(provider: string, providerAccountId: string) {
  const accounts = db.collection<Account>("accounts")
  return await accounts.findOne({
    provider,
    providerAccountId,
  })
}
