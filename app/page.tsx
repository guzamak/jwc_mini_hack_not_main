// import Image from "next/image";
import Form from "@/components/form";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import Login from "@/components/login";
import Logout from "@/components/logout";
import Hero from "@/components/hero";
import About from "@/components/about";
import Faq from "@/components/Faq";
import FormProvider from "@/components/formProvider";
import Timeline from "@/components/timeline";
import Place from "@/components/place";
import Sponsor from "@/components/sponsor";
import Footer from "@/components/footer";
import FormAnim from "@/components/formAnim";
import TimelineWithSpiral from "@/components/test";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faFacebook,
  faGoogle,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Image from 'next/image'

export default async function Home() {
  return (
    // <div className="w-screen h-auto flex flex-col justify-center items-center">
    //   {/* <Hero />
    //   <Timeline />
    //   <FormProvider />

    //     <Sponsor />
    //     <Footer /> */}
    //   </div>
    <div className="min-h-screen bg-gradient-to-b font-IBM-Plex ">
      {/* <!-- Header --> */}
      <header
        id="header"
        className="w-screen bg-gradient-to-r from-white/80 to-gray-50/80 backdrop-blur-sm z-50 border-b border-gray-100 font-Playfair-Display italic"
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* <div className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                    HACK/2025
                </div> */}
            <Image
        src="/logo/logo-jwcminihack-07.png"
        alt="Hackathon Banner"
        width={200}
        height={200}
      />
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-600 hover:text-gray-900">
                About
              </a>
              <a href="#timeline" className="text-gray-600 hover:text-gray-900">
                Timeline
              </a>
              <a href="#register" className="text-gray-600 hover:text-gray-900">
                Register
              </a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900">
                FAQ
              </a>
            </div>
            <button className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800">
              Join Now
            </button>
          </div>
        </nav>
      </header>

      {/* <!-- Hero Section --> */}
      <Hero />

      {/* <!-- About Section --> */}
      <About />

      {/* <!-- Timeline Section --> */}
      {/* <Timeline/> */}
      <TimelineWithSpiral />
      {/* <!-- Login Section --> */}

      <FormProvider />
      <Faq />
      <Place />
      {/* <!-- FAQ Section --> */}

      {/* <!-- Sponsors Section --> */}
      <Sponsor />

      {/* <!-- Footer --> */}
      <footer
        id="footer"
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12"
      >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
                <Image
                                              src="/logo/logo-jwcminihack-06.png"
                                              alt="Hackathon Banner"
                                              width={200}
                                              height={200}
                                            />
              <p className="text-gray-400">
                The biggest hackathon event of 2025.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#timeline"
                    className="text-gray-400 hover:text-white"
                  >
                    Timeline
                  </a>
                </li>
                <li>
                  <a
                    href="#register"
                    className="text-gray-400 hover:text-white"
                  >
                    Register
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">contact@hack2025.com</li>
                <li className="text-gray-400">+1 (555) 123-4567</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <FontAwesomeIcon
                    icon={faInstagram}
                    className="text-gray-600 h-4 w-4 m-1"
                  />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="text-gray-600 h-4 w-4 m-1"
                  />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <FontAwesomeIcon
                    icon={faDiscord}
                    className="text-gray-600 h-4 w-4 m-1"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HACK/2025. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
