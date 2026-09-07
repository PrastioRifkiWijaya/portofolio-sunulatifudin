import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simulasi Pemilu | Media Realita PPKn",
  description: "Modul interaktif untuk memahami proses pemilihan umum dari pendaftaran hingga pencoblosan.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
