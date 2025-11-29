"use client";

import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import JSZip from "jszip";
import { kml } from "@tmcw/togeojson";

const DefaultIcon = L.icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function LeafletMap() {
  const [geoData, setGeoData] = useState<any>(null);
  const [kmzFiles, setKmzFiles] = useState<string[]>([]);
  const [selectedKmz, setSelectedKmz] = useState<string>("");
  const [kmzGeoData, setKmzGeoData] = useState<any>(null);

  // Fetch daftar file KMZ dari API
  useEffect(() => {
    fetch("/api/kmz-list")
      .then((res) => res.json())
      .then((data) => setKmzFiles(data.files || []))
      .catch((err) => console.error("Error loading KMZ list:", err));
  }, []);

  // Load KMZ yang dipilih
  useEffect(() => {
    if (!selectedKmz) {
      setKmzGeoData(null);
      return;
    }
    const loadKmz = async () => {
      try {
        const res = await fetch(`/uploads/peta-administrasi/${selectedKmz}`);
        if (!res.ok) throw new Error("KMZ file not found");
        const blob = await res.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);
        const kmlFileName = Object.keys(zip.files).find((name) => name.endsWith(".kml"));
        if (!kmlFileName) throw new Error("KMZ tidak berisi file KML");
        const kmlText = await zip.files[kmlFileName].async("text");
        const parser = new DOMParser();
        const kmlDom = parser.parseFromString(kmlText, "application/xml");
        const geojson = kml(kmlDom);
        setKmzGeoData(geojson);
      } catch (err) {
        setKmzGeoData(null);
        alert("Gagal load KMZ: " + (err as Error).message);
      }
    };
    loadKmz();
  }, [selectedKmz]);

  const handleKmzFeature = (feature: any, layer: L.Layer) => {
    layer.on("click", () => {
      // Ambil properti dari KML/GeoJSON
      const props = feature.properties || {};
      // Tampilkan semua properti sebagai tabel
      const html = `
        <div>
          <b>Data KML:</b>
          <table style="font-size:12px;">
            ${Object.entries(props)
              .map(
                ([key, val]) =>
                  `<tr><td><b>${key}</b></td><td>${String(val)}</td></tr>`
              )
              .join("")}
          </table>
        </div>
      `;
      layer.bindPopup(html).openPopup();
    });
  };

  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-lg relative">
      {/* Pilihan peta KMZ */}
      <div
        style={{
          position: "absolute",
          zIndex: 1000,
          top: 16,
          left: 16,
          background: "rgba(255,255,255,0.95)",
          padding: "8px 12px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        }}
      >
        <label className="text-xs mr-2">Pilih Peta:</label>
        <select
          value={selectedKmz}
          onChange={e => setSelectedKmz(e.target.value)}
          className="text-xs p-1 rounded border"
        >
          <option value="">- Pilih Peta -</option>
          {kmzFiles.map((file) => (
            <option key={file} value={file}>{file}</option>
          ))}
        </select>
      </div>
      <MapContainer
        center={[0.6246932, 123.9750018]}
        zoom={9}
        className="w-full h-full"
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[0.6246932, 123.9750018]}>
          <Popup>Hello from this location!</Popup>
        </Marker>

        {/* GeoJSON dari KMZ pilihan */}
        {kmzGeoData && (
          <GeoJSON
            data={kmzGeoData}
            style={{ color: "#0078ff", weight: 2, fillOpacity: 0.2 }}
            onEachFeature={handleKmzFeature}
          />
        )}
      </MapContainer>
    </div>
  );
}