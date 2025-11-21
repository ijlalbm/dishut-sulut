// pages/api/auth/register.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../lib/db";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

// Define the User type
interface User {
  id: number;
  email: string;
  password_hash: string;
  name: string | null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, username, password, name } = req.body ?? {};

  if (!email || !password || !username) {
    return res.status(400).json({ error: "Email, username, password are required" });
  }

  try {
    // check existing
    const [rows] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if ((rows as User[]).length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    // check existing
    const [uname] = await pool.query("SELECT id FROM users WHERE username = ?", [username]);
    if ((uname as User[]).length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    const [result] = await pool.query(
      "INSERT INTO users (email, username, password_hash, name, status) VALUES (?, ?, ?, ?, ?)",
      [email, username, hash, name || null, false]
    );

    const insertId = (result as any).insertId;

    return res.status(201).json({ id: insertId, email, username: username, name: name || null });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}