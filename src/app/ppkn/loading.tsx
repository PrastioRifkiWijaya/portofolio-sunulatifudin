import { Section } from "@/components/Section";

export default function Loading() {
  return (
    <Section className="min-h-[80vh] py-16 md:py-24 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full border-4 border-primary/20 dark:border-gold/20 border-t-primary dark:border-t-gold animate-spin" />
        <p className="font-desc text-gray-500 dark:text-gray-400 font-medium animate-pulse">
          Memuat data pembelajaran...
        </p>
      </div>
    </Section>
  );
}
