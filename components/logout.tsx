"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Login() {
  return (
      <Button
        variant="outline"
        onClick={() => signOut()}>
        logout
      </Button>
  );
}