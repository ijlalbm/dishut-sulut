"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PembibitanSchema } from "./data/schema";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import {toast} from "sonner";

type PembibitanForm = z.infer<typeof PembibitanSchema>;

export default function FormCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PembibitanForm>({
    resolver: zodResolver(PembibitanSchema),
    defaultValues: {
      nama_persemaian: "",
    },
  });

  const onSubmit = async (data: PembibitanForm) => {
    try {
      const res = await fetch("/api/pembibitan", {
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
        <Label htmlFor="nama_persemaian">Nama Persemaian</Label>
        <Input
          type="text"
          id="nama_persemaian"
          name="nama_persemaian"
          register={register}
          errorMessage={errors.nama_persemaian?.message}
        />
      </div>
      <div>
        <Label htmlFor="pengelola">Pengelola</Label>
        <Input
          type="text"
          id="pengelola"
          name="pengelola"
          register={register}
          errorMessage={errors.pengelola?.message}
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
        <Label htmlFor="jenis_bibit">Jenis Bibit</Label>
        <Input
          type="text"
          id="jenis_bibit"
          name="jenis_bibit"
          register={register}
          errorMessage={errors.jenis_bibit?.message}
        />
      </div>
      <div>
        <Label htmlFor="jumlah_siap_tanam">Jumlah Siap Tanam</Label>
        <Input
          type="number"
          id="jumlah_siap_tanam"
          name="jumlah_siap_tanam"
          register={register}
          registerOptions={{ valueAsNumber: true }}
          errorMessage={errors.jumlah_siap_tanam?.message}
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
