import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

  try {
    if (req.method === "GET") {
      const [rows] = await pool.query("SELECT * FROM fauna WHERE id = ?", [id]);
      const record = (rows as any[])[0];
      if (!record) return res.status(404).json({ error: "Record not found" });
      return res.status(200).json(record);
    }

    if (req.method === "PUT") {
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

      await pool.query(
        `UPDATE fauna SET
          nama_lokal = COALESCE(?, nama_lokal),
          nama_ilmiah = COALESCE(?, nama_ilmiah),
          famili_ordo = COALESCE(?, famili_ordo),
          latitude = COALESCE(?, latitude),
          longitude = COALESCE(?, longitude),
          kelompok_fauna = COALESCE(?, kelompok_fauna),
          habitat_utama = COALESCE(?, habitat_utama),
          status_konservasi = COALESCE(?, status_konservasi),
          status_endemik_langka = COALESCE(?, status_endemik_langka),
          pola_aktivitas = COALESCE(?, pola_aktivitas),
          url_foto = COALESCE(?, url_foto),
          wilayah_kph = COALESCE(?, wilayah_kph),
          penyuluh_id = COALESCE(?, penyuluh_id)
         WHERE id = ?`,
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
          id,
        ]
      );

      return res.status(200).json({ message: "Record updated successfully" });
    }

    if (req.method === "DELETE") {
      const [result] = await pool.query("DELETE FROM fauna WHERE id = ?", [id]);
      if ((result as any).affectedRows === 0) {
        return res.status(404).json({ error: "Record not found" });
      }
      return res.status(204).end();
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}