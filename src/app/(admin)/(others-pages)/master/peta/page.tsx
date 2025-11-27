"use client";

import React, { useState } from "react";

export default function LayerManagementUI() {
  const [layers, setLayers] = useState([
    { id: 1, name: "Batas Administrasi", published: true },
    { id: 2, name: "Jaringan Jalan", published: false },
  ]);

  const togglePublish = (id: number) => {
    setLayers(prev => prev.map(l => l.id === id ? { ...l, published: !l.published } : l));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">Manajemen Layer</h1>

      <div className="bg-white shadow rounded-xl p-4 space-y-3">
        {layers.map(layer => (
          <div
            key={layer.id}
            className="flex items-center justify-between border p-3 rounded-lg"
          >
            <div>
              <p className="font-semibold">{layer.name}</p>
              <p className="text-sm text-gray-500">ID: {layer.id}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => togglePublish(layer.id)}
                className={`px-3 py-1 rounded-md text-sm font-medium
                ${layer.published ? "bg-green-500 text-white" : "bg-gray-300"}`}
              >
                {layer.published ? "Published" : "Unpublished"}
              </button>

              <button className="px-3 py-1 rounded-md text-sm bg-blue-500 text-white">
                Edit
              </button>

              <button className="px-3 py-1 rounded-md text-sm bg-red-500 text-white">
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}