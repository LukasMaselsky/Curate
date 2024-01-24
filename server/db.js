import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export const db = mysql.createConnection(process.env.DATABASE_URL);
