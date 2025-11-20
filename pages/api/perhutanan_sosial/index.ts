import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const [rows] = await pool.query("SELECT * FROM perhutanan_sosial");
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
      const {
        nama_lembaga,
        nomor_sk,
        tanggal_sk,
        nama_kups,
        no_sk_kups,
        komoditas,
        jumlah_produksi,
        desa,
        kecamatan,
        kabupaten_kota,
        skema,
        luas_areal,
        jumlah_anggota,
        nama_ketua,
        nama_kph,
        dokumen_hasil_produk,
        dokumen_fasilitas,
        dokumen_sk,
        penyuluh,
        galeri_foto,
      } = req.body;

      if (!nama_lembaga || !skema) {
        return res.status(400).json({
          error: "nama_lembaga and skema are required",
        });
      }

      const [result] = await pool.query(
        `INSERT INTO perhutanan_sosial (
          nama_lembaga, nomor_sk, tanggal_sk, nama_kups, no_sk_kups, komoditas, jumlah_produksi, desa, kecamatan, kabupaten_kota, skema, luas_areal, jumlah_anggota, nama_ketua, nama_kph, dokumen_hasil_produk, dokumen_fasilitas, dokumen_sk, penyuluh, galeri_foto
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          nama_lembaga,
          nomor_sk ?? null,
          tanggal_sk ?? null,
          nama_kups ?? null,
          no_sk_kups ?? null,
          komoditas ?? null,
          jumlah_produksi ?? null,
          desa ?? null,
          kecamatan ?? null,
          kabupaten_kota ?? null,
          skema,
          luas_areal ?? null,
          jumlah_anggota ?? null,
          nama_ketua ?? null,
          nama_kph ?? null,
          dokumen_hasil_produk ?? null,
          dokumen_fasilitas ?? null,
          dokumen_sk ?? null,
          penyuluh ?? null,
          galeri_foto ?? null,
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