"use client";

import dynamic from "next/dynamic";
import Header from "../../../components/webgis/Header";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LeafletMap = dynamic(() => import("../../../components/webgis/Map"), {
  ssr: false,
});

const images = [
  "/images/carousel/carousel-01.png",
  "/images/carousel/carousel-02.png",
  "/images/carousel/carousel-03.png",
];

// Contoh data chart
const barData = {
  labels: ["Flora", "Fauna", "Karhutla", "Deforestasi", "Pembibitan"],
  datasets: [
    {
      label: "Jumlah Data",
      data: [120, 80, 30, 45, 60],
      backgroundColor: "#2563eb",
    },
  ],
};

const barOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: "Statistik Data" },
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Carousel full lebar atas */}
      <div className="w-full">
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          showStatus={false}
          dynamicHeight={false}
        >
          {images.map((src, idx) => (
            <div key={idx}>
              <img
                src={src}
                alt={`Photo ${idx + 1}`}
                className="object-cover w-full"
                style={{ maxHeight: "70vh", width: "100%" }}
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Card Statistik Dashboard */}
      <div className="w-full flex flex-wrap gap-6 justify-center items-start py-8" >
        {/* Card Chart */}
        <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Diagram Statistik</h3>
          <Bar data={barData} options={barOptions} />
        </div>
        {/* Card Tabel */}
        <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Tabel Data</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-2 text-left">Kategori</th>
                <th className="py-2 px-2 text-right">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {barData.labels.map((label, idx) => (
                <tr key={label}>
                  <td className="py-2 px-2">{label}</td>
                  <td className="py-2 px-2 text-right">
                    {barData.datasets[0].data[idx]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Map di bawah carousel, tinggi pasti dan responsif */}
      <div className="w-full" style={{ height: "80vh" }}>
        <LeafletMap />
      </div>
      {/* Footer */}
      <footer className="w-full py-4 bg-gray-100 text-center text-xs text-gray-500 mt-auto">
        &copy; {new Date().getFullYear()} Bank Data Dishut Sulut. All rights
        reserved.
      </footer>
    </div>
  );
}