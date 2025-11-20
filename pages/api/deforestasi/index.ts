import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const [rows] = await pool.query("SELECT * FROM deforestasi");
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
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

      if (!kabupaten_kota || !kecamatan || !desa_kelurahan) {
        return res.status(400).json({
          error: "kabupaten_kota, kecamatan, and desa_kelurahan are required",
        });
      }

      const [result] = await pool.query(
        `INSERT INTO deforestasi (
          kabupaten_kota, kecamatan, desa_kelurahan, latitude, longitude, kawasan, tutupan_lahan, luas_hutan_ha, luas_hutan_hilang_ha, bentuk_perubahan_lahan, penyuluh_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          kabupaten_kota,
          kecamatan,
          desa_kelurahan,
          latitude ?? null,
          longitude ?? null,
          kawasan ?? null,
          tutupan_lahan ?? null,
          luas_hutan_ha ?? null,
          luas_hutan_hilang_ha ?? null,
          bentuk_perubahan_lahan ?? null,
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