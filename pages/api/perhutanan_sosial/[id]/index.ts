import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

  try {
    if (req.method === "GET") {
      const [rows] = await pool.query("SELECT * FROM perhutanan_sosial WHERE id = ?", [id]);
      const record = (rows as any[])[0];
      if (!record) return res.status(404).json({ error: "Record not found" });
      return res.status(200).json(record);
    }

    if (req.method === "PUT") {
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
        penyuluh_id,
        galeri_foto,
      } = req.body;

      // Fetch existing record
      const [rows] = await pool.query("SELECT * FROM perhutanan_sosial WHERE id = ?", [id]);
      const existing = (rows as any[])[0];
      if (!existing) return res.status(404).json({ error: "Record not found" });

      // Update only fields that are provided (not null or empty)
      const newNamaLembaga = nama_lembaga ?? existing.nama_lembaga;
      const newNomorSk = nomor_sk ?? existing.nomor_sk;
      const newTanggalSk = tanggal_sk ?? existing.tanggal_sk;
      const newNamaKups = nama_kups ?? existing.nama_kups;
      const newNoSkKups = no_sk_kups ?? existing.no_sk_kups;
      const newKomoditas = komoditas ?? existing.komoditas;
      const newJumlahProduksi = jumlah_produksi ?? existing.jumlah_produksi;
      const newDesa = desa ?? existing.desa;
      const newKecamatan = kecamatan ?? existing.kecamatan;
      const newKabupatenKota = kabupaten_kota ?? existing.kabupaten_kota;
      const newSkema = skema ?? existing.skema;
      const newLuasAreal = luas_areal ?? existing.luas_areal;
      const newJumlahAnggota = jumlah_anggota ?? existing.jumlah_anggota;
      const newNamaKetua = nama_ketua ?? existing.nama_ketua;
      const newNamaKph = nama_kph ?? existing.nama_kph;
      const newDokumenHasilProduk = dokumen_hasil_produk ?? existing.dokumen_hasil_produk;
      const newDokumenFasilitas = dokumen_fasilitas ?? existing.dokumen_fasilitas;
      const newDokumenSk = dokumen_sk ?? existing.dokumen_sk;
      const newPenyuluh = penyuluh_id ?? existing.penyuluh_id;
      const newGaleriFoto = galeri_foto ?? existing.galeri_foto;

      await pool.query(
        `UPDATE perhutanan_sosial SET
          nama_lembaga = ?, nomor_sk = ?, tanggal_sk = ?, nama_kups = ?, no_sk_kups = ?, komoditas = ?, jumlah_produksi = ?, desa = ?, kecamatan = ?, kabupaten_kota = ?, skema = ?, luas_areal = ?, jumlah_anggota = ?, nama_ketua = ?, nama_kph = ?, dokumen_hasil_produk = ?, dokumen_fasilitas = ?, dokumen_sk = ?, penyuluh_id = ?, galeri_foto = ?
         WHERE id = ?`,
        [
          newNamaLembaga,
          newNomorSk,
          newTanggalSk,
          newNamaKups,
          newNoSkKups,
          newKomoditas,
          newJumlahProduksi,
          newDesa,
          newKecamatan,
          newKabupatenKota,
          newSkema,
          newLuasAreal,
          newJumlahAnggota,
          newNamaKetua,
          newNamaKph,
          newDokumenHasilProduk,
          newDokumenFasilitas,
          newDokumenSk,
          newPenyuluh,
          newGaleriFoto,
          id,
        ]
      );

      return res.status(200).json({ message: "Record updated successfully" });
    }

    if (req.method === "DELETE") {
      const [result] = await pool.query("DELETE FROM perhutanan_sosial WHERE id = ?", [id]);
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