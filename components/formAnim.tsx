import { useSession, signOut } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Form from "./form";
import Login from "./login";
import { User } from "lucide-react";

export default function FormAnim() {
  const { data: session, status } = useSession();
  const formSectionRef = useRef<HTMLDivElement | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [displayForm, setDisplayForm] = useState(false);
  const [displayLogin, setDisplayLogin] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && session) {
      const justLoggedIn = localStorage.getItem("justLoggedIn");

      if (justLoggedIn === "true") {
        localStorage.removeItem("justLoggedIn");

        if (formSectionRef.current) {
          const formTop = formSectionRef.current.getBoundingClientRect().top;
          window.scrollTo({
            top: formTop + window.scrollY - 20,
            behavior: "smooth",
          });
        }

        const formDisplayTimeout = setTimeout(() => {
          setShowLogin(false);
          setDisplayForm(true);
        }, 1200);
        const formFadeTimeout = setTimeout(() => {
          setDisplayLogin(false);
          setShowForm(true);
        }, 1600);

        return () => {
          clearTimeout(formDisplayTimeout);
          clearTimeout(formFadeTimeout);
        };
      } else {
        const formDisplayTimeout = setTimeout(() => {
          setShowLogin(false);
          setDisplayForm(true);
        }, 1200);
        const formFadeTimeout = setTimeout(() => {
          setDisplayLogin(false);
          setShowForm(true);
        }, 1800);
        
        return () => {
          clearTimeout(formDisplayTimeout);
          clearTimeout(formFadeTimeout);
        };
      }
    }

    if (status === "unauthenticated") {
      setShowForm(false);
      setShowLogin(true);
    }
  }, [status, session]);

  const OnLogout = () => {
    setShowForm(false);
   
    if (formSectionRef.current) {
      const formTop = formSectionRef.current.getBoundingClientRect().top;
      window.scrollTo({
        top: formTop + window.scrollY ,
        behavior: "smooth",
      });
    }

    setTimeout(() => {
      setDisplayForm(false);
      setDisplayLogin(true);
    }, 800);
    
    setTimeout(()=>{
      setShowLogin(true);
    },1200)

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1600);

    setTimeout(() => {
      localStorage.removeItem("justLoggedIn");
      signOut();
    }, 1800);
  };

  return (
    <div>
      <section
        id="login"
        className="bg-gradient-to-br from-gray-50 via-white to-gray-50 relative"
        ref={formSectionRef}
      >
        <div className="relative z-0">


          <div
            className={`container mx-auto px-6 py-20 gap-3 transition-opacity duration-1000 ease-in-out
        ${
          showLogin
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
        ${displayLogin ? "block" : "hidden"}
      `}
      
          >
            
            <div className="flex justify-center items-center gap-4 mb-16">
          <User  className="w-8 h-8 text-gray-300 my-2"/>
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent font-Playfair-Display italic">
          Login to Continue
          </h2>
        </div>
            <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xs border-2 border-gray-100 z-20 relative ">
              <Login />
            </div>
          </div>
        </div>
      </section>

      <div
        className={`transition-opacity duration-1000 ease-in-out 
          ${showForm ? "opacity-100 " : "opacity-0 "}
          ${displayForm ? "block" : "hidden"}`}
      >
        <Form onLogout={OnLogout} />
      </div>
    </div>
  );
}
