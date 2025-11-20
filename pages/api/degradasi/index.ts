import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const [rows] = await pool.query("SELECT * FROM degradasi");
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
      const {
        kabupaten_kota,
        kecamatan,
        desa_kelurahan,
        latitude,
        longitude,
        jenis_kawasan,
        jenis_tutupan_lahan,
        biomassa_kerapatan_tajuk,
        kondisi_vegetasi,
        gangguan,
        penyuluh_id,
      } = req.body;

      if (!kabupaten_kota || !kecamatan || !desa_kelurahan) {
        return res.status(400).json({
          error: "kabupaten_kota, kecamatan, and desa_kelurahan are required",
        });
      }

      const [result] = await pool.query(
        `INSERT INTO degradasi (
          kabupaten_kota, kecamatan, desa_kelurahan, latitude, longitude, jenis_kawasan, jenis_tutupan_lahan, biomassa_kerapatan_tajuk, kondisi_vegetasi, gangguan, penyuluh_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          kabupaten_kota,
          kecamatan,
          desa_kelurahan,
          latitude ?? null,
          longitude ?? null,
          jenis_kawasan ?? null,
          jenis_tutupan_lahan ?? null,
          biomassa_kerapatan_tajuk ?? null,
          kondisi_vegetasi ?? null,
          gangguan ?? null,
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