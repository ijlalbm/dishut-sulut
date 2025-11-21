// Interface for perhutanan_sosial table
export interface PerhutananSosial {
  id: number;
  nama_lembaga: string;
  nomor_sk?: string;
  tanggal_sk?: Date;
  nama_kups?: string;
  no_sk_kups?: string;
  komoditas?: string;
  jumlah_produksi?: number;
  desa?: string;
  kecamatan?: string;
  kabupaten_kota?: string;
  skema: 'hkm' | 'hd';
  luas_areal?: number;
  jumlah_anggota?: number;
  nama_ketua?: string;
  nama_kph?: string;
  dokumen_hasil_produk?: string;
  dokumen_fasilitas?: string;
  dokumen_sk?: string;
  penyuluh?: string;
  galeri_foto?: string;
}

// Interface for flora table
export interface Flora {
  id: number;
  nama_lokal: string;
  nama_ilmiah: string;
  famili_ordo?: string;
  latitude?: number;
  longitude?: number;
  tipe_vegetasi?: string;
  jumlah_kerapatan?: string;
  status_konservasi?: string;
  status_endemik_langka?: string;
  url_foto?: string;
  manfaat_ekologi?: string;
  manfaat_ekonomi?: string;
  wilayah_kph?: string;
  penyuluh_id?: number;
}

// Interface for fauna table
export interface Fauna {
  id: number;
  nama_lokal: string;
  nama_ilmiah: string;
  famili_ordo?: string;
  latitude?: number;
  longitude?: number;
  kelompok_fauna?: string;
  habitat_utama?: string;
  status_konservasi?: string;
  status_endemik_langka?: string;
  pola_aktivitas?: string;
  url_foto?: string;
  wilayah_kph?: string;
  penyuluh_id?: number;
}

// Interface for rurhl table
export interface Rurhl {
  id: number;
  provinsi: string;
  kabupaten_kota: string;
  kecamatan: string;
  desa_kelurahan: string;
  latitude?: number;
  longitude?: number;
  luas_lahan?: string;
  status_lahan?: string;
  pemilik_pengelola_lahan?: string;
  akses_ke_lokasi?: string;
  penyuluh_id?: number;
}

// Interface for karhutla table
export interface Karhutla {
  id: number;
  kabupaten_kota: string;
  kecamatan: string;
  desa_kelurahan: string;
  latitude?: number;
  longitude?: number;
  kawasan?: string;
  akses_lokasi?: string;
  jenis_lahan_terbakar?: string;
  luas_lahan_terbakar?: string;
  tingkat_keparahan?: string;
  sumber_kebakaran?: string;
  penyuluh_id?: number;
}

// Interface for deforestasi table
export interface Deforestasi {
  id: number;
  kabupaten_kota: string;
  kecamatan: string;
  desa_kelurahan: string;
  latitude?: number;
  longitude?: number;
  kawasan?: string;
  tutupan_lahan?: string;
  luas_hutan_ha?: number;
  luas_hutan_hilang_ha?: number;
  bentuk_perubahan_lahan?: string;
  penyuluh_id?: number;
}

// Interface for degradasi table
export interface Degradasi {
  id: number;
  kabupaten_kota: string;
  kecamatan: string;
  desa_kelurahan: string;
  latitude?: number;
  longitude?: number;
  jenis_kawasan?: string;
  jenis_tutupan_lahan?: string;
  biomassa_kerapatan_tajuk?: string;
  kondisi_vegetasi?: string;
  gangguan?: string;
  penyuluh_id?: number;
}

// Interface for pembibitan table
export interface Pembibitan {
  id: number;
  nama_persemaian: string;
  pengelola?: string;
  latitude?: number;
  longitude?: number;
  jenis_bibit?: string;
  jumlah_siap_tanam?: number;
  penyuluh_id?: number;
}