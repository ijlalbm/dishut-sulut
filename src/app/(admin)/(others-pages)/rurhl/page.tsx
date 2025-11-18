import RurhlTable from "@/components/rurhl/RurhlTable";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";
import { Metadata } from "next";
import React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Next.js Basic Table | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Data RURHL" />
      <div className="space-y-6">
        <ComponentCard title="Tabel Data RURHL">
          <div className="mb-6 flex justify-end">
            <Link href="/rurhl/create">
              <Button variant="primary">
                Tambah Data
              </Button>
            </Link>
          </div>
          <RurhlTable />
        </ComponentCard>
      </div>
    </div>
  );
}
