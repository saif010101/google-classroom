import { Pool } from "pg";
import 'dotenv/config'

export const db = new Pool({
  connectionString : process.env.DATABASE_URL
})

async function testConnection() {
  try {
    const client = await db.connect();
    console.log("Database connected successfully");
    client.release();
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}

testConnection()


