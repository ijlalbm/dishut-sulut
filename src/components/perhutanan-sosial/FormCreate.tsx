"use client";

import React from "react";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import DatePicker from "@/components/form/date-picker";
import { ChevronDownIcon, TimeIcon } from "../../icons";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PerhutananSosialSchema, PerhutananSosialForm } from "./data/schema";
import toast from "react-hot-toast";

export default function FormCreate() {
  
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting } 
    } = useForm<PerhutananSosialForm>({
        // 🚨 Menggunakan Zod Resolver 🚨
        resolver: zodResolver(PerhutananSosialSchema),
        defaultValues: {
            nama_lembaga: "",
            skema: "hkm",
            luas_areal: 0,
            desa: "",
            kecamatan: "",
            kabupaten_kota: "",
        }
    });

    const onSubmit: SubmitHandler<PerhutananSosialForm> = async (data) => {
        try {
            console.log("Data Form (Client Validated):", data);
            
            // Mengirim data ke Service Layer (API)
            // await postPerhutananSosialData(data); 

            // alert("Data Perhutanan Sosial berhasil ditambahkan!");
            // Lakukan redirect atau reset form
        } catch (error) {
            console.error("Gagal menyimpan data:", error);
            alert("Terjadi kesalahan saat menyimpan data.");
        }
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">

        <div>
            <label htmlFor="nama_lembaga">Nama Lembaga</label>
            <Input
                id="nama_lembaga"
                name="nama_lembaga"
                placeholder="Masukkan Nama Lembaga"
                
                // 🚨 Passing register dan error 🚨
                register={register} 
                errorMessage={errors.nama_lembaga?.message} 
            />
        </div>

        {/* <div>
          <Label>Nama Lembaga</Label>
          <Input
            name="nama_lembaga"
            placeholder="Nama Lembaga"
            register={form.register}
            errorMessage={form.formState.errors.nama_lembaga?.message}
          />
        </div> */}

        {/* <div>
          <Label>Nomor SK</Label>
          <Input
            name="nomor_sk"
            placeholder="Nomor SK"
            register={form.register}
            errorMessage={form.formState.errors.nomor_sk?.message}
          />
        </div> */}

        {/* <div className="mb-6 flex justify-end">
          <Button type="submit" variant="primary">Simpan</Button>
        </div> */}

        <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Memproses...' : 'Simpan Data'}
        </Button>
      </div>
    </form>
  );
}