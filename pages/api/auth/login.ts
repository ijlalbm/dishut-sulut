// pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../lib/db";
import bcrypt from "bcryptjs";
import { signJwt } from "../../../lib/jwt";

// Define the User type
interface User {
  id: number;
  email: string;
  password_hash: string;
  name: string | null;
  role_id: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { username, password } = req.body ?? {};
  if (!username || !password) return res.status(400).json({ error: "Email and username required" });

  try {
    const [rows] = await pool.query("SELECT id, email, password_hash, name, role_id FROM users WHERE username = ?", [username]);
    const users = rows as User[];

    if (users.length === 0) return res.status(401).json({ error: "Invalid credentials" });

    const user = users[0];
    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

    const token = signJwt({ sub: user.id, email: user.email, username: username, name: user.name, role_id: user.role_id  }, null);

    return res.status(200).json({
      token,
      user: { id: user.id, email: user.email, name: user.name ?? null },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}