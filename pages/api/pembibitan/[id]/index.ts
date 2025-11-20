import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

  try {
    if (req.method === "GET") {
      const [rows] = await pool.query("SELECT * FROM pembibitan WHERE id = ?", [id]);
      const record = (rows as any[])[0];
      if (!record) return res.status(404).json({ error: "Record not found" });
      return res.status(200).json(record);
    }

    if (req.method === "PUT") {
      const {
        nama_persemaian,
        pengelola,
        latitude,
        longitude,
        jenis_bibit,
        jumlah_siap_tanam,
        penyuluh_id,
      } = req.body;

      // Fetch existing record
      const [rows] = await pool.query("SELECT * FROM pembibitan WHERE id = ?", [id]);
      const existing = (rows as any[])[0];
      if (!existing) return res.status(404).json({ error: "Record not found" });

      // Update only fields that are provided (not null or empty)
      const newNamaPersemaian = nama_persemaian ?? existing.nama_persemaian;
      const newPengelola = pengelola ?? existing.pengelola;
      const newLatitude = latitude ?? existing.latitude;
      const newLongitude = longitude ?? existing.longitude;
      const newJenisBibit = jenis_bibit ?? existing.jenis_bibit;
      const newJumlahSiapTanam = jumlah_siap_tanam ?? existing.jumlah_siap_tanam;
      const newPenyuluhId = penyuluh_id ?? existing.penyuluh_id;

      await pool.query(
        `UPDATE pembibitan SET
          nama_persemaian = ?, pengelola = ?, latitude = ?, longitude = ?, jenis_bibit = ?, jumlah_siap_tanam = ?, penyuluh_id = ?
         WHERE id = ?`,
        [
          newNamaPersemaian,
          newPengelola,
          newLatitude,
          newLongitude,
          newJenisBibit,
          newJumlahSiapTanam,
          newPenyuluhId,
          id,
        ]
      );

      return res.status(200).json({ message: "Record updated successfully" });
    }

    if (req.method === "DELETE") {
      const [result] = await pool.query("DELETE FROM pembibitan WHERE id = ?", [id]);
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