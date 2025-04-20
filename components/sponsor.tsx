import React from "react";
import { Flag } from "lucide-react";
import Image from "next/image"

const sponseres = [
  { img: "/sponser/dreamable.svg" },
  { img: "/sponser/thaik.svg" },
  { img: "/sponser/Agoda.svg" },
  // { img: "/sponser/TWA.svg" },
];

export default function Sponsor() {
  return (
    <section
      id="sponsors"
      className="py-20 bg-gradient-to-t from-gray-50 to-white"
    >
      <div className="flex justify-center items-center gap-4 mb-16">
        <Flag className="w-8 h-8 text-gray-300 my-2" />
        <h2 className="text-3xl md:text-4xl  font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent font-Playfair-Display italic">
          Our Sponsors
        </h2>
      </div>
      <div className="flex w-full gap-8 flex-wrap justify-center items-center">
          {sponseres.map((sponse, index) => (
            <div key={index}>
              <Image
                src={sponse.img}
                width={320}
                height={400}
                alt="Logo"
                className="w-auto max-h-[60px] scale-75 md:scale-100"
              />
            </div>
          ))}
        </div>
    </section>
  );
}
