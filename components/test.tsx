"use client";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { Flame, Megaphone, Newspaper, NotebookPen } from "lucide-react";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

const TimelineWithSpiral = () => {
  const canvasRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fl = 300;
    const numParticles = 500;
    const centerZ = 2000;
    const radius = 1000;
    let baseAngle = 0;
    let rotationSpeed = 0.01;
    let targetRotation = 0;

    const particles = [];

    for (let i = 0; i < numParticles; i++) {
      const angle = (i / numParticles) * Math.PI * 10;

      const particle = {
        angle,
        y: 3000 - (6000 / numParticles) * i,
        size: 50,
        spreadX: (Math.random() - 0.5) * 100,
        spreadY: (Math.random() - 0.5) * 100,
        spreadZ: (Math.random() - 0.5) * 100,
      };

      particle.x = Math.cos(angle) * radius + particle.spreadX;
      particle.z = centerZ + Math.sin(angle) * radius + particle.spreadZ;

      particles.push(particle);
    }

    const resizeCanvasToMatchTimeline = () => {
      const rect = timelineRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      width = rect.width;
      height = rect.height;
    };

    window.addEventListener("resize", resizeCanvasToMatchTimeline);
    resizeCanvasToMatchTimeline();

    document.body.addEventListener("mousemove", (event) => {
      targetRotation = (event.clientX - width / 2) * 0.000005;
    });

    const zsort = (a, b) => b.z - a.z;

    const update = () => {
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, width, height);

      rotationSpeed += (targetRotation - rotationSpeed) * 0.05;
      baseAngle += rotationSpeed;

      context.translate(width / 2, height / 2);

      if (Math.floor(baseAngle * 10) % 3 === 0) {
        particles.sort(zsort);
      }

      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];

        const angle = p.angle + baseAngle;
        const x = Math.cos(angle) * radius + p.spreadX;
        const z = centerZ + Math.sin(angle) * radius + p.spreadZ;
        const y = p.y + p.spreadY;

        const perspective = fl / (fl + z);
        const scaledSize = p.size * perspective;

        if (z > -fl && z < 3000) {
          context.save();
          context.scale(perspective, perspective);
          context.translate(x, y);

          context.fillStyle = `#a95dfd`;
          context.beginPath();
          context.arc(0, 0, scaledSize, 0, Math.PI * 2);
          context.fill();
          context.restore();
        }

        p.x = x;
        p.z = z;
      }

      requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener("resize", resizeCanvasToMatchTimeline);
    };
  }, []);

  const timelineItems = [
    {
      title: "Registration Opens",
      date: "January 15, 2025",
      left: true,
      icon: <NotebookPen className="w-6 h-6 text-gray-300 mb-2 " />,
    },
    {
      title: "Opening Ceremony",
      date: "March 1, 2025",
      left: false,
      icon: <Newspaper className="w-6 h-6 text-gray-300 mb-2 " />,
    },
    {
      title: "Hacking Begins",
      date: "March 2, 2025",
      left: true,
      icon: <Megaphone className="w-6 h-6 text-gray-300 mb-2 " />,
    },
    {
      title: "Final Presentation",
      date: "March 4, 2025",
      left: false,
      icon: <Flame className="w-6 h-6 text-gray-300 mb-2 " />,
    },
  ];

  return (
    <div className=" w-screen mx-auto relative bg-gray-50">
      <div className="flex justify-center items-center gap-4 mb-16">
        <Image
          src="/assert/time.svg"
          alt="Hackathon Banner"
          width={35}
          height={35}
          className="  "
        />
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent font-Playfair-Display italic">
          Event Timeline
        </h2>
      </div>

      {/* ti,e;one content */}
      <div className="w-screen relative flex flex-col justify-center items-center">
        {/* bg */}
        <div className="absolute container h-full opacity-5 ">
          <div className="absolute top-10 left-10 text-6xl font-bold text-gray-900">
            {"{"}
          </div>
          <div className="absolute bottom-10 right-10 text-6xl font-bold text-gray-900">
            {"}"}
          </div>
          <div className="absolute top-1/4 right-20 text-6xl font-bold text-gray-900">
            &lt;/&gt;
          </div>
          <div className="absolute bottom-1/4 left-20 text-6xl font-bold text-gray-900">
            {"[]"}
          </div>
        </div>

        {/* canvas */}
        <div
          className="w-full h-full max-w-4xl absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
          ref={timelineRef}
        >
          <canvas ref={canvasRef} className="w-full h-full opacity-50" />
        </div>

        {/* timeline */}
        <div className="container flex flex-col justify-center items-center px-6">
          {timelineItems.map((item, index) => (
            <div
              key={index}
              className=" mt-4 mb-4 w-full md:w-4/5 z-20"
            >
              {item.left ? (
                <div className="w-full flex justify-start hover:scale-105 duration-200">
                  <div className="w-full md:w-96 p-8 border-2 border-gray-200 rounded-3xl hover:bg-gray-100 duration-200 bg-white relative">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-200 absolute top-1/2 -translate-y-1/2 -right-3 bg-white hidden md:block"></div>
                    {item.icon}
                    <h3 className="font-bold text-xl font-Playfair-Display italic">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet </p>
                    <p className="text-gray-600 ">{item.date}</p>
                  </div>
                </div>
              ) : (
                <div className="w-full flex  justify-end hover:scale-105 duration-200">
                  <div className="w-full md:w-96 p-8 border-2 border-gray-200 rounded-3xl hover:bg-gray-100 duration-200 bg-white relative">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-200 absolute top-1/2 -translate-y-1/2 -left-3 bg-white hidden md:block"></div>
                    {item.icon}
                    <h3 className="font-bold text-xl font-Playfair-Display italic">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet </p>
                    <p className="text-gray-600">{item.date}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineWithSpiral;
