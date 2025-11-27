CREATE TABLE perhutanan_sosial (
    id INT PRIMARY KEY AUTO_INCREMENT, -- Kolom ID unik, disarankan untuk setiap tabel
    nama_lembaga VARCHAR(255) NOT NULL,
    nomor_sk VARCHAR(100),
    tanggal_sk DATE,
    nama_kups VARCHAR(255),
    no_sk_kups VARCHAR(100),
    komoditas VARCHAR(255),
    jumlah_produksi DECIMAL(10, 2), -- Menggunakan DECIMAL untuk angka produksi yang mungkin memiliki desimal
    desa VARCHAR(100),
    kecamatan VARCHAR(100),
    kabupaten_kota VARCHAR(100),
    skema ENUM('hkm', 'hd') NOT NULL, -- Menggunakan ENUM untuk opsi dropdown 'hkm' atau 'hd'
    luas_areal DECIMAL(10, 2), -- Menggunakan DECIMAL untuk luas areal
    jumlah_anggota INT,
    nama_ketua VARCHAR(255),
    nama_kph VARCHAR(255),
    dokumen_hasil_produk VARCHAR(255), -- Menyimpan path atau nama file PDF
    dokumen_fasilitas VARCHAR(255), -- Menyimpan path atau nama file PDF
    dokumen_sk VARCHAR(255), -- Menyimpan path atau nama file PDF
    penyuluh VARCHAR(255),
    galeri_foto TEXT -- Menggunakan TEXT untuk menyimpan daftar/link beberapa foto (misalnya, dalam format JSON atau dipisahkan koma)
);


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

CREATE TABLE user (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    no_hp VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) DEFAULT NULL,
    status TINYINT(1) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE gis_layers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_layer VARCHAR(255) NOT NULL,
    deskripsi TEXT NULL,
    kategori VARCHAR(100) NULL,        -- misal: Batas Wilayah, Infrastruktur, dll
    tipe_data VARCHAR(50) NOT NULL,    -- raster, vector, geojson, shp, tiff
    skpd_id INT NULL,                  -- siapa pemilik datanya
    is_published TINYINT(1) DEFAULT 0, -- apakah tampil di WebGIS
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE gis_files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    layer_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,     -- lokasi file di server / storage
    file_type VARCHAR(50) NOT NULL,      -- shp, geojson, zip, tiff, kml
    file_size INT NULL,
    versi INT DEFAULT 1,                 -- v1, v2, v3 ...
    uploaded_by INT NULL,                -- id user yang upload
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_layer
        FOREIGN KEY (layer_id)
        REFERENCES gis_layers(id)
        ON DELETE CASCADE
);

CREATE TABLE gis_styles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    layer_id INT NOT NULL,
    style_name VARCHAR(255) NOT NULL,
    style_type VARCHAR(50) NOT NULL,      -- sld, json, qml, css
    style_content TEXT NOT NULL,          -- isi file / kode style
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_style_layer
        FOREIGN KEY (layer_id)
        REFERENCES gis_layers(id)
        ON DELETE CASCADE
);