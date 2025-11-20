import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

  try {
    if (req.method === "GET") {
      const [rows] = await pool.query("SELECT * FROM deforestasi WHERE id = ?", [id]);
      const record = (rows as any[])[0];
      if (!record) return res.status(404).json({ error: "Record not found" });
      return res.status(200).json(record);
    }

    if (req.method === "PUT") {
      const {
        kabupaten_kota,
        kecamatan,
        desa_kelurahan,
        latitude,
        longitude,
        kawasan,
        tutupan_lahan,
        luas_hutan_ha,
        luas_hutan_hilang_ha,
        bentuk_perubahan_lahan,
        penyuluh_id,
      } = req.body;

      // Fetch existing record
      const [rows] = await pool.query("SELECT * FROM deforestasi WHERE id = ?", [id]);
      const existing = (rows as any[])[0];
      if (!existing) return res.status(404).json({ error: "Record not found" });

      // Update only fields that are provided (not null or empty)
      const newKabupatenKota = kabupaten_kota ?? existing.kabupaten_kota;
      const newKecamatan = kecamatan ?? existing.kecamatan;
      const newDesaKelurahan = desa_kelurahan ?? existing.desa_kelurahan;
      const newLatitude = latitude ?? existing.latitude;
      const newLongitude = longitude ?? existing.longitude;
      const newKawasan = kawasan ?? existing.kawasan;
      const newTutupanLahan = tutupan_lahan ?? existing.tutupan_lahan;
      const newLuasHutanHa = luas_hutan_ha ?? existing.luas_hutan_ha;
      const newLuasHutanHilangHa = luas_hutan_hilang_ha ?? existing.luas_hutan_hilang_ha;
      const newBentukPerubahanLahan = bentuk_perubahan_lahan ?? existing.bentuk_perubahan_lahan;
      const newPenyuluhId = penyuluh_id ?? existing.penyuluh_id;

      await pool.query(
        `UPDATE deforestasi SET
          kabupaten_kota = ?, kecamatan = ?, desa_kelurahan = ?, latitude = ?, longitude = ?, kawasan = ?, tutupan_lahan = ?, luas_hutan_ha = ?, luas_hutan_hilang_ha = ?, bentuk_perubahan_lahan = ?, penyuluh_id = ?
         WHERE id = ?`,
        [
          newKabupatenKota,
          newKecamatan,
          newDesaKelurahan,
          newLatitude,
          newLongitude,
          newKawasan,
          newTutupanLahan,
          newLuasHutanHa,
          newLuasHutanHilangHa,
          newBentukPerubahanLahan,
          newPenyuluhId,
          id,
        ]
      );

      return res.status(200).json({ message: "Record updated successfully" });
    }

    if (req.method === "DELETE") {
      const [result] = await pool.query("DELETE FROM deforestasi WHERE id = ?", [id]);
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