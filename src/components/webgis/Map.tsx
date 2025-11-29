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
      const props = feature.properties || {};
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
      {/* Sidebar floating di atas peta, ikut scroll */}
      <div
        style={{
          position: "absolute",
          top: "32px",
          left: "32px",
          width: "320px",
          zIndex: 1100,
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <label className="text-sm font-medium mb-1">Pilih Peta KMZ:</label>
        <select
          value={selectedKmz}
          onChange={e => setSelectedKmz(e.target.value)}
          className="p-2 border rounded mb-2"
        >
          <option value="">- Pilih Peta -</option>
          {kmzFiles.map((file) => (
            <option key={file} value={file}>{file}</option>
          ))}
        </select>
      </div>
      {/* Map */}
      <MapContainer
        center={[0.6246932, 123.9750018]}
        zoom={9}
        className="w-full h-full"
        style={{ zIndex: 1 }}
      >
        <TileLayer
          attribution="© Google Maps"
          url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
        />

        <Marker position={[0.6246932, 123.9750018]}>
          <Popup>Hello from this location!</Popup>
        </Marker>

        {/* GeoJSON dari KMZ pilihan */}
        {kmzGeoData && (
          <GeoJSON
            key={selectedKmz}
            data={kmzGeoData}
            style={{ color: "#0078ff", weight: 2, fillOpacity: 0.2 }}
            onEachFeature={handleKmzFeature}
          />
        )}
      </MapContainer>
    </div>
  );
}