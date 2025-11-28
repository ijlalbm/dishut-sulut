"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserSchema } from "./data/schema";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";

import {toast} from "sonner";

type UserForm = z.infer<typeof UserSchema>;

export default function FormCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserForm>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      username: "",
      email: "",
      no_hp: "",
      password_hash: "",
    },
  });

  const onSubmit = async (data: UserForm) => {
    try {
      const res = await fetch("/api/users", {
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
        <Label htmlFor="username">Username</Label>
        <Input type="text" id="username" name="username" register={register} errorMessage={errors.username?.message} />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" register={register} errorMessage={errors.email?.message} />
      </div>
      <div>
        <Label htmlFor="no_hp">No HP</Label>
        <Input type="text" id="no_hp" name="no_hp" register={register} errorMessage={errors.no_hp?.message} />
      </div>
      <div>``
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password" register={register} errorMessage={errors.password_hash?.message} />
      </div>
      <div>
        <Label htmlFor="name">Nama</Label>
        <Input type="text" id="name" name="name" register={register} errorMessage={errors.name?.message} />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select
          name="status"
          options={[
            { value: 1, label: "Aktif" },
            { value: 0, label: "Nonaktif" },
          ]}
          register={register}
          registerOptions={{ valueAsNumber: true }}
          errorMessage={errors.status?.message}
        />
      </div>
      <div className="mb-6 flex justify-end">
        <Button variant="primary" type="submit" disabled={isSubmitting}>Simpan</Button>
      </div>
    </form>
  );
}