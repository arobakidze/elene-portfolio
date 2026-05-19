import type { Metadata } from "next";
import { Inter, Playfair_Display, DM_Mono } from "next/font/google";
import { GSAPProvider } from "@/components/providers/GSAPProvider";
import { IntroProvider } from "@/components/providers/IntroProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CursorProvider } from "@/components/providers/CursorContext";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-syne-var",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair-var",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono-var",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elene Luashvili — Designer / Art Director",
  description:
    "A creative and detail-oriented designer turning ideas into engaging visuals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${dmMono.variable}`}
    >
      <body>
        <GSAPProvider>
          <SmoothScroll>
            <IntroProvider>
              <CursorProvider>
                <CustomCursor />
                <Navbar />
                {children}
              </CursorProvider>
            </IntroProvider>
          </SmoothScroll>
        </GSAPProvider>
      </body>
    </html>
  );
}
