import { Award, FileJson2, Palette, SearchSlash } from "lucide-react";
import React from "react";

export default function About() {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-center items-center gap-4 mb-16">
          <SearchSlash className="w-8 h-8 text-gray-300 my-2" />
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent font-Playfair-Display italic">
            About The Event
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-8 border-2 border-gray-200 rounded-3xl hover:bg-gray-100 duration-200">
            <FileJson2 className="w-8 h-8 text-gray-300 my-2" />
            <h3 className="text-xl font-bold mb-3 font-Playfair-Display ">48 Hours of Coding</h3>
            <p className="text-gray-600">
              Immerse yourself in a non-stop coding experience with like-minded
              developers.
            </p>
          </div>
          <div className="p-8 border-2 border-gray-200 rounded-3xl hover:bg-gray-100 duration-200">
            <Palette className="w-8 h-8 text-gray-300 my-2" />
            <h3 className="text-xl font-bold mb-3 font-Playfair-Display ">1 Page Theme</h3>
            <p className="text-gray-600">
              Connect with developers from around the globe and build your
              network.
            </p>
          </div>
          <div className="p-8 border-2 border-gray-200 rounded-3xl hover:bg-gray-100 duration-200">
            <Award className="w-8 h-8 text-gray-300 my-2" />
            <h3 className="text-xl font-bold mb-3 font-Playfair-Display ">$50K in Prizes</h3>
            <p className="text-gray-600">
              Compete for amazing prizes and recognition in the tech community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
