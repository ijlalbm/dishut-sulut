import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const penyuluhId = Number(req.query.penyuluh_id);
  if (Number.isNaN(penyuluhId)) return res.status(400).json({ error: "Invalid penyuluh_id" });

  try {
    if (req.method === "GET") {
      const [rows] = await pool.query(
        "SELECT * FROM fauna WHERE penyuluh_id = ?",
        [penyuluhId]
      );
      if ((rows as any[]).length === 0) {
        return res.status(404).json({ error: "No records found for the given penyuluh_id" });
      }
      return res.status(200).json(rows);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}