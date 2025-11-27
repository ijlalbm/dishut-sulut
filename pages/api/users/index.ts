import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../lib/db";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const [rows] = await pool.query(
        "SELECT id, email, username, name, status FROM users ORDER BY id DESC"
      );
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
      const { email, username, password, no_hp, name, status } = req.body ?? {};

      if (!email || !username || !password) {
        return res.status(400).json({ error: "email, username and password are required" });
      }

      // check existing email
      const [emailRows] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
      if ((emailRows as any[]).length > 0) {
        return res.status(409).json({ error: "Email already in use" });
      }

      // check existing username
      const [userRows] = await pool.query("SELECT id FROM users WHERE username = ?", [username]);
      if ((userRows as any[]).length > 0) {
        return res.status(409).json({ error: "Username already in use" });
      }

      const hash = await bcrypt.hash(password, SALT_ROUNDS);

      const [result] = await pool.query(
        "INSERT INTO users (email, username, password_hash, no_hp, name, status) VALUES (?, ?, ?, ?, ?, ?)",
        [email, username, hash, no_hp ?? null, name ?? null, status ?? false]
      );

      const insertId = (result as any).insertId;

      const [createdRows] = await pool.query(
        "SELECT id, email, username, name, status FROM users WHERE id = ?",
        [insertId]
      );

      return res.status(201).json((createdRows as any[])[0]);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}