"use client";
import React from "react";
import Image from "next/image";

export default function Onlond() {
  return (
    <div className="fixed w-screen h-screen flex justify-center items-center pointer-events-none duration-200">
      <div className="container">
        <Image
          src="/assert/hero logo.svg"
          alt="Hackathon Banner"
          width={350}
          height={200}
          className=""
        />
      </div>
    </div>
  );
}
