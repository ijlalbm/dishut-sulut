"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("../../../components/webgis/Map"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">React Leaflet + Next.js + Tailwind</h1>

      <LeafletMap />
    </main>
  );
}