import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../../lib/db";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  try {
    if (req.method === "GET") {
      const [rows] = await pool.query(
        "SELECT id, email, username, name, status FROM users WHERE id = ?",
        [id]
      );
      const user = (rows as any[])[0];
      if (!user) return res.status(404).json({ error: "User not found" });
      return res.status(200).json(user);
    }

    if (req.method === "PUT" || req.method === "PATCH") {
      const { email, username, password, name, status } = req.body ?? {};

      // fetch existing
      const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
      const existing = (rows as any[])[0];
      if (!existing) return res.status(404).json({ error: "User not found" });

      // Determine which values to update. If value is null or empty string, keep existing.
      const newEmail =
        typeof email === "string" && email.trim() !== "" ? email.trim() : existing.email;
      const newUsername =
        typeof username === "string" && username.trim() !== "" ? username.trim() : existing.username;

      // Check email conflict only if changed
      if (newEmail !== existing.email) {
        const [er] = await pool.query("SELECT id FROM users WHERE email = ? AND id != ?", [
          newEmail,
          id,
        ]);
        if ((er as any[]).length > 0) return res.status(409).json({ error: "Email already in use" });
      }

      // Check username conflict only if changed
      if (newUsername !== existing.username) {
        const [ur] = await pool.query("SELECT id FROM users WHERE username = ? AND id != ?", [
          newUsername,
          id,
        ]);
        if ((ur as any[]).length > 0)
          return res.status(409).json({ error: "Username already in use" });
      }

      // Password: update only if provided and not empty string
      const passwordHash =
        typeof password === "string" && password !== ""
          ? await bcrypt.hash(password, SALT_ROUNDS)
          : existing.password_hash;

      // Name: update only if provided and not empty string
      const newName = typeof name === "string" && name !== "" ? name : existing.name;

      // Status: update only if present in body and not null/empty string (allow false boolean)
      const hasStatus = Object.prototype.hasOwnProperty.call(req.body, "status");
      const newStatus =
        hasStatus && status !== null && status !== "" ? status : existing.status;

      await pool.query(
        "UPDATE users SET email = ?, username = ?, password_hash = ?, name = ?, status = ? WHERE id = ?",
        [newEmail, newUsername, passwordHash, newName ?? null, newStatus ?? false, id]
      );

      const [updatedRows] = await pool.query(
        "SELECT id, email, username, name, status FROM users WHERE id = ?",
        [id]
      );
      return res.status(200).json((updatedRows as any[])[0]);
    }

    if (req.method === "DELETE") {
      const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
      const affected = (result as any).affectedRows ?? 0;
      if (affected === 0) return res.status(404).json({ error: "User not found" });
      return res.status(204).end();
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}