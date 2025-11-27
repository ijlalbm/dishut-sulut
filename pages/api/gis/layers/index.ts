import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await pool;

  try {
    if (req.method === "GET") {
      const [rows] = await db.query("SELECT * FROM gis_layers");
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
      const { name, layer_type, description } = req.body;

      await db.query(
        "INSERT INTO gis_layers (name, layer_type, description) VALUES (?, ?, ?)",
        [name, layer_type, description]
      );

      return res.status(201).json({ message: "Layer created" });
    }

    res.status(405).json({ message: "Method not allowed" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  } finally {
    await db.end();
  }
}