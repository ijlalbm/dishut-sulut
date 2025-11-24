import { z } from 'zod';

export const PerhutananSosialSchema = z.object({
    id: z.number().int().positive().optional(), // Opsional untuk INSERT, dibutuhkan untuk UPDATE
    nama_lembaga: z.string().max(1),
    nomor_sk: z.string().max(100).nullable().optional(),
    tanggal_sk: z.string().date().nullable().optional(), // Menggunakan string untuk tanggal, validasi format 'YYYY-MM-DD'
    nama_kups: z.string().max(255).nullable().optional(),
    no_sk_kups: z.string().max(100).nullable().optional(),
    komoditas: z.string().max(255).nullable().optional(),
    jumlah_produksi: z.number().multipleOf(0.01).optional(), // DECIMAL(10, 2)
    desa: z.string().max(100),
    kecamatan: z.string().max(100),
    kabupaten_kota: z.string().max(100),
    skema: z.enum(['hkm', 'hd']), // Skema harus salah satu dari ini
    luas_areal: z.number().multipleOf(0.01), // DECIMAL(10, 2)
    jumlah_anggota: z.number().int().optional(),
    nama_ketua: z.string().max(255).nullable().optional(),
    nama_kph: z.string().max(255).nullable().optional(),
    dokumen_hasil_produk: z.string().max(255).url().or(z.string().max(255)).nullable().optional(),
    dokumen_fasilitas: z.string().max(255).url().or(z.string().max(255)).nullable().optional(),
    dokumen_sk: z.string().max(255).url().or(z.string().max(255)).nullable().optional(),
    penyuluh: z.string().max(255).nullable().optional(),
    galeri_foto: z.string().optional(), // TEXT
});

export type PerhutananSosialForm = z.infer<typeof PerhutananSosialSchema>;