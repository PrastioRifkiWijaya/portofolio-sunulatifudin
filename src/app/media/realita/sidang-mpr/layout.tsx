import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sidang MPR | Media Realita PPKn",
  description: "Simulasi interaktif tata tertib dan persidangan Majelis Permusyawaratan Rakyat.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
