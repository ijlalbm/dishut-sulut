"use client";

import React, {useState} from "react";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import DatePicker from "@/components/form/date-picker";
import { ChevronDownIcon, TimeIcon } from "../../icons";

import { useForm,Controller, SubmitHandler,FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PerhutananSosialSchema, PerhutananSosialForm } from "./data/schema";
import DropzoneComponent from "../form/form-elements/DropZone";
import FileInput from "../form/input/FileInput";
import MultiFileInput from "../form/input/MultiFileInput";
import FileInputExample from "../form/form-elements/FileInputExample";
import jsonSulut from "./data/sulut.json"

import {toast} from "sonner";


export default function FormCreate() {
  
    const { 
        register,
        control,
        setValue,
        handleSubmit, 
        formState: { errors, isSubmitting },
        reset,
    } = useForm<PerhutananSosialForm>({
        // 🚨 Menggunakan Zod Resolver 🚨
        resolver: zodResolver(PerhutananSosialSchema),
        defaultValues: {
            nama_lembaga: "",
            skema: "hkm",
            luas_areal: "",
            desa: "",
            kecamatan: "",
            kabupaten_kota: ""
        }
    });

    const onSubmit: SubmitHandler<PerhutananSosialForm> = async (data) => {
        try {
            const res = await fetch("/api/perhutanan_sosial", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            console.log(res);

            if (!res.ok) throw new Error(res.statusText);

            toast.success("Data berhasil ditambahkan");
            reset();
        } catch (error: any) {
            // toast.error(error.response?.data?.message || "Gagal menambahkan data");
            toast.error(error.message);
        }
    };

    const handleFileHasilProduk = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Nama kolom di database Anda adalah dokumen_hasil_produk
    const fieldName = "dokumen_hasil_produk"; 
    
    // Simpan FileList (atau file pertama) ke RHF state
    if (e.target.files && e.target.files.length > 0) {
        // Menyimpan FileList
        setValue(fieldName as keyof PerhutananSosialForm, e.target.files[0], { 
            shouldValidate: true 
        });
        
        // Optional: Tampilkan nama file
        console.log(`File ${e.target.files[0].name} dipilih untuk ${fieldName}`);
    } else {
        setValue(fieldName as keyof PerhutananSosialForm, undefined, { 
            shouldValidate: true 
        });
        }
    };

    const handleFileFasilitas = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Nama kolom di database Anda adalah dokumen_hasil_produk
    const fieldName = "dokumen_fasilitas"; 
    
    // Simpan FileList (atau file pertama) ke RHF state
    if (e.target.files && e.target.files.length > 0) {
        // Menyimpan FileList
        setValue(fieldName as keyof PerhutananSosialForm, e.target.files[0], { 
            shouldValidate: true 
        });
        
        // Optional: Tampilkan nama file
        console.log(`File ${e.target.files[0].name} dipilih untuk ${fieldName}`);
    } else {
        setValue(fieldName as keyof PerhutananSosialForm, undefined, { 
            shouldValidate: true 
        });
        }
    };
    const handleFileSk = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Nama kolom di database Anda adalah dokumen_hasil_produk
    const fieldName = "dokumen_sk"; 
    
    // Simpan FileList (atau file pertama) ke RHF state
    if (e.target.files && e.target.files.length > 0) {
        // Menyimpan FileList
        setValue(fieldName as keyof PerhutananSosialForm, e.target.files[0], { 
            shouldValidate: true 
        });
        
        // Optional: Tampilkan nama file
        console.log(`File ${e.target.files[0].name} dipilih untuk ${fieldName}`);
    } else {
        setValue(fieldName as keyof PerhutananSosialForm, undefined, { 
            shouldValidate: true 
        });
        }
    };

    // Opsi untuk Select Skema
    const optionsSkema = [
        { value: 'hkm', label: 'HKM' },
        { value: 'hd', label: 'HD' },
    ];

    const handleFileGalery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = "galeri_foto"; 
    
    if (e.target.files) {
        // 🚨 SOLUSI: Konversi FileList menjadi Array<File> 🚨
        const fileArray = Array.from(e.target.files); 

        // Simpan array file ke RHF state
        setValue(
            fieldName as keyof PerhutananSosialForm, 
            fileArray as any, // Assert as any jika diperlukan, atau File[] jika skema Zod ketat
            { shouldValidate: true }
        );
        
        console.log(`${fileArray.length} file dipilih untuk ${fieldName}.`);
    } else {
        // Jika tidak ada file, set ke undefined atau array kosong
        setValue(fieldName as keyof PerhutananSosialForm, undefined, { 
            shouldValidate: true 
        });
    }
};

    //     const [selectedFileNames, setSelectedFileNames] = useState<string[]>([]);

    //     const handleFileGalery = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const fieldName = "galeri_foto"; 
        
    //     if (e.target.files) {
    //         const fileList = e.target.files;
            
    //         // Konversi FileList menjadi Array<File>
    //         const fileArray = Array.from(fileList); 
            
    //         // 🚨 SIMPAN FILE KE RHF (untuk pengiriman data)
    //         setValue(fieldName as keyof PerhutananSosialForm, fileArray as any, { 
    //             shouldValidate: true 
    //         });
            
    //         // 🚨 SIMPAN NAMA FILE KE STATE (untuk tampilan UI)
    //         const names = fileArray.map(file => file.name);
    //         setSelectedFileNames(names);

    //     } else {
    //         // Reset jika tidak ada file
    //         setValue(fieldName as keyof PerhutananSosialForm, undefined, { 
    //             shouldValidate: true 
    //         });
    //         setSelectedFileNames([]);
    //     }
    // };



    
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  return (
    <div>

       
    
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">

            <div>
                <Label> Nama Lembaga</Label>
                <Input
                    id="nama_lembaga"
                    name="nama_lembaga"
                    placeholder="Masukkan Nama Lembaga"
                    
                    // 🚨 Passing register dan error 🚨
                    register={register} 
                    errorMessage={errors.nama_lembaga?.message} 
                />
            </div>

            <div>
                <Label>Nomor SK</Label>
                <Input
                name="nomor_sk"
                placeholder="Nomor SK"
                register={register}
                errorMessage={errors.nomor_sk?.message}
                />
            </div>

            <div>
                <DatePicker
                id="date-picker"
                label="Tanggal SK"
                placeholder="tanggal SK"
                onChange={(dates, currentDateString) => {
                    // Handle your logic
                    console.log({ dates, currentDateString });
                }}
                />
            </div>

            <div>
                <Label>Nama KUPS</Label>
                <Input
                name="nama_kups"
                placeholder="Nama KUPS"
                register={register}
                errorMessage={errors.nama_kups?.message}
                />
            </div>
            <div>
                <Label>Nomor SK KUPS</Label>
                <Input
                name="no_sk_kups"
                placeholder="Nomor SK KUPS"
                register={register}
                errorMessage={errors.no_sk_kups?.message}
                />
            </div>
            <div>
                <Label>Komoditas</Label>
                <Input
                name="komoditas"
                placeholder="Komoditas"
                register={register}
                errorMessage={errors.komoditas?.message}
                />
            </div>
            <div>
                <Label>Jumlah Produksi</Label>
                <Input
                type="number"
                name="jumlah_produksi"
                placeholder="Jumlah Produksi"
                register={register}
                errorMessage={errors.jumlah_produksi?.message}
                />
            </div>
            <div>
                <Label>Kabupaten</Label>
                <div className="relative">
                <Select
                options={jsonSulut.data_wilayah.map((kabupaten: any) => ({
                    value: kabupaten.nama_kab_kot,
                    label: kabupaten.nama_kab_kot
                }))}
                placeholder="Pilih Kabupaten"
                onChange={handleSelectChange}
                className="dark:bg-dark-900"
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                    <ChevronDownIcon/>
                </span>
                </div>
            </div>
            <div>
                <Label>Kecamatan</Label>
                <div className="relative">
                <Select
                options={jsonSulut.data_wilayah[0].kecamatan.map((kecamatan: any) => ({
                    value: kecamatan.nama_kecamatan,
                    label: kecamatan.nama_kecamatan
                }))}
                placeholder="Pilih Kecamatan"
                onChange={handleSelectChange}
                className="dark:bg-dark-900"
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                    <ChevronDownIcon/>
                </span>
                </div>
            </div>
            <div>
                <Label>Desa</Label>
                <div className="relative">
                <Select
                options={jsonSulut.data_wilayah[0].kecamatan.flatMap((kecamatan: any) => 
                    kecamatan.desa_dan_kelurahan.map((desa: any) => ({
                        value: desa.nama,
                        label: desa.nama
                    })))}
                placeholder="Pilih Desa"
                onChange={handleSelectChange}
                className="dark:bg-dark-900"
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                    <ChevronDownIcon/>
                </span>
                </div>
            </div>
            <div>
                <Label>Skema</Label>
                <div className="relative">
                <Select
                options={optionsSkema}
                placeholder="Skema"
                onChange={handleSelectChange}
                className="dark:bg-dark-900"
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                    <ChevronDownIcon/>
                </span>
                </div>
                {errors.skema && <p className="mt-1.5 text-xs text-error-500">{errors.skema.message}</p>}
            </div>
                <div>
                    <Label> Luas Areal</Label>
                    <Input
                        id="luas_areal"
                        name="luas_areal"
                        placeholder="Masukkan Luas Areal"
                        
                        // 🚨 Passing register dan error 🚨
                        register={register} 
                        errorMessage={errors.luas_areal?.message} 
                    />
                </div>
                <div>
                    <Label> Jumlah Anggota</Label>
                    <Input
                        id="jumlah_anggota"
                        name="jumlah_anggota"
                        placeholder="Jumlah Anggota"
                        
                        // 🚨 Passing register dan error 🚨
                        register={register} 
                        errorMessage={errors.jumlah_anggota?.message} 
                    />
                </div>
                <div>
                    <Label> Nama Ketua </Label>
                    <Input
                        id="nama_ketua"
                        name="nama_ketua"
                        placeholder="Nama Ketua"
                        
                        // 🚨 Passing register dan error 🚨
                        register={register} 
                        errorMessage={errors.nama_ketua?.message} 
                    />
                </div>
                <div>
                    <Label> Nama KPH</Label>
                    <Input
                        id="nama_kph"
                        name="nama_kph"
                        placeholder="Nama KPH"
                        
                        // 🚨 Passing register dan error 🚨
                        register={register} 
                        errorMessage={errors.nama_kph?.message} 
                    />
                </div>
                <div>
                    <Label> Dokumen Hasil Produk </Label>
                    <FileInput
                        onChange={handleFileHasilProduk}
                    />
                    {/* Tampilkan error jika ada */}
                    {errors.dokumen_hasil_produk && <p className="text-error-500">{errors.dokumen_hasil_produk.message}</p>}
                </div>
                <div>
                    <Label> Dokumen Fasilitas </Label>
                    <FileInput
                        onChange={handleFileFasilitas}
                    />
                </div>
                <div>
                    <Label> Dokumen SK </Label>
                    <FileInput
                        onChange={handleFileSk}
                    />
                </div>
                <div>
                    <Label> Galeri Foto </Label>
                    <MultiFileInput
                        id="galeri_foto"
                        onChange={handleFileGalery}
                    />
                    {errors.galeri_foto && <p className="text-error-500">{errors.galeri_foto.message}</p>}
                    {/* {selectedFileNames.length > 0 && (
                        <div className="mt-3 p-2 border border-dashed border-gray-300 rounded-lg">
                            <p className="font-medium text-sm mb-1 text-gray-700">File Terpilih ({selectedFileNames.length}):</p>
                            <ul className="list-disc list-inside text-xs text-gray-600">
                                {selectedFileNames.map((name, index) => (
                                    <li key={index} className="truncate">{name}</li>
                                ))}
                            </ul>
                        </div>
                    )} */}
                </div>
                <div>
                    <Label> Penyuluh </Label>
                    <Input
                        id="penyuluh"
                        name="penyuluh"
                        placeholder="Penyuluh"
                        
                        // 🚨 Passing register dan error 🚨
                        register={register} 
                        errorMessage={errors.penyuluh?.message} 
                    />
                </div>
                <div className="mb-6 flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Memproses...' : 'Simpan Data'}
                    </Button>
                </div>
            </div>
        </form>

    </div>
  );

}