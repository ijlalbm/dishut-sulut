import { z } from 'zod';

export const KarhutlaSchema = z.object({
    id: z.number().int().positive().optional(),
    kabupaten_kota: z.string().max(100),
    kecamatan: z.string().max(100),
    desa_kelurahan: z.string().max(100),
    latitude: z.number().min(-90).max(90).multipleOf(0.00000001).nullable().optional(),
    longitude: z.number().min(-180).max(180).multipleOf(0.00000001).nullable().optional(),
    kawasan: z.string().max(255).nullable().optional(),
    akses_lokasi: z.string().max(255).nullable().optional(),
    jenis_lahan_terbakar: z.string().max(255).nullable().optional(),
    luas_lahan_terbakar: z.string().max(255).nullable().optional(), // Asumsi: Jika akan diubah ke DECIMAL, ganti ke z.number()
    tingkat_keparahan: z.string().max(255).nullable().optional(),
    sumber_kebakaran: z.string().max(255).nullable().optional(),
    penyuluh_id: z.number().int().positive().optional(),
});