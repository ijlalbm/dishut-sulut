import { z } from 'zod';

export const DeforestasiSchema = z.object({
    id: z.number().int().positive().optional(),
    kabupaten_kota: z.string().max(100),
    kecamatan: z.string().max(100),
    desa_kelurahan: z.string().max(100),
    latitude: z.number().min(-90).max(90).multipleOf(0.00000001).nullable().optional(),
    longitude: z.number().min(-180).max(180).multipleOf(0.00000001).nullable().optional(),
    kawasan: z.string().max(255).nullable().optional(),
    tutupan_lahan: z.string().max(100).nullable().optional(),
    luas_hutan_ha: z.number().multipleOf(0.01).nullable().optional(), // DECIMAL(10, 2)
    luas_hutan_hilang_ha: z.number().multipleOf(0.01).nullable().optional(), // DECIMAL(10, 2)
    bentuk_perubahan_lahan: z.string().max(255).nullable().optional(),
    penyuluh_id: z.number().int().positive().optional(),
});