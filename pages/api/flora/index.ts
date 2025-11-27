import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "../../../lib/db";
import path from "path";
import fs from "fs";
import { IncomingForm, Fields, Files } from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

type FormidableFile = {
  filepath: string;
  originalFilename?: string;
  newFilename?: string;
  [key: string]: any;
};

function isFormidableFile(file: any): file is FormidableFile {
  return file && typeof file.filepath === "string";
}

async function moveFile(file: FormidableFile, destDir: string) {
  const filename = `${Date.now()}-${path.basename(file.originalFilename || file.newFilename || file.filepath)}`;
  await fs.promises.mkdir(destDir, { recursive: true });
  const destPath = path.join(destDir, filename);
  await fs.promises.rename(file.filepath, destPath);
  return `/uploads/flora/${filename}`;
}

function parseForm(req: NextApiRequest): Promise<{ fields: Fields; files: Files; }> {
  const form = new IncomingForm({ multiples: true, keepExtensions: true });
  return new Promise((resolve, reject) => {
    form.parse(req as any, (err: unknown, fields: Fields, files: Files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
      const [rows] = await pool.query("SELECT * FROM flora");
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
      const { fields, files } = await parseForm(req);

      // Ambil path file foto jika ada
      let url_foto = null;
      if (files.foto_file) {
        const f = Array.isArray(files.foto_file) ? files.foto_file[0] : files.foto_file;
        if (isFormidableFile(f)) {
          url_foto = await moveFile(f, path.join(process.cwd(), "public", "uploads", "flora"));
        }
      }

      const {
        nama_lokal,
        nama_ilmiah,
        famili_ordo,
        latitude,
        longitude,
        tipe_vegetasi,
        jumlah_kerapatan,
        status_konservasi,
        status_endemik_langka,
        manfaat_ekologi,
        manfaat_ekonomi,
        wilayah_kph,
        penyuluh_id,
      } = fields;

      const [result] = await pool.query(
        `INSERT INTO flora (
          nama_lokal, nama_ilmiah, famili_ordo, latitude, longitude, tipe_vegetasi, jumlah_kerapatan, status_konservasi, status_endemik_langka, url_foto, manfaat_ekologi, manfaat_ekonomi, wilayah_kph, penyuluh_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          nama_lokal ?? null,
          nama_ilmiah ?? null,
          famili_ordo ?? null,
          latitude ? Number(latitude) : null,
          longitude ? Number(longitude) : null,
          tipe_vegetasi ?? null,
          jumlah_kerapatan ?? null,
          status_konservasi ?? null,
          status_endemik_langka ?? null,
          url_foto,
          manfaat_ekologi ?? null,
          manfaat_ekonomi ?? null,
          wilayah_kph ?? null,
          penyuluh_id ? Number(penyuluh_id) : null,
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