import { ObjectId } from "mongodb"
import type {
  Adapter,
  AdapterUser,
  AdapterAccount,
  AdapterSession,
} from "@auth/core/adapters"

import {
  createUser,
  getUserByEmail,
  getUserById,
  updateUserById,
} from "@/models/user"
import {
  createSession,
  deleteSession,
  getSession,
  updateSession,
} from "@/models/session"
import { createAccount, getAccount } from "@/models/account"

export const MyAdapter: Adapter = {
  createUser: async ({ id, ...data }) => {
    const user = format.to<AdapterUser>(data)
    user._id = await createUser(user)
    return format.from<AdapterUser>(user)
  },
  getUser: async (id) => {
    const user = await getUserById(id)
    if (!user) {
      return null
    }
    return format.from<AdapterUser>(user)
  },
  getUserByEmail: async (email) => {
    const user = await getUserByEmail(email)
    if (!user) {
      return null
    }
    return format.from<AdapterUser>(user)
  },
  getUserByAccount: async (provider_providerAccountId) => {
    const { provider, providerAccountId } = provider_providerAccountId
    const account = await getAccount(provider, providerAccountId)
    if (!account) {
      return null
    }
    const user = await getUserById(account.userId)
    if (!user) {
      return null
    }
    return format.from<AdapterUser>(user)
  },
  updateUser: async (data) => {
    const { _id, ...user } = format.to<AdapterUser>(data)
    const result = await updateUserById(_id, user)
    return format.from<AdapterUser>(result!)
  },
  linkAccount: async (data) => {
    const account = format.to<AdapterAccount>(data)
    await createAccount(account)
    return format.from<AdapterAccount>(account)
  },
  createSession: async (data) => {
    const session = format.to<AdapterSession>(data)
    await createSession(session)
    return format.from<AdapterSession>(session)
  },
  getSessionAndUser: async (sessionToken) => {
    const session = await getSession(sessionToken)
    if (!session) {
      return null
    }
    const user = await getUserById(session.userId, {
      projection: { name: 1, username: 1, image: 1 },
    })
    if (!user) {
      return null
    }

    return {
      session: format.from<AdapterSession>(session),
      user: format.from<AdapterUser>(user),
    }
  },
  updateSession: async (data) => {
    const { _id, ...session } = format.to<AdapterSession>(data)
    const updatedSession = await updateSession(session)
    return format.from<AdapterSession>(updatedSession!)
  },
  deleteSession: async (sessionToken) => {
    const session = await deleteSession(sessionToken)
    return format.from<AdapterSession>(session!)
  },
}

const format = {
  /** Takes a mongoDB object and returns a plain old JavaScript object */
  from<T = Record<string, unknown>>(object: Record<string, any>): T {
    const newObject: Record<string, unknown> = {}
    for (const key in object) {
      const value = object[key]
      if (key === "_id") {
        newObject.id = value.toHexString()
      } else if (key === "userId") {
        newObject[key] = value.toHexString()
      } else {
        newObject[key] = value
      }
    }
    return newObject as T
  },
  /** Takes a plain old JavaScript object and turns it into a mongoDB object */
  to<T = Record<string, unknown>>(object: Record<string, any>) {
    const newObject: Record<string, unknown> = {}
    for (const key in object) {
      const value = object[key]
      if (key === "id") {
        newObject._id = new ObjectId(value as string)
      } else if (key === "userId") {
        newObject[key] = new ObjectId(value as string)
      } else {
        newObject[key] = value
      }
    }
    return newObject as T & { _id: ObjectId }
  },
}
