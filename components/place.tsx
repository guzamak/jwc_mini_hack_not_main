import { MapPin } from "lucide-react";
import Image from "next/image";

export default function Place() {
  return (
  <section id="venue" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">


  <div className="container mx-auto px-6 relative">
         <div className="flex justify-center items-center gap-4 mb-12">
          <MapPin className="w-8 h-8 text-gray-300 my-2"/>
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent font-Playfair-Display italic">
          Location
          </h2>
        </div>
      <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-4"> Tech Innovation Center</h3>
              <p className="text-gray-600">123 Innovation Street, Silicon Valley, CA 94025 </p>
          </div>

          <div className="relative w-full h-[500px] rounded-3xl  shadow-xl border border-gray-200">
              <Image
                                                          src="/assert/gacha.svg"
                                                          alt="Hackathon Banner"
                                                          width={150}
                                                          height={150}
                                                          className="z-10 absolute -bottom-1/12 -right-5 rotate-[15deg] "
                                                        />
              <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1410.4534293450847!2d100.78088629331673!3d13.730849606071523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d66308ce98ffd%3A0xcb43a76f038c38ca!2z4LiE4LiT4Liw4LmA4LiX4LiE4LmC4LiZ4LmC4Lil4Lii4Li14Liq4Liy4Lij4Liq4LiZ4LmA4LiX4LioIOC4quC4luC4suC4muC4seC4meC5gOC4l-C4hOC5guC4meC5guC4peC4ouC4teC4nuC4o-C4sOC4iOC4reC4oeC5gOC4geC4peC5ieC4suC5gOC4iOC5ieC4suC4hOC4uOC4k-C4l-C4q-C4suC4o-C4peC4suC4lOC4geC4o-C4sOC4muC4seC4hyAoSVRLTUlUTCk!5e0!3m2!1sth!2sth!4v1717121493113!5m2!1sth!2sth"
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
