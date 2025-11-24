import { z } from 'zod';

export const FaunaSchema = z.object({
    id: z.number().int().positive().optional(),
    nama_lokal: z.string().max(255),
    nama_ilmiah: z.string().max(255), // UNIQE
    famili_ordo: z.string().max(255).nullable().optional(),
    latitude: z.number().min(-90).max(90).multipleOf(0.00000001).nullable().optional(), // DECIMAL(10, 8)
    longitude: z.number().min(-180).max(180).multipleOf(0.00000001).nullable().optional(), // DECIMAL(11, 8)
    kelompok_fauna: z.string().max(255).nullable().optional(),
    habitat_utama: z.string().optional(), // TEXT
    status_konservasi: z.string().max(100).nullable().optional(),
    status_endemik_langka: z.string().max(100).nullable().optional(),
    pola_aktivitas: z.string().max(255).nullable().optional(),
    url_foto: z.string().max(255).url().or(z.string().max(255)).nullable().optional(),
    wilayah_kph: z.string().max(100).nullable().optional(),
    penyuluh_id: z.number().int().positive(), // Kunci Asing ke tabel Users
});