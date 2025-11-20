import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const [rows] = await pool.query("SELECT * FROM rurhl");
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
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

      if (!provinsi || !kabupaten_kota || !kecamatan || !desa_kelurahan) {
        return res.status(400).json({ error: "Provinsi, kabupaten/kota, kecamatan, and desa/kelurahan are required" });
      }

      const [result] = await pool.query(
        `INSERT INTO rurhl (provinsi, kabupaten_kota, kecamatan, desa_kelurahan, latitude, longitude, luas_lahan, status_lahan, pemilik_pengelola_lahan, akses_ke_lokasi, penyuluh_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          provinsi,
          kabupaten_kota,
          kecamatan,
          desa_kelurahan,
          latitude ?? null,
          longitude ?? null,
          luas_lahan ?? null,
          status_lahan ?? null,
          pemilik_pengelola_lahan ?? null,
          akses_ke_lokasi ?? null,
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