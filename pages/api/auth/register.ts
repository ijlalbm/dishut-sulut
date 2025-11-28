// pages/api/auth/register.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../lib/db";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    email,
    username,
    password,
    name,
    no_hp,
    gender,
    instansi,
    wilayah_kerja,
    alamat,
    role_id,
  } = req.body ?? {};

  if (!email || !password || !username || !name || !no_hp || !gender || !instansi || !wilayah_kerja || !alamat || !role_id) {
    return res.status(400).json({ error: "Semua field wajib diisi" });
  }

  try {
    // check existing email
    const [rows] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if ((rows as any[]).length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    // check existing username
    const [uname] = await pool.query("SELECT id FROM users WHERE username = ?", [username]);
    if ((uname as any[]).length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    const [result] = await pool.query(
      `INSERT INTO users 
        (email, username, password_hash, name, no_hp, gender, instansi, wilayah_kerja, alamat, status, role_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [email, username, hash, name, no_hp, gender, instansi, wilayah_kerja, alamat, false, role_id]
    );

    const insertId = (result as any).insertId;

    return res.status(201).json({
      id: insertId,
      email,
      username,
      name,
      no_hp,
      gender,
      instansi,
      wilayah_kerja,
      alamat,
      role_id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}