"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function Login() {
  const onsignin = () => {
    localStorage.setItem("justLoggedIn", "true");
    signIn("google");
  };
  return (
    <Button
      className="w-full flex items-center justify-center gap-3 px-6 py-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer"
      variant="outline"
      onClick={onsignin}
    >
      <FontAwesomeIcon icon={faGoogle} className="text-gray-600 h-4 w-4 m-1" />
      <p className="font-IBM-Plex text-gray-600 ">เข้าสู่ระบบด้วย Google</p>
    </Button>
  );
}
