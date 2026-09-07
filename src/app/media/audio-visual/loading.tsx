import { Section } from "@/components/Section";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <Section className="min-h-[80vh] py-16 md:py-24 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-gray-400">
        <Loader2 className="w-10 h-10 animate-spin text-primary dark:text-gold" />
        <p className="font-title font-semibold tracking-wider text-sm animate-pulse">Memuat Jenjang Pendidikan...</p>
      </div>
    </Section>
  );
}
