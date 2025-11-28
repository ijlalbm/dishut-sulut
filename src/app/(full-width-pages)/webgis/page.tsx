"use client";

import dynamic from "next/dynamic";
import Header from "../../../components/webgis/Header";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const LeafletMap = dynamic(() => import("../../../components/webgis/Map"), {
  ssr: false,
});

const images = [
  "/images/carousel/carousel-01.png",
  "/images/carousel/carousel-02.png",
  "/images/carousel/carousel-03.png",
];

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

      {/* Map di bawah carousel, tinggi pasti dan responsif */}
      <div className="w-full" style={{ height: "60vh" }}>
        <LeafletMap />
      </div>
    </div>
  );
}