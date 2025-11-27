"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DegradasiSchema } from "./data/schema";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import {toast} from "sonner";

type DegradasiForm = z.infer<typeof DegradasiSchema>;

export default function FormCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DegradasiForm>({
    resolver: zodResolver(DegradasiSchema),
    defaultValues: {
      kabupaten_kota: "",
      kecamatan: "",
      desa_kelurahan: "",
    },
  });

  const onSubmit = async (data: DegradasiForm) => {
    try {
      const res = await fetch("/api/degradasi", {
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
        <Label htmlFor="jenis_kawasan">Jenis Kawasan</Label>
        <Input
          type="text"
          id="jenis_kawasan"
          name="jenis_kawasan"
          register={register}
          errorMessage={errors.jenis_kawasan?.message}
        />
      </div>
      <div>
        <Label htmlFor="jenis_tutupan_lahan">Jenis Tutupan Lahan</Label>
        <Input
          type="text"
          id="jenis_tutupan_lahan"
          name="jenis_tutupan_lahan"
          register={register}
          errorMessage={errors.jenis_tutupan_lahan?.message}
        />
      </div>
      <div>
        <Label htmlFor="biomassa_kerapatan_tajuk">Biomassa/Kerapatan Tajuk</Label>
        <Input
          type="text"
          id="biomassa_kerapatan_tajuk"
          name="biomassa_kerapatan_tajuk"
          register={register}
          errorMessage={errors.biomassa_kerapatan_tajuk?.message}
        />
      </div>
      <div>
        <Label htmlFor="kondisi_vegetasi">Kondisi Vegetasi</Label>
        <Input
          type="text"
          id="kondisi_vegetasi"
          name="kondisi_vegetasi"
          register={register}
          errorMessage={errors.kondisi_vegetasi?.message}
        />
      </div>
      <div>
        <Label htmlFor="gangguan">Gangguan</Label>
        <Input
          type="text"
          id="gangguan"
          name="gangguan"
          register={register}
          errorMessage={errors.gangguan?.message}
        />
      </div>
      <div>
        <Label htmlFor="penyuluh_id">ID Penyuluh</Label>
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
