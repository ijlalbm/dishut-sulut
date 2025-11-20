"use client";

import dynamic from "next/dynamic";
import Header from "../../../components/webgis/Header";

const LeafletMap = dynamic(() => import("../../../components/webgis/Map"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="flex-1 my-1">
        <LeafletMap />
      </div>
    </div>
  );
}