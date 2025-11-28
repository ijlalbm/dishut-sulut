-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 27 Nov 2025 pada 13.58
-- Versi server: 8.4.5
-- Versi PHP: 8.3.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webgis_dishut_sulut`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `deforestasi`
--

CREATE TABLE `deforestasi` (
  `id` int NOT NULL,
  `kabupaten_kota` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `kecamatan` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `desa_kelurahan` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `kawasan` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tutupan_lahan` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `luas_hutan_ha` decimal(10,2) DEFAULT NULL,
  `luas_hutan_hilang_ha` decimal(10,2) DEFAULT NULL,
  `bentuk_perubahan_lahan` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `penyuluh_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `degradasi`
--

CREATE TABLE `degradasi` (
  `id` int NOT NULL,
  `kabupaten_kota` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `kecamatan` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `desa_kelurahan` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `jenis_kawasan` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `jenis_tutupan_lahan` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `biomassa_kerapatan_tajuk` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `kondisi_vegetasi` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `gangguan` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `penyuluh_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `fauna`
--

CREATE TABLE `fauna` (
  `id` int NOT NULL,
  `nama_lokal` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `nama_ilmiah` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `famili_ordo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `kelompok_fauna` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `habitat_utama` text COLLATE utf8mb4_general_ci,
  `status_konservasi` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status_endemik_langka` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `pola_aktivitas` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `url_foto` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `wilayah_kph` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `penyuluh_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `fauna`
--

INSERT INTO `fauna` (`id`, `nama_lokal`, `nama_ilmiah`, `famili_ordo`, `latitude`, `longitude`, `kelompok_fauna`, `habitat_utama`, `status_konservasi`, `status_endemik_langka`, `pola_aktivitas`, `url_foto`, `wilayah_kph`, `penyuluh_id`) VALUES
(1, 'styst', 'sfgs', 'sfg', 2.00000000, 44.00000000, 'Reptil', 'sgf', 'sfg', 'sfdg', 'sfg', NULL, 'arg', 1),
(4, 'stystadf', 'sfgswef', 'sfg', 2.00000000, 44.00000000, 'Reptil', 'sgf', 'sfg', 'sfdg', 'sfg', '/uploads/fauna/1764202259847-buku pedoman penyelenggaraan statistik sektoral.png', 'arg', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `flora`
--

CREATE TABLE `flora` (
  `id` int NOT NULL,
  `nama_lokal` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `nama_ilmiah` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `famili_ordo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `tipe_vegetasi` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `jumlah_kerapatan` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status_konservasi` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status_endemik_langka` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `url_foto` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `manfaat_ekologi` text COLLATE utf8mb4_general_ci,
  `manfaat_ekonomi` text COLLATE utf8mb4_general_ci,
  `wilayah_kph` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `penyuluh_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `gis_files`
--

CREATE TABLE `gis_files` (
  `id` int NOT NULL,
  `layer_id` int NOT NULL,
  `file_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `file_path` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `file_type` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `file_size` int DEFAULT NULL,
  `versi` int DEFAULT '1',
  `uploaded_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `gis_layers`
--

CREATE TABLE `gis_layers` (
  `id` int NOT NULL,
  `nama_layer` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `deskripsi` text COLLATE utf8mb4_general_ci,
  `kategori` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tipe_data` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `skpd_id` int DEFAULT NULL,
  `is_published` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `gis_styles`
--

CREATE TABLE `gis_styles` (
  `id` int NOT NULL,
  `layer_id` int NOT NULL,
  `style_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `style_type` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `style_content` text COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `karhutla`
--

CREATE TABLE `karhutla` (
  `id` int NOT NULL,
  `kabupaten_kota` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `kecamatan` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `desa_kelurahan` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(10,8) NOT NULL,
  `kawasan` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `akses_lokasi` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `jenis_lahan_terbakar` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `luas_lahan_terbakar` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tingkat_keparahan` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sumber_kebakaran` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `penyuluh_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pembibitan`
--

CREATE TABLE `pembibitan` (
  `id` int NOT NULL,
  `nama_persemaian` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `pengelola` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `jenis_bibit` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `jumlah_siap_tanam` int DEFAULT NULL,
  `penyuluh_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `perhutanan_sosial`
--

CREATE TABLE `perhutanan_sosial` (
  `id` int NOT NULL,
  `nama_lembaga` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `nomor_sk` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tanggal_sk` date DEFAULT NULL,
  `nama_kups` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `no_sk_kups` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `komoditas` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `jumlah_produksi` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `desa` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `kecamatan` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `kabupaten_kota` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `skema` enum('hkm','hd') COLLATE utf8mb4_general_ci NOT NULL,
  `luas_areal` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `jumlah_anggota` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nama_ketua` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nama_kph` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dokumen_hasil_produk` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dokumen_fasilitas` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dokumen_sk` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `penyuluh` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `galeri_foto` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `perhutanan_sosial`
--

INSERT INTO `perhutanan_sosial` (`id`, `nama_lembaga`, `nomor_sk`, `tanggal_sk`, `nama_kups`, `no_sk_kups`, `komoditas`, `jumlah_produksi`, `desa`, `kecamatan`, `kabupaten_kota`, `skema`, `luas_areal`, `jumlah_anggota`, `nama_ketua`, `nama_kph`, `dokumen_hasil_produk`, `dokumen_fasilitas`, `dokumen_sk`, `penyuluh`, `galeri_foto`) VALUES
(1, 'sfdgsfg', 'sfdgs', '2025-11-25', 'sfdg', 'sfg', 'sdf', '235sfdg', 'Inobonto', 'Bolaang', 'Kabupaten Bolaang Mongondow', 'hd', '34sfdg', '34dfg', 'sdfg', 'sdfg', NULL, NULL, NULL, 'dgfhdfhg', '[\"/uploads/perhutanan_sosial/1764171072344-Peserta_vb_webinar-TDA2025.jpg\"]'),
(2, '', '', NULL, '', '', '', '', '', '', '', 'hkm', '', '', '', '', NULL, NULL, NULL, '', NULL),
(3, '', '', NULL, '', '', '', '', '', '', '', 'hkm', '', '', '', '', NULL, NULL, NULL, '', NULL),
(4, '', '', NULL, '', '', '', '', '', '', '', 'hkm', '', '', '', '', NULL, NULL, NULL, '', NULL),
(5, '', '', '2025-11-26', '', '', '', '', '', '', '', 'hkm', '', '', '', '', NULL, NULL, NULL, '', NULL),
(6, '', '', NULL, '', '', '', '', '', '', '', 'hkm', '', '', '', '', NULL, NULL, NULL, '', NULL),
(7, '', '', NULL, '', '', '', '', '', '', '', 'hkm', '', '', '', '', NULL, NULL, NULL, '', NULL),
(8, '', '', NULL, '', '', '', '', '', '', '', 'hkm', '', '', '', '', NULL, NULL, NULL, '', '[\"/uploads/perhutanan_sosial/1764176086516-Peserta_vb_webinar-TDA2025.jpg\"]'),
(9, '', '', NULL, '', '', '', '', '', '', '', 'hkm', '', '', '', '', NULL, NULL, NULL, '', NULL),
(10, '', '', NULL, '', '', '', '', '', '', '', 'hkm', '', '', '', '', NULL, NULL, NULL, '', '[\"/uploads/perhutanan_sosial/1764176301632-Peserta_vb_webinar-TDA2025.jpg\"]'),
(11, '', '', NULL, '', '', '', '', '', '', '', 'hkm', '', '', '', '', NULL, NULL, NULL, '', NULL),
(12, '', '', NULL, '', '', '', '', '', '', '', 'hkm', '', '', '', '', NULL, NULL, NULL, '', '[\"/uploads/perhutanan_sosial/1764176550329-Peserta_vb_webinar-TDA2025.jpg\"]'),
(13, '', '', NULL, '', '', '', '', '', '', '', 'hkm', '', '', '', '', NULL, NULL, NULL, '', '[\"/uploads/perhutanan_sosial/1764176839874-Peserta_vb_webinar-TDA2025.jpg\"]'),
(14, '', '', NULL, '', '', '', '', '', '', '', 'hkm', '', '', '', '', NULL, NULL, NULL, '', NULL),
(15, '', '', NULL, '', '', '', '', '', '', '', 'hkm', '', '', '', '', NULL, NULL, NULL, '', NULL),
(16, '', '', NULL, '', '', '', '', '', '', '', 'hkm', '', '', '', '', NULL, NULL, NULL, '', NULL),
(17, '', '', NULL, '', '', '', '', '', '', '', 'hkm', '', '', '', '', NULL, NULL, NULL, '', NULL),
(18, '', '', NULL, '', '', '', '', '', '', '', 'hkm', '', '', '', '', NULL, NULL, NULL, '', NULL),
(19, '', '', NULL, '', '', '', '', '', '', '', 'hkm', '', '', '', '', NULL, NULL, NULL, '', NULL),
(20, '', '', NULL, '', '', '', '', '', '', '', 'hkm', '', '', '', '', NULL, NULL, NULL, '', NULL),
(21, '', '', NULL, '', '', '', '', '', '', '', 'hkm', '', '', '', '', NULL, NULL, NULL, '', NULL),
(22, '', '', NULL, '', '', '', '', '', '', '', 'hkm', '', '', '', '', NULL, NULL, NULL, '', NULL),
(23, '', '', NULL, '', '', '', '', '', '', '', 'hkm', '', '', '', '', NULL, NULL, NULL, '', NULL),
(24, '', '', NULL, '', '', '', '', '', '', '', 'hkm', '', '', '', '', NULL, NULL, '/uploads/perhutanan_sosial/1764177942982-Daftar Riwayat Hidup sesuai format-20251027101155.pdf', '', NULL),
(25, '', '', NULL, '', '', '', '', '', '', '', 'hkm', '', '', '', '', '/uploads/perhutanan_sosial/1764178113956-Daftar Riwayat Hidup sesuai format-20251027101155.pdf', '/uploads/perhutanan_sosial/1764178113956-Data_IKK_dan_SPM_Urusan_Persandian_2025-11-12.xlsx', '/uploads/perhutanan_sosial/1764178113956-pernyataan_tdk_keberatan.pdf', '', '[\"/uploads/perhutanan_sosial/1764178113957-Screenshot 2025-11-26 at 09.32.02.png\"]'),
(27, '', '', '2025-11-27', '', '', '', '', '', '', '', 'hkm', '', '', '', '', NULL, NULL, NULL, '', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `rurhl`
--

CREATE TABLE `rurhl` (
  `id` int NOT NULL,
  `provinsi` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `kabupaten_kota` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `kecamatan` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `desa_kelurahan` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `luas_lahan` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status_lahan` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `pemilik_pengelola_lahan` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `akses_ke_lokasi` text COLLATE utf8mb4_general_ci,
  `penyuluh_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `rurhl`
--

INSERT INTO `rurhl` (`id`, `provinsi`, `kabupaten_kota`, `kecamatan`, `desa_kelurahan`, `latitude`, `longitude`, `luas_lahan`, `status_lahan`, `pemilik_pengelola_lahan`, `akses_ke_lokasi`, `penyuluh_id`) VALUES
(1, 'dsafa', 'df', 'adf', 'sfg', 23.00000006, 1.00000000, '4dt', 'dfg', 'dfg', 'dfg', 4);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `no_hp` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `no_hp`, `password_hash`, `name`, `status`, `created_at`, `updated_at`) VALUES
(3, 'safg', 'muhadfjasdf@gmail.com', '1234234', '$2b$10$ANAwNqn20Yatee30gbg/TeIZVQLjZuaEx.cy/FgSJ2OrLHU85wYSm', 'sdf', 0, '2025-11-27 02:24:34', '2025-11-27 02:24:34'),
(4, 'wretwtre', 'test@admin.com', '3673467', '$2b$10$KCrRxRV7LdnSq78NXlsS7eM31aKdxp5sGUwpfNbC2cgdV8mnZq36K', 'dgfh', 1, '2025-11-27 02:31:04', '2025-11-27 02:31:04');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `deforestasi`
--
ALTER TABLE `deforestasi`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `degradasi`
--
ALTER TABLE `degradasi`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `fauna`
--
ALTER TABLE `fauna`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama_ilmiah` (`nama_ilmiah`);

--
-- Indeks untuk tabel `flora`
--
ALTER TABLE `flora`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama_ilmiah` (`nama_ilmiah`);

--
-- Indeks untuk tabel `gis_files`
--
ALTER TABLE `gis_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_layer` (`layer_id`);

--
-- Indeks untuk tabel `gis_layers`
--
ALTER TABLE `gis_layers`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `gis_styles`
--
ALTER TABLE `gis_styles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_style_layer` (`layer_id`);

--
-- Indeks untuk tabel `karhutla`
--
ALTER TABLE `karhutla`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `pembibitan`
--
ALTER TABLE `pembibitan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `perhutanan_sosial`
--
ALTER TABLE `perhutanan_sosial`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `rurhl`
--
ALTER TABLE `rurhl`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `deforestasi`
--
ALTER TABLE `deforestasi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `degradasi`
--
ALTER TABLE `degradasi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `fauna`
--
ALTER TABLE `fauna`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `flora`
--
ALTER TABLE `flora`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `gis_files`
--
ALTER TABLE `gis_files`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `gis_layers`
--
ALTER TABLE `gis_layers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `gis_styles`
--
ALTER TABLE `gis_styles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `karhutla`
--
ALTER TABLE `karhutla`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `pembibitan`
--
ALTER TABLE `pembibitan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `perhutanan_sosial`
--
ALTER TABLE `perhutanan_sosial`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT untuk tabel `rurhl`
--
ALTER TABLE `rurhl`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `gis_files`
--
ALTER TABLE `gis_files`
  ADD CONSTRAINT `fk_layer` FOREIGN KEY (`layer_id`) REFERENCES `gis_layers` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `gis_styles`
--
ALTER TABLE `gis_styles`
  ADD CONSTRAINT `fk_style_layer` FOREIGN KEY (`layer_id`) REFERENCES `gis_layers` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
