"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet icons in Next.js
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Explicitly resolve the image URLs as strings
const DefaultIcon = L.icon({
  iconUrl: (markerIcon as unknown) as string,
  iconRetinaUrl: (markerIcon2x as unknown) as string,
  shadowUrl: (markerShadow as unknown) as string,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function LeafletMap() {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={[0.6246932, 123.9750018]}
        zoom={13}
        className="w-full h-full"
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Example Marker */}
        <Marker position={[0.6246932, 123.9750018]}>
          <Popup>Hello from this location!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}