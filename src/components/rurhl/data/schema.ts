import { z } from 'zod';

export const RurhlSchema = z.object({
    id: z.number().int().positive().optional(),
    provinsi: z.string().max(100),
    kabupaten_kota: z.string().max(100),
    kecamatan: z.string().max(100),
    desa_kelurahan: z.string().max(100),
    latitude: z.number().min(-90).max(90).multipleOf(0.00000001).nullable().optional(),
    longitude: z.number().min(-180).max(180).multipleOf(0.00000001).nullable().optional(),
    luas_lahan: z.string().max(100).nullable().optional(), // Asumsi: Jika akan diubah ke DECIMAL, ganti ke z.number()
    status_lahan: z.string().max(100).nullable().optional(),
    pemilik_pengelola_lahan: z.string().max(255).nullable().optional(),
    akses_ke_lokasi: z.string().optional(), // TEXT
    penyuluh_id: z.number().int().positive().optional(),
});