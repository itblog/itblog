import { MongoClient, ServerApiVersion } from "mongodb"

const uri = process.env.MONGODB_URI!

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  monitorCommands: true,
}

export const client = new MongoClient(uri, options)
export const db = client.db()
