/*
import mysql from "mysql2";

export const db = mysql.createConnection(process.env.DATABASE_URL);
*/
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import pg from "pg";

export const db = new pg.Client(process.env.DATABASE_URL);

await db.connect();

//! IMPORTANT:
//! CocroachDB returns data.rows instead of just data
//! needed for register and login, as well as return data at the end of each controller
