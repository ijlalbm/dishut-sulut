"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RurhlSchema } from "./data/schema";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import {toast} from "sonner";

type RurhlForm = z.infer<typeof RurhlSchema>;

export default function FormCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RurhlForm>({
    resolver: zodResolver(RurhlSchema),
    defaultValues: {
      provinsi: "",
      kabupaten_kota: "",
      kecamatan: "",
      desa_kelurahan: "",
    },
  });

  const onSubmit = async (data: RurhlForm) => {
    try {
      const res = await fetch("/api/rurhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
        <Label htmlFor="provinsi">Provinsi</Label>
        <Input type="text" id="provinsi" name="provinsi" register={register} errorMessage={errors.provinsi?.message} />
      </div>
      <div>
        <Label htmlFor="kabupaten_kota">Kabupaten/Kota</Label>
        <Input type="text" id="kabupaten_kota" name="kabupaten_kota" register={register} errorMessage={errors.kabupaten_kota?.message} />
      </div>
      <div>
        <Label htmlFor="kecamatan">Kecamatan</Label>
        <Input type="text" id="kecamatan" name="kecamatan" register={register} errorMessage={errors.kecamatan?.message} />
      </div>
      <div>
        <Label htmlFor="desa_kelurahan">Desa/Kelurahan</Label>
        <Input type="text" id="desa_kelurahan" name="desa_kelurahan" register={register} errorMessage={errors.desa_kelurahan?.message} />
      </div>
      <div>
        <Label htmlFor="latitude">Latitude</Label>
        <Input
          type="number"
          id="latitude"
          name="latitude"
          register={register}
          registerOptions={{ valueAsNumber: true }}
          errorMessage={errors.latitude?.message}
          step={0.00000001}
          min="-90"
          max="90"
        />
      </div>
      <div>
        <Label htmlFor="longitude">Longitude</Label>
        <Input
          type="number"
          id="longitude"
          name="longitude"
          register={register}
          registerOptions={{ valueAsNumber: true }}
          errorMessage={errors.longitude?.message}
          step={0.00000001}
          min="-180"
          max="180"
        />
      </div>
      <div>
        <Label htmlFor="luas_lahan">Luas Lahan</Label>
        <Input type="text" id="luas_lahan" name="luas_lahan" register={register} errorMessage={errors.luas_lahan?.message} />
      </div>
      <div>
        <Label htmlFor="status_lahan">Status Lahan</Label>
        <Input type="text" id="status_lahan" name="status_lahan" register={register} errorMessage={errors.status_lahan?.message} />
      </div>
      <div>
        <Label htmlFor="pemilik_pengelola_lahan">Pemilik/Pengelola Lahan</Label>
        <Input type="text" id="pemilik_pengelola_lahan" name="pemilik_pengelola_lahan" register={register} errorMessage={errors.pemilik_pengelola_lahan?.message} />
      </div>
      <div>
        <Label htmlFor="akses_ke_lokasi">Akses ke Lokasi</Label>
        <Input type="text" id="akses_ke_lokasi" name="akses_ke_lokasi" register={register} errorMessage={errors.akses_ke_lokasi?.message} />
      </div>
      <div>
        <Label htmlFor="penyuluh_id">ID Penyuluh</Label>
        <Input type="number" id="penyuluh_id" name="penyuluh_id" register={register} registerOptions={{ valueAsNumber: true }} errorMessage={errors.penyuluh_id?.message} />
      </div>
      <div className="mb-6 flex justify-end">
        <Button variant="primary" type="submit" disabled={isSubmitting}>Simpan</Button>
      </div>
    </form>
  );
}