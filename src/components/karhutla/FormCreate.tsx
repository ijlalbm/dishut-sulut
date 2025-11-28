"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { KarhutlaSchema } from "./data/schema";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import {toast} from "sonner";

type KarhutlaForm = z.infer<typeof KarhutlaSchema>;

export default function FormCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<KarhutlaForm>({
    resolver: zodResolver(KarhutlaSchema),
    defaultValues: {
      kabupaten_kota: "",
      kecamatan: "",
      desa_kelurahan: "",
    },
  });

  const onSubmit = async (data: KarhutlaForm) => {
    try {
      const res = await fetch("/api/karhutla", {
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
        <Label htmlFor="kabupaten_kota">Kabupaten/Kota</Label>
        <Input
          type="text"
          id="kabupaten_kota"
          name="kabupaten_kota"
          register={register}
          errorMessage={errors.kabupaten_kota?.message}
        />
      </div>
      <div>
        <Label htmlFor="kecamatan">Kecamatan</Label>
        <Input
          type="text"
          id="kecamatan"
          name="kecamatan"
          register={register}
          errorMessage={errors.kecamatan?.message}
        />
      </div>
      <div>
        <Label htmlFor="desa_kelurahan">Desa/Kelurahan</Label>
        <Input
          type="text"
          id="desa_kelurahan"
          name="desa_kelurahan"
          register={register}
          errorMessage={errors.desa_kelurahan?.message}
        />
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
        <Label htmlFor="kawasan">Kawasan</Label>
        <Input
          type="text"
          id="kawasan"
          name="kawasan"
          register={register}
          errorMessage={errors.kawasan?.message}
        />
      </div>
      <div>
        <Label htmlFor="akses_lokasi">Akses Lokasi</Label>
        <Input
          type="text"
          id="akses_lokasi"
          name="akses_lokasi"
          register={register}
          errorMessage={errors.akses_lokasi?.message}
        />
      </div>
      <div>
        <Label htmlFor="jenis_lahan_terbakar">Jenis Lahan Terbakar</Label>
        <Input
          type="text"
          id="jenis_lahan_terbakar"
          name="jenis_lahan_terbakar"
          register={register}
          errorMessage={errors.jenis_lahan_terbakar?.message}
        />
      </div>
      <div>
        <Label htmlFor="luas_lahan_terbakar">Luas Lahan Terbakar</Label>
        <Input
          type="text"
          id="luas_lahan_terbakar"
          name="luas_lahan_terbakar"
          register={register}
          errorMessage={errors.luas_lahan_terbakar?.message}
        />
      </div>
      <div>
        <Label htmlFor="tingkat_keparahan">Tingkat Keparahan</Label>
        <Input
          type="text"
          id="tingkat_keparahan"
          name="tingkat_keparahan"
          register={register}
          errorMessage={errors.tingkat_keparahan?.message}
        />
      </div>
      <div>
        <Label htmlFor="sumber_kebakaran">Sumber Kebakaran</Label>
        <Input
          type="text"
          id="sumber_kebakaran"
          name="sumber_kebakaran"
          register={register}
          errorMessage={errors.sumber_kebakaran?.message}
        />
      </div>
      <div>
        <Label htmlFor="penyuluh_id">Penyuluh</Label>
        <Input
          type="number"
          id="penyuluh_id"
          name="penyuluh_id"
          register={register}
          registerOptions={{ valueAsNumber: true }}
          errorMessage={errors.penyuluh_id?.message}
        />
      </div>
      <div className="mb-6 flex justify-end">
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          Simpan
        </Button>
      </div>
    </form>
  );
}
