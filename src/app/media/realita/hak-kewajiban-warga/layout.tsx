import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studi Kasus Hak & Kewajiban | Media Realita PPKn",
  description: "Bermain tebak skenario mengenai Hak, Kewajiban, atau Pelanggaran menurut Konstitusi UUD 1945.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
