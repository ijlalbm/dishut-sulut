import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await pool;
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      const [rows] = await db.query("SELECT * FROM gis_layers WHERE id = ?", [id]);
      return res.status(200).json(rows);
    }

    if (req.method === "PUT") {
      const { name, layer_type, description } = req.body;

      await db.query(
        "UPDATE gis_layers SET name=?, layer_type=?, description=? WHERE id=?",
        [name, layer_type, description, id]
      );

      return res.status(200).json({ message: "Layer updated" });
    }

    if (req.method === "DELETE") {
      await db.query("DELETE FROM gis_layers WHERE id=?", [id]);
      return res.status(200).json({ message: "Layer deleted" });
    }

    res.status(405).json({ message: "Method not allowed" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  } finally {
    await db.end();
  }
}