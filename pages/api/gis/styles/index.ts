import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await pool;

  try {
    if (req.method === "GET") {
      const [rows] = await db.query("SELECT * FROM gis_styles");
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
      const { layer_id, style_json } = req.body;

      await db.query(
        "INSERT INTO gis_styles (layer_id, style_json) VALUES (?, ?)",
        [layer_id, style_json]
      );

      return res.status(201).json({ message: "Style created" });
    }

    res.status(405).json({ message: "Method not allowed" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  } finally {
    db.end();
  }
}