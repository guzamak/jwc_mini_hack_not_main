import React from "react";
import { sponserData } from "@/lib/data";
import { Flag } from "lucide-react";

export default function Sponsor() {
  return (
    <section
      id="sponsors"
      className="py-20 bg-gradient-to-t from-gray-50 to-white"
    >
      <div className="flex justify-center items-center gap-4 mb-16">
        <Flag className="w-8 h-8 text-gray-300 my-2" />
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent font-Playfair-Display italic">
          Our Sponsors
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center">
        {sponserData.map((item, index) => (
          <div
            className="grayscale hover:grayscale-0 transition"
            key={index}
          ></div>
        ))}
      </div>
    </section>
  );
}
