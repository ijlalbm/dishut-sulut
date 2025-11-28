"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Select from "@/components/form/Select";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const signUpSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  username: z.string().min(3, "Username minimal 3 karakter"),
  no_hp: z.string().min(10, "Nomor HP minimal 10 digit"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  gender: z.string().min(1, "Jenis kelamin wajib diisi"),
  instansi: z.string().min(2, "Instansi wajib diisi"),
  wilayah_kerja: z.string().min(2, "Wilayah kerja wajib diisi"),
  alamat: z.string().min(2, "Alamat wajib diisi"),
});

export default function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [form, setForm] = useState({
    name: "",
    username: "",
    no_hp: "",
    email: "",
    password: "",
    gender: "",
    instansi: "",
    wilayah_kerja: "",
    alamat: "",
    role_id: 2,
  });
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setLoading(true);

    const result = signUpSchema.safeParse(form);
    if (!result.success) {
      const errors: { [key: string]: string } = {};
      result.error.issues.forEach((err) => {
        const key = typeof err.path[0] === "string" ? err.path[0] : "";
        if (key) errors[key] = err.message;
      });
      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Registrasi berhasil! Silakan login.");
        setForm({
          name: "",
          username: "",
          no_hp: "",
          email: "",
          password: "",
          gender: "",
          instansi: "",
          wilayah_kerja: "",
          alamat: "",
          role_id: 2,
        });
        setTimeout(() => {
          router.push("/signin");
        }, 1200);
      } else {
        const err = await res.json();
        toast.error(err.message || "Registrasi gagal");
      }
    } catch (err: any) {
      toast.error(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Daftar Akun Baru
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Daftarkan email dan password Anda untuk membuat akun baru
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <Label>Nama<span className="text-error-500">*</span></Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Nama"
                  onChange={handleChange}
                  disabled={loading}
                />
                {fieldErrors.name && <span className="text-error-500 text-sm">{fieldErrors.name}</span>}
              </div>
              <div>
                <Label>Username<span className="text-error-500">*</span></Label>
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  disabled={loading}
                />
                {fieldErrors.username && <span className="text-error-500 text-sm">{fieldErrors.username}</span>}
              </div>
              <div>
                <Label>Kontak / Nomor HP<span className="text-error-500">*</span></Label>
                <Input
                  type="text"
                  name="no_hp"
                  placeholder="Kontak / Nomor HP"
                  onChange={handleChange}
                  disabled={loading}
                />
                {fieldErrors.no_hp && <span className="text-error-500 text-sm">{fieldErrors.no_hp}</span>}
              </div>
              <div>
                <Label>Email<span className="text-error-500">*</span></Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  disabled={loading}
                />
                {fieldErrors.email && <span className="text-error-500 text-sm">{fieldErrors.email}</span>}
              </div>
              <div>
                <Label>Password<span className="text-error-500">*</span></Label>
                <div className="relative">
                  <Input
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                    )}
                  </span>
                </div>
                {fieldErrors.password && <span className="text-error-500 text-sm">{fieldErrors.password}</span>}
              </div>
              <div>
                <Label>Jenis Kelamin<span className="text-error-500">*</span></Label>
                <Select
                  name="gender"
                  placeholder="Pilih jenis kelamin"
                  onChange={value => setForm({ ...form, gender: String(value) })}
                  // disabled={loading}
                  options={[
                    { value: "Laki-laki", label: "Laki-laki" },
                    { value: "Perempuan", label: "Perempuan" },
                  ]}
                  className="w-full"
                />
                {fieldErrors.gender && <span className="text-error-500 text-sm">{fieldErrors.gender}</span>}
              </div>
              <div>
                <Label>Instansi<span className="text-error-500">*</span></Label>
                <Input
                  type="text"
                  name="instansi"
                  placeholder="Instansi"
                  onChange={handleChange}
                  disabled={loading}
                />
                {fieldErrors.instansi && <span className="text-error-500 text-sm">{fieldErrors.instansi}</span>}
              </div>
              <div>
                <Label>Wilayah Kerja<span className="text-error-500">*</span></Label>
                <Input
                  type="text"
                  name="wilayah_kerja"
                  placeholder="Wilayah Kerja"
                  onChange={handleChange}
                  disabled={loading}
                />
                {fieldErrors.wilayah_kerja && <span className="text-error-500 text-sm">{fieldErrors.wilayah_kerja}</span>}
              </div>
              <div>
                <Label>Alamat<span className="text-error-500">*</span></Label>
                <Input
                  type="text"
                  name="alamat"
                  placeholder="Alamat"
                  onChange={handleChange}
                  disabled={loading}
                />
                {fieldErrors.alamat && <span className="text-error-500 text-sm">{fieldErrors.alamat}</span>}
              </div>
              <div>
                <button
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Daftar"}
                </button>
              </div>
            </div>
          </form>
          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Sudah punya akun?
              <Link
                href="/signin"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Masuk
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
      </div>
    </div>
  );
}