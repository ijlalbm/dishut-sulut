import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../lib/db";
import fs from "fs";
import path from "path";
import { IncomingForm, Fields, Files } from "formidable";
// type FormidableFile = Files[string];
export const config = {
  api: {
    bodyParser: false,
  },
};

function parseForm(req: NextApiRequest): Promise<{ fields: Fields; files: Files; }> {
  const form = new IncomingForm({ multiples: true, keepExtensions: true });
  return new Promise((resolve, reject) => {
    form.parse(req as any, (err: unknown, fields: Fields, files: Files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

async function moveFile(file: FormidableFile, destDir: string) {
  const filename = `${Date.now()}-${path.basename(file.originalFilename || file.newFilename || file.filepath)}`;
  await fs.promises.mkdir(destDir, { recursive: true });
  const destPath = path.join(destDir, filename);
  // formidable v2+ uses file.filepath
  await fs.promises.rename(file.filepath, destPath);
  // return public relative path
  return `/uploads/perhutanan_sosial/${filename}`;
}


type FormidableFile = {
  filepath: string;
  originalFilename?: string;
  newFilename?: string;
  [key: string]: any;
};

function isFormidableFile(file: any): file is FormidableFile {
  return file && typeof file.filepath === "string";
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    if (req.method === "GET") {
      const [rows] = await pool.query("SELECT * FROM perhutanan_sosial");
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
      const { fields, files } = await parseForm(req);
      
      // text fields from form
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
        penyuluh,
      } = fields;

      // files
      const uploadDir = path.join(process.cwd(), "public", "uploads", "perhutanan_sosial");

      // single files
      let dokumen_hasil_produk_path: string | null = null;
      let dokumen_fasilitas_path: string | null = null;
      let dokumen_sk_path: string | null = null;
      // gallery: possibly multiple
      let galeri_foto_paths: string[] | null = null;

      // dokumen_hasil_produk
      if (files.dokumen_hasil_produk) {
        const f = Array.isArray(files.dokumen_hasil_produk) ? files.dokumen_hasil_produk[0] : files.dokumen_hasil_produk;
        if (isFormidableFile(f)) {
          dokumen_hasil_produk_path = await moveFile(f, uploadDir);
        }
      }

      // dokumen_fasilitas
      if (files.dokumen_fasilitas) {
        const f = Array.isArray(files.dokumen_fasilitas) ? files.dokumen_fasilitas[0] : files.dokumen_fasilitas;
        if (isFormidableFile(f)) {
          dokumen_fasilitas_path = await moveFile(f, uploadDir);
        }
      }

      if (files.dokumen_sk) {
        const f = Array.isArray(files.dokumen_sk) ? files.dokumen_sk[0] : files.dokumen_sk;
        if (isFormidableFile(f)) {
          dokumen_sk_path = await moveFile(f, uploadDir);
        }
      }

      if (files.galeri_foto) {
        const gf = files.galeri_foto;
        galeri_foto_paths = [];

        if (Array.isArray(gf)) {
          for (const fileItem of gf) {
            if (isFormidableFile(fileItem)) {
              galeri_foto_paths.push(await moveFile(fileItem, uploadDir));
            }
          }
        } else if (isFormidableFile(gf)) {
          galeri_foto_paths.push(await moveFile(gf, uploadDir));
        }
      }

      // Insert into DB (adjust columns as your schema)
      const [result] = await pool.query(
        `INSERT INTO perhutanan_sosial
        (nama_lembaga, nomor_sk, tanggal_sk, nama_kups, no_sk_kups, komoditas, jumlah_produksi, desa, kecamatan, kabupaten_kota, skema, luas_areal, jumlah_anggota, nama_ketua, nama_kph, dokumen_hasil_produk, dokumen_fasilitas, dokumen_sk, penyuluh, galeri_foto)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          nama_lembaga ?? null,
          nomor_sk ?? null,
          tanggal_sk ?? null,
          nama_kups ?? null,
          no_sk_kups ?? null,
          komoditas ?? null,
          jumlah_produksi ?? null,
          desa ?? null,
          kecamatan ?? null,
          kabupaten_kota ?? null,
          skema ?? null,
          luas_areal ?? null,
          jumlah_anggota ?? null,
          nama_ketua ?? null,
          nama_kph ?? null,
          dokumen_hasil_produk_path,
          dokumen_fasilitas_path,
          dokumen_sk_path,
          penyuluh ?? null,
          galeri_foto_paths ? JSON.stringify(galeri_foto_paths) : null,
        ]
      );

      const insertId = (result as any).insertId;
      const [createdRows] = await pool.query("SELECT * FROM perhutanan_sosial WHERE id = ?", [insertId]);

      return res.status(201).json((createdRows as any[])[0]);
    }

    // other methods...
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
}