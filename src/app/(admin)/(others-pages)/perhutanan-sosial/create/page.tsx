import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import FormCreate from "@/components/perhutanan-sosial/FormCreate";
import Button from "@/components/ui/button/Button";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Next.js Basic Table | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Perhutanan Sosial" />
      <div className="space-y-6">
       
        <ComponentCard title="Tambah Data Perhutanan Sosial">

          <div className="mb-6 flex justify-end">
            <Link href="/perhutanan-sosial">
                <Button variant="outline">Kembali</Button>
            </Link>
          </div>

          <div>
            {/* <Toaster position="top-center" containerStyle={{
              // Nilai z-index yang sangat tinggi untuk memastikan toaster selalu di depan
              zIndex: 9999 
          }}/> */}
            <Toaster position="top-center" />
            <FormCreate />
          </div>
          
        </ComponentCard>
      </div>
    </div>
  );
}
