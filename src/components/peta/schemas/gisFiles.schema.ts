import { z } from "zod";

export const GisFileSchema = z.object({
  id: z.number().optional(),
  layer_id: z.number().min(1, "Layer ID wajib diisi"),
  file_name: z.string().min(1, "Nama file wajib diisi"),
  file_path: z.string().min(1, "Path file wajib diisi"),
  file_type: z.enum(["shp", "geojson", "zip", "tiff", "kml"]),
  file_size: z.number().optional().nullable(),
  versi: z.number().default(1),
  uploaded_by: z.number().optional().nullable(),
  created_at: z.string().datetime().optional()
});

export type GisFile = z.infer<typeof GisFileSchema>;