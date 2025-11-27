import { z } from 'zod';

export const PembibitanSchema = z.object({
    id: z.number().int().positive().optional(),
    nama_persemaian: z.string().max(255),
    pengelola: z.string().max(255).nullable().optional(),
    latitude: z.number().min(-90).max(90).multipleOf(0.00000001).nullable().optional(),
    longitude: z.number().min(-180).max(180).multipleOf(0.00000001).nullable().optional(),
    jenis_bibit: z.string().max(255).nullable().optional(),
    jumlah_siap_tanam: z.number().int().positive().nullable().optional(),
    penyuluh_id: z.number().int().positive().optional(),
});