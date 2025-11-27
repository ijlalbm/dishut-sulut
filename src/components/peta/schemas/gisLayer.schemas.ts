import { z } from "zod";

export const GisLayerSchema = z.object({
  id: z.number().optional(),
  nama_layer: z.string().min(1, "Nama layer wajib diisi"),
  deskripsi: z.string().optional().nullable(),
  kategori: z.string().optional().nullable(),
  tipe_data: z.enum(["vector", "raster", "geojson", "shp", "tiff"]),
  skpd_id: z.number().optional().nullable(),
  is_published: z.boolean().default(false),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional()
});

export type GisLayer = z.infer<typeof GisLayerSchema>;