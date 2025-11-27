import { z } from "zod";

export const GisStyleSchema = z.object({
  id: z.number().optional(),
  layer_id: z.number().min(1, "Layer ID wajib diisi"),
  style_name: z.string().min(1, "Nama style wajib diisi"),
  style_type: z.enum(["sld", "json", "qml", "css"]),
  style_content: z.string().min(1, "Content style wajib diisi"),
  created_at: z.string().datetime().optional()
});

export type GisStyle = z.infer<typeof GisStyleSchema>;