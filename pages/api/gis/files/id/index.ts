import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await pool;
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      const [rows] = await db.query("SELECT * FROM gis_files WHERE id=?", [id]);
      return res.status(200).json(rows);
    }

    if (req.method === "PUT") {
      const { file_path, file_type } = req.body;

      await db.query(
        "UPDATE gis_files SET file_path=?, file_type=? WHERE id=?",
        [file_path, file_type, id]
      );

      return res.status(200).json({ message: "File updated" });
    }

    if (req.method === "DELETE") {
      await db.query("DELETE FROM gis_files WHERE id=?", [id]);
      return res.status(200).json({ message: "File deleted" });
    }

    res.status(405).json({ message: "Method not allowed" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  } finally {
    db.end();
  }
}