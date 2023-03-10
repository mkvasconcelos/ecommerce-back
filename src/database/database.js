import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let db;
const mongoClient = new MongoClient(process.env.DATABASE_URL);
try {
  await mongoClient.connect();
  db = mongoClient.db();
} catch (error) {
  console.log("mongoClient.connect() error!", error);
}

export default db;
