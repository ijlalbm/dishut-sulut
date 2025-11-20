-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 20 Nov 2025 pada 02.56
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
  `jumlah_produksi` decimal(10,2) DEFAULT NULL,
  `desa` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `kecamatan` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `kabupaten_kota` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `skema` enum('hkm','hd') COLLATE utf8mb4_general_ci NOT NULL,
  `luas_areal` decimal(10,2) DEFAULT NULL,
  `jumlah_anggota` int DEFAULT NULL,
  `nama_ketua` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nama_kph` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dokumen_hasil_produk` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dokumen_fasilitas` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `dokumen_sk` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `penyuluh` int DEFAULT NULL,
  `galeri_foto` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'sample2', 'sample1@gmail.com', '', '$2b$10$MDw/CPyUU3bKcFTboAXGoOZeDpv1uRD2M9xonj4o4ZTsTLsgUCs1m', '', 0, '2025-11-19 02:01:39', '2025-11-19 02:45:41'),
(2, 'sample', 'test@gmail.com', '', '$2b$10$HMOqmfBkBNAZCBUaa4eBU./zdU/mbcTtF6Xrn5jUc08ZAXRanNkNS', 'sfg', 0, '2025-11-19 02:12:01', '2025-11-19 02:12:01');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `degradasi`
--
ALTER TABLE `degradasi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `fauna`
--
ALTER TABLE `fauna`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `flora`
--
ALTER TABLE `flora`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `karhutla`
--
ALTER TABLE `karhutla`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pembibitan`
--
ALTER TABLE `pembibitan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `perhutanan_sosial`
--
ALTER TABLE `perhutanan_sosial`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `rurhl`
--
ALTER TABLE `rurhl`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
