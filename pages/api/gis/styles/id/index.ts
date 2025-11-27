import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await pool;
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      const [rows] = await db.query("SELECT * FROM gis_styles WHERE id=?", [id]);
      return res.status(200).json(rows);
    }

    if (req.method === "PUT") {
      const { style_json } = req.body;

      await db.query(
        "UPDATE gis_styles SET style_json=? WHERE id=?",
        [style_json, id]
      );

      return res.status(200).json({ message: "Style updated" });
    }

    if (req.method === "DELETE") {
      await db.query("DELETE FROM gis_styles WHERE id=?", [id]);
      return res.status(200).json({ message: "Style deleted" });
    }

    res.status(405).json({ message: "Method not allowed" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  } finally {
    db.end();
  }
}