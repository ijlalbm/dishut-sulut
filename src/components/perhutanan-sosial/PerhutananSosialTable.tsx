"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Button from "../ui/button/Button";

import { toast } from "sonner";

export default function PerhutananSosialTable() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/perhutanan_sosial");
        const json = await res.json();
        if (!Array.isArray(json)) throw new Error("Data is not an array");
        setData(json.filter((item: any) => item.nama_lembaga));
      } catch (err) {
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleEdit = (id: number) => {
    // Implementasi navigasi atau modal edit
    alert(`Edit data dengan ID: ${id}`);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    try {
      const res = await fetch(`/api/perhutanan_sosial/${id}`, { method: "DELETE" });
      if (res.ok) {
        setData((prev) => prev.filter((row) => row.id !== id));
      } else {
        toast.error("Gagal menghapus data");
      }
    } catch {
      toast.error("Gagal menghapus data");
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  No.
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Nama Lembaga</TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Nomor SK
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Tanggal SK
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Nama KUPS
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  NO SK KUPS
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Komoditas
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Desa-Kec-Kab
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Skema
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Luas Areal
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Jumlah Anggota
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Nama Ketua
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Nama KPH
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Daftar Hasil Produk Kelompok
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Daftar Fasilitas
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Galeri
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Upload Dokumen SK
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Jumlah Produksi
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                  Aksi
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {loading ? (
                <TableRow>
                  <TableCell className="text-center py-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell className="text-center py-8">
                    Data tidak ditemukan
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row, idx) => (
                  <TableRow key={row.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">{idx + 1}</TableCell>
                    <TableCell className="px-4 py-3">{row.nama_lembaga}</TableCell>
                    <TableCell className="px-4 py-3">{row.nomor_sk}</TableCell>
                    <TableCell className="px-4 py-3">{row.tanggal_sk}</TableCell>
                    <TableCell className="px-4 py-3">{row.nama_kups}</TableCell>
                    <TableCell className="px-4 py-3">{row.no_sk_kups}</TableCell>
                    <TableCell className="px-4 py-3">{row.komoditas}</TableCell>
                    <TableCell className="px-4 py-3">{row.desa_kec_kab}</TableCell>
                    <TableCell className="px-4 py-3">{row.skema}</TableCell>
                    <TableCell className="px-4 py-3">{row.luas_areal}</TableCell>
                    <TableCell className="px-4 py-3">{row.jumlah_anggota}</TableCell>
                    <TableCell className="px-4 py-3">{row.nama_ketua}</TableCell>
                    <TableCell className="px-4 py-3">{row.nama_kph}</TableCell>
                    <TableCell className="px-4 py-3">{row.hasil_produk_kelompok}</TableCell>
                    <TableCell className="px-4 py-3">{row.fasilitas}</TableCell>
                    <TableCell className="px-4 py-3">{row.galeri_foto}</TableCell>
                    <TableCell className="px-4 py-3">{row.dokumen_sk}</TableCell>
                    <TableCell className="px-4 py-3">{row.jumlah_produksi}</TableCell>
                    <TableCell className="px-4 py-3">{row.status}</TableCell>
                    <TableCell className="px-4 py-3 flex gap-2">
                      <Button
                        
                        size="sm"
                        onClick={() => handleEdit(row.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        
                        size="sm"
                        onClick={() => handleDelete(row.id)}
                      >
                        Hapus
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
