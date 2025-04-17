"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Onlond() {
  const { data: session, status } = useSession();
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen pointer-events-none duration-500 bg-gray-50 z-50 flex items-center justify-center ${
        status === "loading" ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col gap-4 text-center">
        <Image
          src="/assert/onloading.svg"
          alt="Hackathon Banner"
          width={350}
          height={200}
          className=""
        />
        <p>LOADING ...</p>
      </div>
    </div>
  );
}
