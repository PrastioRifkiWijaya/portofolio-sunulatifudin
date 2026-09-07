import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import localFont from "next/font/local";

const orborn = localFont({
  src: "/fonts/Orborn.ttf",
  variable: "--font-orborn",
});

const surgena = localFont({
  src: "/fonts/Surgena.ttf",
  variable: "--font-surgena",
});

// Font untuk Deskripsi (Plus Jakarta Sans)
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Portofolio | Sunu Latifudin, S.Pd.",
  description: "Portofolio profesional Sunu Latifudin, S.Pd.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1b38" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={`${jakarta.variable} ${orborn.variable} ${surgena.variable}`}>
      <body className="min-h-dvh flex flex-col font-desc bg-background text-foreground antialiased transition-colors duration-300 overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="grow pt-20">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
