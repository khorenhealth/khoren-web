import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans, Syne } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const syne = Syne({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-syne",
});

const plusJakarta = Plus_Jakarta_Sans({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Khoren — Healthcare that comes to you",
  description:
    "Telemedicine, online pharmacist consulting, home nursing and physiotherapy, and a live hospital locator — all in one subscription.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${plusJakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextTopLoader color="#0B69C9" showSpinner={false} />
        {children}
      </body>
    </html>
  );
}
