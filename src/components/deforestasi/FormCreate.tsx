"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DeforestasiSchema } from "./data/schema";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import {toast} from "sonner";

type DeforestasiForm = z.infer<typeof DeforestasiSchema>;

export default function FormCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DeforestasiForm>({
    resolver: zodResolver(DeforestasiSchema),
    defaultValues: {
      kabupaten_kota: "",
      kecamatan: "",
      desa_kelurahan: "",
    },
  });

  const onSubmit = async (data: DeforestasiForm) => {
    try {
      const res = await fetch("/api/deforestasi", {
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
        <Label htmlFor="tutupan_lahan">Tutupan Lahan</Label>
        <Input
          type="text"
          id="tutupan_lahan"
          name="tutupan_lahan"
          register={register}
          errorMessage={errors.tutupan_lahan?.message}
        />
      </div>
      <div>
        <Label htmlFor="luas_hutan_ha">Luas Hutan (Ha)</Label>
        <Input
          type="number"
          id="luas_hutan_ha"
          name="luas_hutan_ha"
          register={register}
          registerOptions={{ valueAsNumber: true }}
          errorMessage={errors.luas_hutan_ha?.message}
          step={0.01}
        />
      </div>
      <div>
        <Label htmlFor="luas_hutan_hilang_ha">Luas Hutan Hilang (Ha)</Label>
        <Input
          type="number"
          id="luas_hutan_hilang_ha"
          name="luas_hutan_hilang_ha"
          register={register}
          registerOptions={{ valueAsNumber: true }}
          errorMessage={errors.luas_hutan_hilang_ha?.message}
          step={0.01}
        />
      </div>
      <div>
        <Label htmlFor="bentuk_perubahan_lahan">Bentuk Perubahan Lahan</Label>
        <Input
          type="text"
          id="bentuk_perubahan_lahan"
          name="bentuk_perubahan_lahan"
          register={register}
          errorMessage={errors.bentuk_perubahan_lahan?.message}
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
