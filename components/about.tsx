import { Award, FileJson2, Palette, SearchSlash } from "lucide-react";
import React from "react";
import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="pt-20 bg-gradient-to-b from-white to-gray-50 relative"
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-center items-center gap-3 mb-16">
          <Image
            src="/assert/eye.svg"
            alt="Hackathon Banner"
            width={25}
            height={25}
            className="  "
          />
          <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent font-Playfair-Display italic">
            About The Event
          </h2>
        </div>
        <div className="w-full h-fit p-5 text-center mb-3.5">
          <p>
            <p className="font-bold mb-3">Mini Hack by JWC13</p> เป็นกิจกรรม Hackathon จัดขึ้นโดยพี่ ๆ จากค่าย JWC
            (Junior Webmater Camp) โดยจะส่งต่อประสบการณ์สุดพิเศษผ่านรูปแบบ
            Hackathon ไป-กลับ 2 วันเต็ม สำหรับน้อง ๆ ม.ปลาย
            ที่สนใจเทคโนโลยีและอยากเติบโตในวงการ Webmater
            ไม่ว่าจะด้านการเขียนโปรแกรม การออกแบบ หรือการเสนอไอเดียใหม่ ๆ
            ผ่านรูปแบบเว็บไซต์ น้องจะได้รวมทีมสร้างเว็บไซต์ ร่วมกิจกรรมสนุก ๆ
            ทำความรู้จักเพื่อนใหม่ และได้พูดคุยพบปะกับพี่ ๆ จากค่าย JWC ตัวจริง
            ซึ่ง Hackathon ในครั้งนี้พวกเรามาในธีม "One-Page Wonder
            สร้างประสบการณ์เว็บทั้งระบบในหน้าเดียว" เปิดโอกาสให้น้อง ๆ
            แสดงไอเดียความคิดสร้างสรรค์อย่างเต็มที่ในระยะเวลา 2 วัน "ที่นี่...
            เราจะพิสูจน์ให้เห็นว่า
            การเรียนรู้เทคโนโลยีสามารถสนุกและสร้างสรรค์ได้ทุกคน!"
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-8 border-2 border-gray-200 rounded-3xl hover:bg-gray-100 hover:scale-105  duration-200">
            <FileJson2 className="w-8 h-8 text-gray-300 my-2" />
            <h3 className="text-xl font-bold mb-3 font-Playfair-Display ">
              48 Hours of Hackathon
            </h3>
            <p className="text-gray-600">
              การทำโปรเจกต์สุดโหดในเวลา 48 ชั่วโมง
            </p>
          </div>
          <div className="p-8 border-2 border-gray-200 rounded-3xl hover:bg-gray-100 hover:scale-105 duration-200">
            <Palette className="w-8 h-8 text-gray-300 my-2" />
            <h3 className="text-xl font-bold mb-3 font-Playfair-Display ">
              1 Page Wonder Theme
            </h3>
            <p className="text-gray-600">หลายหน้าก็ไม่ได้ หลายใจก็ไม่ดี</p>
          </div>
          <div className="p-8 border-2 border-gray-200 rounded-3xl hover:bg-gray-100 hover:scale-105 duration-200">
            <Award className="w-8 h-8 text-gray-300 my-2" />
            <h3 className="text-xl font-bold mb-3 font-Playfair-Display ">
              More Prizes
            </h3>
            <p className="text-gray-600">
              ของรางวัลสุดพิเศษจากพี่ๆ JWC 13 ที่เเสนอบอุ่น
            </p>
          </div>
        </div>
        <div className="flex flex-col py-5 gap-4">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent font-Playfair-Display italic">
            proposition
          </h2>
          <div className="flex flex-col justify-center items-center gap-4">
            <Image
              src="/assert/chill.svg"
              alt="Hackathon Banner"
              width={200}
              height={200}
              className=" duration-200 hover:scale-110"
            />

            <div className="h-36 flex justify-center items-center gap-4">
              <p className="text-2xl text-gray-700 font-semibold">
                &quot; ?????? &quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
