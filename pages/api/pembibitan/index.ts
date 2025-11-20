import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const [rows] = await pool.query("SELECT * FROM pembibitan");
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
      const {
        nama_persemaian,
        pengelola,
        latitude,
        longitude,
        jenis_bibit,
        jumlah_siap_tanam,
        penyuluh_id,
      } = req.body;

      if (!nama_persemaian || !pengelola) {
        return res.status(400).json({
          error: "nama_persemaian and pengelola are required",
        });
      }

      const [result] = await pool.query(
        `INSERT INTO pembibitan (
          nama_persemaian, pengelola, latitude, longitude, jenis_bibit, jumlah_siap_tanam, penyuluh_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          nama_persemaian,
          pengelola,
          latitude ?? null,
          longitude ?? null,
          jenis_bibit ?? null,
          jumlah_siap_tanam ?? null,
          penyuluh_id ?? null,
        ]
      );

      return res.status(201).json({ id: (result as any).insertId });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}