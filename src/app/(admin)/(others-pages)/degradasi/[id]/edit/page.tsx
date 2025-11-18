import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import FormEdit from "@/components/degradasi/FormEdit";
import Button from "@/components/ui/button/Button";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Basic Table | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Data Degradasi" />
      <div className="space-y-6">
        <ComponentCard title="Edit Data Degradasi">

          <div className="mb-6 flex justify-end">
            <Link href="/degradasi">
                <Button variant="outline">Kembali</Button>
            </Link>
          </div>

          <div>
            <FormEdit />
          </div>
          
        </ComponentCard>
      </div>
    </div>
  );
}
