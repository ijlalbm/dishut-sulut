import { z } from 'zod';

export const DegradasiSchema = z.object({
    id: z.number().int().positive().optional(),
    kabupaten_kota: z.string().max(100),
    kecamatan: z.string().max(100),
    desa_kelurahan: z.string().max(100),
    latitude: z.number().min(-90).max(90).multipleOf(0.00000001).nullable().optional(),
    longitude: z.number().min(-180).max(180).multipleOf(0.00000001).nullable().optional(),
    jenis_kawasan: z.string().max(255).nullable().optional(),
    jenis_tutupan_lahan: z.string().max(255).nullable().optional(),
    biomassa_kerapatan_tajuk: z.string().max(255).nullable().optional(),
    kondisi_vegetasi: z.string().max(255).nullable().optional(),
    gangguan: z.string().max(255).nullable().optional(),
    penyuluh_id: z.number().int().positive().optional(),
});