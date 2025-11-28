import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  username: z.string().min(3, "Username minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  no_hp: z.string().min(10, "Nomor HP minimal 10 digit"),
  password_hash: z.string(),
  name: z.string().min(2, "Nama minimal 2 karakter"),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  role_id: z.number(),
  gender: z.string().min(1, "Jenis kelamin wajib diisi"),
  instansi: z.string().min(2, "Instansi wajib diisi"),
  wilayah_kerja: z.string().min(2, "Wilayah kerja wajib diisi"),
  alamat: z.string().min(2, "Alamat wajib diisi"),
});