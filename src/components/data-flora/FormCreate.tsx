"use client";
import React, { useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import Select from "../form/Select";
import DatePicker from "@/components/form/date-picker";
import FileInput from "../form/input/FileInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FloraSchema } from "./data/schema";
import type { z } from "zod";

import {toast} from "sonner";

type FloraForm = z.infer<typeof FloraSchema>;

export default function FormCreate() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    } = useForm<FloraForm>({
      resolver: zodResolver(FloraSchema),
      defaultValues: {
        nama_lokal: "",
        nama_ilmiah: "",
        penyuluh_id: undefined,
      },
    });

    const onSubmit = async (data: FloraForm) => {
      try {
        const formData = new FormData();
        // Append semua field ke FormData
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        });
        // Append file jika ada
        if (selectedFile) {
          formData.append("foto_file", selectedFile);
        }
        const res = await fetch("/api/flora", {
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
        <Input type="text" id="nama_lokal" name="nama_lokal" register={register} errorMessage={errors.nama_lokal?.message}  />
      </div>
      <div>
        <Label htmlFor="nama_ilmiah">Nama Ilmiah</Label>
        <Input type="text" id="nama_ilmiah" name="nama_ilmiah" register={register} errorMessage={errors.nama_ilmiah?.message}  />
      </div>
      <div>
        <Label htmlFor="famili_ordo">Famili/Ordo</Label>
        <Input type="text" id="famili_ordo" name="famili_ordo" register={register} errorMessage={errors.famili_ordo?.message}  />
      </div>
      <div>
        <Label htmlFor="latitude">Latitude</Label>
        <Input type="number" id="latitude" name="latitude" register={register} registerOptions={{ valueAsNumber: true }} errorMessage={errors.latitude?.message}  />
      </div>
      <div>
        <Label htmlFor="longitude">Longitude</Label>
        <Input type="number" id="longitude" name="longitude" register={register} registerOptions={{ valueAsNumber: true }} errorMessage={errors.longitude?.message}  />
      </div>
      <div>
        <Label htmlFor="tipe_vegetasi">Tipe Vegetasi</Label>
        <Input type="text" id="tipe_vegetasi" name="tipe_vegetasi" register={register} errorMessage={errors.tipe_vegetasi?.message}  />
      </div>
      <div>
        <Label htmlFor="jumlah_kerapatan">Jumlah Kerapatan</Label>
        <Input type="text" id="jumlah_kerapatan" name="jumlah_kerapatan" register={register} errorMessage={errors.jumlah_kerapatan?.message}  />
      </div>
      <div>
        <Label htmlFor="status_konservasi">Status Konservasi</Label>
        <Input type="text" id="status_konservasi" name="status_konservasi" register={register} errorMessage={errors.status_konservasi?.message}  />
      </div>
      <div>
        <Label htmlFor="status_endemik_langka">Status Endemik/Langka</Label>
        <Input type="text" id="status_endemik_langka" name="status_endemik_langka" register={register} errorMessage={errors.status_endemik_langka?.message}  />
      </div>
      <div>
        <Label htmlFor="url_foto">Foto (URL atau Upload)</Label>
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
        <Label htmlFor="manfaat_ekologi">Manfaat Ekologi</Label>
        <Input id="manfaat_ekologi" name="manfaat_ekologi" register={register} errorMessage={errors.manfaat_ekologi?.message} />
      </div>
      <div>
        <Label htmlFor="manfaat_ekonomi">Manfaat Ekonomi</Label>
        <Input id="manfaat_ekonomi" name="manfaat_ekonomi" />
      </div>
      <div>
        <Label htmlFor="wilayah_kph">Wilayah KPH</Label>
        <Input type="text" id="wilayah_kph" name="wilayah_kph" register={register} errorMessage={errors.wilayah_kph?.message} />
      </div>
      <div>
        <Label htmlFor="penyuluh_id">ID Penyuluh</Label>
        <Input type="number" id="penyuluh_id" name="penyuluh_id" register={register} registerOptions={{ valueAsNumber: true }} errorMessage={errors.penyuluh_id?.message} />
      </div>
      <div className="mb-6 flex justify-end">
        <Button variant="primary" type="submit">Simpan</Button>
      </div>
    </form>
  );
}