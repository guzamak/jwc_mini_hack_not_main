"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const canvasboxRef = useRef(null);
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    const box = canvasboxRef.current;

    const resizeCanvas = () => {
      const { width, height } = box.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      context.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
      context.translate(width / 2, height / 2);
    };

    resizeCanvas();

    // your animation setup
    let animationFrameId;
    const fl = 300;
    const centerZ = 2000;
    let baseAngle = 0;
    let rotationSpeed = 0.01;
    let ypos = 0;

    const drawHourglassFrame = () => {
      const segments = 36;
      const topRadius = 800;
      const neckRadius = 100;
      const height = 1000;

      context.strokeStyle = "rgba(200, 200, 200, 1)";
      context.lineWidth = 2;

      // top circle
      context.beginPath();
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2 + baseAngle;
        const x = Math.cos(angle) * topRadius;
        const z = centerZ + Math.sin(angle) * topRadius;
        const scale = fl / (fl + z);

        const px = x * scale;
        const py = (-height / 2 + ypos) * scale;

        if (i === 0) context.moveTo(px, py);
        else context.lineTo(px, py);
      }
      context.stroke();

      // bottom circle
      context.beginPath();
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2 + baseAngle;
        const x = Math.cos(angle) * topRadius;
        const z = centerZ + Math.sin(angle) * topRadius;
        const scale = fl / (fl + z);

        const px = x * scale;
        const py = (height / 2 + ypos) * scale;

        if (i === 0) context.moveTo(px, py);
        else context.lineTo(px, py);
      }
      context.stroke();

      // neck circle
      context.beginPath();
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2 + baseAngle;
        const x = Math.cos(angle) * neckRadius;
        const z = centerZ + Math.sin(angle) * neckRadius;
        const scale = fl / (fl + z);

        const px = x * scale;
        const py = ypos * scale;

        if (i === 0) context.moveTo(px, py);
        else context.lineTo(px, py);
      }
      context.stroke();

      // connect lines
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2 + baseAngle;

        let x = Math.cos(angle) * topRadius;
        let z = centerZ + Math.sin(angle) * topRadius;
        let scale = fl / (fl + z);
        let px1 = x * scale;
        let py1 = (-height / 2 + ypos) * scale;

        x = Math.cos(angle) * neckRadius;
        z = centerZ + Math.sin(angle) * neckRadius;
        scale = fl / (fl + z);
        let px2 = x * scale;
        let py2 = ypos * scale;

        context.beginPath();
        context.moveTo(px1, py1);
        context.lineTo(px2, py2);
        context.stroke();

        x = Math.cos(angle) * neckRadius;
        z = centerZ + Math.sin(angle) * neckRadius;
        scale = fl / (fl + z);
        px1 = x * scale;
        py1 = ypos * scale;

        x = Math.cos(angle) * topRadius;
        z = centerZ + Math.sin(angle) * topRadius;
        scale = fl / (fl + z);
        px2 = x * scale;
        py2 = (height / 2 + ypos) * scale;

        context.beginPath();
        context.moveTo(px1, py1);
        context.lineTo(px2, py2);
        context.stroke();
      }
    };

    const update = () => {
      baseAngle += rotationSpeed;

      context.clearRect(
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
      );
      drawHourglassFrame();

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section
      id="hero"
      className="h-[600px] flex items-center relative overflow-hidden font-Playfair-Display italic"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 opacity-10" />
      <div className="container h-full mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2">
        <div
          className="text-left max-w-2xl h-full flex flex-col justify-center"
          ref={canvasboxRef}
        >
          <h1 className="text-7xl font-bold mb-6 animate-slide-up">
            {/* <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            HACK/2025
                        </span> */}
            <Image
              src="/logo/logo-jwcminihack-08.png"
              alt="Hackathon Banner"
              width={400}
              height={200}
            />
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            Join the biggest hackathon of 2025. Code, Create, Innovate.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transform hover:scale-105 transition">
              Register Now
            </button>
            <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-full hover:bg-gray-100 transform hover:scale-105 transition">
              Learn More
            </button>
          </div>
        </div>
        <div className="w-full h-full relative">
          {/* Canvas layer (behind) */}
          <canvas id="canvas"  />
        </div>
      </div>
    </section>
  );
}
