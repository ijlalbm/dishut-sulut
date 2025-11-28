import { z } from 'zod';

// --- 1. Skema Desa / Kelurahan ---
export const DesaKelurahanSchema = z.object({
    nama: z.string().min(1),
    status: z.enum(["Desa", "Kelurahan"]).optional(), // Status bisa diabaikan jika Anda hanya mengambil nama
    catatan: z.string().optional(), // Untuk menampung field "catatan" yang Anda miliki
});

export type DesaKelurahan = z.infer<typeof DesaKelurahanSchema>;

// --- 2. Skema Kecamatan ---
export const KecamatanSchema = z.object({
    nama_kecamatan: z.string().min(1),
    // Array desa_dan_kelurahan harus sesuai dengan skema DesaKelurahan
    desa_dan_kelurahan: z.array(DesaKelurahanSchema),
});

export type Kecamatan = z.infer<typeof KecamatanSchema>;

// --- 3. Skema Kabupaten / Kota ---
export const KabupatenKotaSchema = z.object({
    kode_wilayah: z.string().min(4),
    nama_kab_kot: z.string().min(1),
    ibu_kota: z.string().min(1),
    jumlah_kecamatan: z.number().int().positive(),
    jumlah_kelurahan: z.number().int().nonnegative(),
    jumlah_desa: z.number().int().nonnegative(),
    // Array kecamatan harus sesuai dengan skema Kecamatan
    kecamatan: z.array(KecamatanSchema),
});

export type KabupatenKota = z.infer<typeof KabupatenKotaSchema>;


// --- 4. Skema Provinsi Utama (Struktur JSON Anda) ---
export const WilayahSulutSchema = z.object({
    provinsi: z.literal("Sulawesi Utara"), // Menggunakan z.literal jika hanya valid untuk provinsi ini
    data_wilayah: z.array(KabupatenKotaSchema),
});

export type WilayahSulut = z.infer<typeof WilayahSulutSchema>;

export const PerhutananSosialSchema = z.object({
    id: z.number().int().positive().optional(), // Opsional untuk INSERT, dibutuhkan untuk UPDATE
    nama_lembaga: z.string().max(255),
    nomor_sk: z.string().max(100).nullable().optional(),
    tanggal_sk: z.string().date().nullable().optional(), // Menggunakan string untuk tanggal, validasi format 'YYYY-MM-DD'
    nama_kups: z.string().max(255).nullable().optional(),
    no_sk_kups: z.string().max(100).nullable().optional(),
    komoditas: z.string().max(255).nullable().optional(),
    jumlah_produksi: z.string().max(255).nullable().optional(), // DECIMAL(10, 2)
    desa: z.string().max(100),
    kecamatan: z.string().max(100),
    kabupaten_kota: z.string().max(100),
    skema: z.enum(['hkm', 'hd']), // Skema harus salah satu dari ini
    luas_areal: z.string().max(255).nullable().optional(), // DECIMAL(10, 2)
    jumlah_anggota: z.string().max(255).nullable().optional(),
    nama_ketua: z.string().max(255).nullable().optional(),
    nama_kph: z.string().max(255).nullable().optional(),
    // dokumen_hasil_produk: z.string().max(255).url().or(z.string().max(255)).nullable().optional(),
    dokumen_hasil_produk: z.union([
        z.instanceof(File),
        z.string().nullable(), // Jika Anda juga ingin mengizinkan string (URL/path) dari data yang sudah ada
        z.undefined()
    ]).nullable().optional(),
    dokumen_fasilitas: z.union([
        z.instanceof(File),
        z.string().nullable(), // Jika Anda juga ingin mengizinkan string (URL/path) dari data yang sudah ada
        z.undefined()
    ]).nullable().optional(),
    dokumen_sk: z.union([
        z.instanceof(File),
        z.string().nullable(), // Jika Anda juga ingin mengizinkan string (URL/path) dari data yang sudah ada
        z.undefined()
    ]).nullable().optional(),
    penyuluh_id: z.number().int().positive().nullable().optional(),
    galeri_foto: z.array(z.instanceof(File)).optional(),
});

export type PerhutananSosialForm = z.infer<typeof PerhutananSosialSchema>; 