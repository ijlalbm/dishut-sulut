// pages/api/auth/me.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../lib/db";
import { verifyJwt } from "../../../lib/jwt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ error: "Missing token" });

  const token = auth.split(" ")[1];
  try {
    const payload = verifyJwt<{ sub: number; email?: string }>(token);
    const userId = payload.sub;
    const [rows] = await pool.query("SELECT id, email, name, created_at FROM users WHERE id = ?", [userId]);
    const users = rows as any[];

    if (!users.length) return res.status(404).json({ error: "User not found" });

    const user = users[0];
    return res.status(200).json({ user });
  } catch (err: any) {
    console.error(err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}