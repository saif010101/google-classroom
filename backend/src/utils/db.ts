import { Pool } from "pg";
import 'dotenv/config'

export const db = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT),
    database: process.env.PGDATABASE
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


