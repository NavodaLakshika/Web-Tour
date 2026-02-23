import type { Metadata } from "next";
// import { Playfair_Display, Montserrat } from "next/font/google"; // Disabled due to Turbopack issue
import "./globals.css";
import { ChatBot } from "@/components/features/ChatBot";

/* 
const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
});
*/

export const metadata: Metadata = {
  title: "Sri Lanka - The Pearl of the Indian Ocean",
  description: "Discover the beauty, culture, and attractions of Sri Lanka. Plan your perfect trip to paradise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* Manually setting font classes as variables are now in CSS */}
      <body
        className={`antialiased font-sans bg-background text-foreground overflow-x-hidden`}
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
