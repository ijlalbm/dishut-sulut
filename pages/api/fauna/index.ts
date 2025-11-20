import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const [rows] = await pool.query("SELECT * FROM fauna");
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
      const {
        nama_lokal,
        nama_ilmiah,
        famili_ordo,
        latitude,
        longitude,
        kelompok_fauna,
        habitat_utama,
        status_konservasi,
        status_endemik_langka,
        pola_aktivitas,
        url_foto,
        wilayah_kph,
        penyuluh_id,
      } = req.body;

      const [result] = await pool.query(
        `INSERT INTO fauna (nama_lokal, nama_ilmiah, famili_ordo, latitude, longitude, kelompok_fauna, habitat_utama, status_konservasi, status_endemik_langka, pola_aktivitas, url_foto, wilayah_kph, penyuluh_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          nama_lokal,
          nama_ilmiah,
          famili_ordo,
          latitude,
          longitude,
          kelompok_fauna,
          habitat_utama,
          status_konservasi,
          status_endemik_langka,
          pola_aktivitas,
          url_foto,
          wilayah_kph,
          penyuluh_id,
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