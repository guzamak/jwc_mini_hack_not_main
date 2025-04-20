import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Mini Hackathon by JWC13",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="overflow-x-hidden h-full text-base-content custom-cursor" >
        {children}
      </body>
    </html>
  );
}
