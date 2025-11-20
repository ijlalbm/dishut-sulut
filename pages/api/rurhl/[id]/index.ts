import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

  try {
    if (req.method === "GET") {
      const [rows] = await pool.query("SELECT * FROM rurhl WHERE id = ?", [id]);
      const record = (rows as any[])[0];
      if (!record) return res.status(404).json({ error: "Record not found" });
      return res.status(200).json(record);
    }

    if (req.method === "PUT") {
      const {
        provinsi,
        kabupaten_kota,
        kecamatan,
        desa_kelurahan,
        latitude,
        longitude,
        luas_lahan,
        status_lahan,
        pemilik_pengelola_lahan,
        akses_ke_lokasi,
        penyuluh_id,
      } = req.body;

      // Fetch existing record
      const [rows] = await pool.query("SELECT * FROM rurhl WHERE id = ?", [id]);
      const existing = (rows as any[])[0];
      if (!existing) return res.status(404).json({ error: "Record not found" });

      // Update only fields that are provided (not null or empty)
      const newProvinsi = provinsi ?? existing.provinsi;
      const newKabupatenKota = kabupaten_kota ?? existing.kabupaten_kota;
      const newKecamatan = kecamatan ?? existing.kecamatan;
      const newDesaKelurahan = desa_kelurahan ?? existing.desa_kelurahan;
      const newLatitude = latitude ?? existing.latitude;
      const newLongitude = longitude ?? existing.longitude;
      const newLuasLahan = luas_lahan ?? existing.luas_lahan;
      const newStatusLahan = status_lahan ?? existing.status_lahan;
      const newPemilikPengelolaLahan = pemilik_pengelola_lahan ?? existing.pemilik_pengelola_lahan;
      const newAksesKeLokasi = akses_ke_lokasi ?? existing.akses_ke_lokasi;
      const newPenyuluhId = penyuluh_id ?? existing.penyuluh_id;

      await pool.query(
        `UPDATE rurhl SET
          provinsi = ?, kabupaten_kota = ?, kecamatan = ?, desa_kelurahan = ?, latitude = ?, longitude = ?, luas_lahan = ?, status_lahan = ?, pemilik_pengelola_lahan = ?, akses_ke_lokasi = ?, penyuluh_id = ?
         WHERE id = ?`,
        [
          newProvinsi,
          newKabupatenKota,
          newKecamatan,
          newDesaKelurahan,
          newLatitude,
          newLongitude,
          newLuasLahan,
          newStatusLahan,
          newPemilikPengelolaLahan,
          newAksesKeLokasi,
          newPenyuluhId,
          id,
        ]
      );

      return res.status(200).json({ message: "Record updated successfully" });
    }

    if (req.method === "DELETE") {
      const [result] = await pool.query("DELETE FROM rurhl WHERE id = ?", [id]);
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