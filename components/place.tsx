import { MapPin } from "lucide-react";
import Image from "next/image";

export default function Place() {
  return (
  <section id="venue" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">


  <div className="container mx-auto px-6 relative">
         <div className="flex justify-center items-center gap-4 mb-12">
          <MapPin className="w-8 h-8 text-gray-300 my-2"/>
          <h2 className="text-3xl md:text-4xl  font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent font-Playfair-Display italic">
          Location
          </h2>
        </div>
      <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">อโกด้า ประเทศไทย</h3>
              <p className="text-gray-600">999/9 อาคารดิออฟฟิศเซส แอท เซ็นทรัลเวิลด์
              ถนนพระราม 1 แขวงปทุมวัน เขตปทุมวัน กรุงเทพมหานคร 10330</p>
          </div>

          <div className="relative w-full h-[500px] rounded-3xl  shadow-xl border border-gray-200">
              <Image
                                                          src="/assert/gacha.svg"
                                                          alt="Hackathon Banner"
                                                          width={150}
                                                          height={150}
                                                          className="z-10 absolute -bottom-1/12 -right-5 rotate-[15deg] scale-75 md:scale-100"
                                                        />
              <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.545498213283!2d100.53576057586501!3d13.745944597427492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f948d90fb39%3A0x9066d5f51fc5f661!2z4LmA4LiL4LmH4LiZ4LiX4Lij4Lix4Lil4LmA4Lin4Li04Lil4LiU4LmMIOC4reC4reC4n-C4n-C4tOC4qOC5gOC4qOC4qg!5e0!3m2!1sth!2sth!4v1745232913193!5m2!1sth!2sth"
                  width="100%" 
                  height="100%" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0">
              </iframe>
          </div>
      </div>
  </div>
</section>
  );
}
