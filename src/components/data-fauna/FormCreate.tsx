"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaunaSchema } from "./data/schema";
import type { z } from "zod";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import FileInput from "../form/input/FileInput";
import Select from "../form/Select";
import {toast} from "sonner";

type FaunaForm = z.infer<typeof FaunaSchema>;

const kelompokOptions = [
  { value: "Mamalia", label: "Mamalia" },
  { value: "Burung", label: "Burung" },
  { value: "Reptil", label: "Reptil" },
  { value: "Amfibi", label: "Amfibi" },
  { value: "Ikan", label: "Ikan" },
  // Tambahkan sesuai kebutuhan
];

export default function FormCreate() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FaunaForm>({
    resolver: zodResolver(FaunaSchema),
    defaultValues: {
      nama_lokal: "",
      nama_ilmiah: "",
      penyuluh_id: undefined,
    },
  });

  const [selectedKelompok, setSelectedKelompok] = useState<string | number>("");

  const onSubmit = async (data: FaunaForm) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      if (selectedFile) {
          formData.append("foto_file", selectedFile);
        }

      const res = await fetch("/api/fauna", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error(res.statusText || "Request failed");

            toast.success("Data berhasil ditambahkan");
            // reset();
        } catch (error: any) {
            toast.error(error.message || "Gagal menambahkan data");
        }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="nama_lokal">Nama Lokal</Label>
        <Input type="text" id="nama_lokal" name="nama_lokal" register={register} errorMessage={errors.nama_lokal?.message} />
      </div>
      <div>
        <Label htmlFor="nama_ilmiah">Nama Ilmiah</Label>
        <Input type="text" id="nama_ilmiah" name="nama_ilmiah" register={register} errorMessage={errors.nama_ilmiah?.message} />
      </div>
      <div>
        <Label htmlFor="famili_ordo">Famili/Ordo</Label>
        <Input type="text" id="famili_ordo" name="famili_ordo" register={register} errorMessage={errors.famili_ordo?.message} />
      </div>
      <div>
        <Label htmlFor="latitude">Latitude</Label>
        <Input
          type="number"
          id="latitude"
          name="latitude"
          register={register} 
          registerOptions= {{ valueAsNumber: true }}
          errorMessage={errors.latitude?.message}
          step={0.00000001}
        />
      </div>
      <div>
        <Label htmlFor="longitude">Longitude</Label>
        <Input
          type="number"
          id="longitude"
          name="longitude"
          register={register} 
          registerOptions= {{ valueAsNumber: true }}
          errorMessage={errors.longitude?.message}
        />
      </div>
      <div>
        <Label htmlFor="kelompok_fauna">Kelompok Fauna</Label>
        <Select
          options={kelompokOptions}
          placeholder="Pilih kelompok fauna"
          onChange={(val: string | number) => {
            setSelectedKelompok(val);
            setValue("kelompok_fauna", String(val));
          }}
          
        />
        {errors.kelompok_fauna && <span className="text-red-500 text-xs">{errors.kelompok_fauna.message}</span>}
      </div>
      <div>
        <Label htmlFor="habitat_utama">Habitat Utama</Label>
        <Input type="text" id="habitat_utama" name="habitat_utama" register={register} errorMessage={errors.habitat_utama?.message} />
      </div>
      <div>
        <Label htmlFor="status_konservasi">Status Konservasi</Label>
        <Input type="text" id="status_konservasi" name="status_konservasi" register={register} errorMessage={errors.status_konservasi?.message} />
      </div>
      <div>
        <Label htmlFor="status_endemik_langka">Status Endemik/Langka</Label>
        <Input type="text" id="status_endemik_langka" name="status_endemik_langka" register={register} errorMessage={errors.status_endemik_langka?.message} />
      </div>
      <div>
        <Label htmlFor="pola_aktivitas">Pola Aktivitas</Label>
        <Input type="text" id="pola_aktivitas" name="pola_aktivitas" register={register} errorMessage={errors.pola_aktivitas?.message} />
      </div>
      <div>
        <Label htmlFor="url_foto">Upload Foto</Label>
        <FileInput
          onChange={e => setSelectedFile(e.target.files?.[0] ?? null)}
        />
        {selectedFile && (
          <div className="mt-2 text-xs text-gray-600">
            File terpilih: {selectedFile.name}
          </div>
        )}
        {/* Tampilkan error jika ada */}
            {errors.url_foto && <p className="text-error-500">{errors.url_foto.message}</p>}
        </div>
        <div>
      </div>
      <div>
        <Label htmlFor="wilayah_kph">Wilayah KPH</Label>
        <Input type="text" id="wilayah_kph" name="wilayah_kph" register={register} errorMessage={errors.wilayah_kph?.message} />
      </div>
      <div>
        <Label htmlFor="penyuluh_id">Penyuluh</Label>
        <Input type="number" id="penyuluh_id" name="penyuluh_id" register={register} registerOptions={{ valueAsNumber: true }} errorMessage={errors.penyuluh_id?.message} />
      </div>
      <div className="mb-6 flex justify-end">
        <Button variant="primary" type="submit" disabled={isSubmitting}>Simpan</Button>
      </div>
    </form>
  );
}