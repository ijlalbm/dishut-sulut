import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await pool;

  try {
    if (req.method === "GET") {
      const [rows] = await db.query("SELECT * FROM gis_files ORDER BY created_at DESC");
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
      const { layer_id, file_path, file_type } = req.body;

      await db.query(
        "INSERT INTO gis_files (layer_id, file_path, file_type) VALUES (?, ?, ?)",
        [layer_id, file_path, file_type]
      );

      return res.status(201).json({ message: "File created" });
    }

    res.status(405).json({ message: "Method not allowed" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  } finally {
    db.end();
  }
}