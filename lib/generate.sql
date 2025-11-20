CREATE TABLE flora (
    id INT PRIMARY KEY AUTO_INCREMENT, -- Kolom ID unik sebagai kunci utama
    nama_lokal VARCHAR(255) NOT NULL,
    nama_ilmiah VARCHAR(255) NOT NULL UNIQUE, -- Disarankan UNIQE untuk nama ilmiah
    famili_ordo VARCHAR(255),
    latitude DECIMAL(10, 8), -- Presisi tinggi untuk lintang (Contoh: 8 digit setelah koma)
    longitude DECIMAL(11, 8), -- Presisi tinggi untuk bujur
    tipe_vegetasi VARCHAR(100),
    jumlah_kerapatan VARCHAR(255), -- Menggunakan DECIMAL untuk nilai Individu/Ha
    status_konservasi VARCHAR(100),
    status_endemik_langka VARCHAR(100),
    url_foto VARCHAR(255), -- Menyimpan path atau URL foto
    manfaat_ekologi TEXT, -- Menggunakan TEXT untuk deskripsi manfaat yang panjang
    manfaat_ekonomi TEXT, -- Menggunakan TEXT untuk deskripsi manfaat yang panjang
    wilayah_kph VARCHAR(100),
    penyuluh_id INT,
    FOREIGN KEY (penyuluh_id) REFERENCES Users(id) -- Contoh relasi ke tabel 'Penyuluh'
);

CREATE TABLE fauna (
    id INT PRIMARY KEY AUTO_INCREMENT, -- Kolom ID unik sebagai kunci utama
    nama_lokal VARCHAR(255) NOT NULL,
    nama_ilmiah VARCHAR(255) NOT NULL UNIQUE, -- Disarankan UNIQE untuk nama ilmiah
    famili_ordo VARCHAR(255),
    latitude DECIMAL(10, 8), -- Presisi tinggi untuk lintang
    longitude DECIMAL(11, 8), -- Presisi tinggi untuk bujur
    kelompok_fauna VARCHAR(255),
    habitat_utama TEXT, -- Menggunakan TEXT untuk deskripsi detail habitat
    status_konservasi VARCHAR(100),
    status_endemik_langka VARCHAR(100),
    pola_aktivitas VARCHAR(255),
    url_foto VARCHAR(255), -- Menyimpan path atau URL foto
    wilayah_kph VARCHAR(100),
    penyuluh_id BIGINT,
    FOREIGN KEY (penyuluh_id) REFERENCES user(id) -- Contoh relasi ke tabel 'Penyuluh'
);

CREATE TABLE rurhl (
    id INT PRIMARY KEY AUTO_INCREMENT, -- Kolom ID unik sebagai kunci utama
    provinsi VARCHAR(100) NOT NULL,
    kabupaten_kota VARCHAR(100) NOT NULL,
    kecamatan VARCHAR(100) NOT NULL,
    desa_kelurahan VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8), -- Presisi tinggi untuk lintang
    longitude DECIMAL(11, 8), -- Presisi tinggi untuk bujur
    luas_lahan VARCHAR(100), -- Menggunakan DECIMAL untuk luas dalam Hektar
    status_lahan VARCHAR(100),
    pemilik_pengelola_lahan VARCHAR(255),
    akses_ke_lokasi TEXT, -- Menggunakan TEXT untuk deskripsi akses yang mungkin panjang
    penyuluh_id INT
);

CREATE TABLE karhutla (
    id INT PRIMARY KEY AUTO_INCREMENT, -- Kolom ID unik sebagai kunci utama
    kabupaten_kota VARCHAR(100) NOT NULL,
    kecamatan VARCHAR(100) NOT NULL,
    desa_kelurahan VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8), -- Presisi tinggi untuk lintang
    longitude DECIMAL(11, 8), 
    kawasan VARCHAR(255)
    akses_lokasi VARCHAR(255), -- Deskripsi akses ke lokasi
    jenis_lahan_terbakar VARCHAR(255), -- Jenis lahan yang terbakar
    luas_lahan_terbakar VARCHAR(255), -- Menggunakan DECIMAL untuk luas dalam Hektar
    tingkat_keparahan VARCHAR(255), -- Tingkat keparahan kebakaran
    sumber_kebakaran VARCHAR(255), -- Sumber atau penyebab kebakaran
    penyuluh_id INT
);

CREATE TABLE deforestasi (
    id INT PRIMARY KEY AUTO_INCREMENT, -- Kolom ID unik sebagai kunci utama
    kabupaten_kota VARCHAR(100) NOT NULL,
    kecamatan VARCHAR(100) NOT NULL,
    desa_kelurahan VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8), -- Presisi tinggi untuk lintang
    longitude DECIMAL(11, 8), 
    kawasan VARCHAR(255),
    tutupan_lahan VARCHAR(100), -- Deskripsi tutupan lahan awal (misalnya: Hutan Primer, Sekunder)
    luas_hutan_ha DECIMAL(10, 2), -- Luas hutan awal
    luas_hutan_hilang_ha DECIMAL(10, 2), -- Luas yang mengalami deforestasi
    bentuk_perubahan_lahan VARCHAR(255), -- Deskripsi bentuk perubahan lahan (misalnya: Pertanian, Permukiman)
    penyuluh_id INT
);

CREATE TABLE degradasi (
    id INT PRIMARY KEY AUTO_INCREMENT, -- Kolom ID unik sebagai kunci utama
    kabupaten_kota VARCHAR(100) NOT NULL,
    kecamatan VARCHAR(100) NOT NULL,
    desa_kelurahan VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8), -- Presisi tinggi untuk lintang
    longitude DECIMAL(11, 8),
    jenis_kawasan VARCHAR(255), -- Misalnya: Hutan Lindung, Suaka Margasatwa
    jenis_tutupan_lahan VARCHAR(255), -- Misalnya: Hutan Primer, Sekunder
    biomassa_kerapatan_tajuk VARCHAR(255), -- Deskripsi biomassa atau kerapatan tajuk
    kondisi_vegetasi VARCHAR(255), -- Deskripsi kondisi vegetasi
    gangguan VARCHAR(255), -- Deskripsi gangguan yang terjadi
    penyuluh_id INT,
);

CREATE TABLE pembibitan (
    id INT PRIMARY KEY AUTO_INCREMENT, -- Kolom ID unik sebagai kunci utama
    nama_persemaian VARCHAR(255) NOT NULL,
    pengelola VARCHAR(255), -- Nama individu atau organisasi pengelola
    latitude DECIMAL(10, 8), -- Presisi tinggi untuk lintang
    longitude DECIMAL(11, 8),
    jenis_bibit VARCHAR(255), -- Nama spesies bibit yang diproduksi
    jumlah_siap_tanam INT, -- Jumlah bibit yang sudah siap tanam
    penyuluh_id INT,
);