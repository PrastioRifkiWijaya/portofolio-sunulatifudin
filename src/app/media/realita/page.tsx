import { Section } from "@/components/Section";
import Link from "next/link";
import { ArrowLeft, Globe, Landmark, GitCommit, Vote, UserCheck, Users, Map, Scale, LucideIcon } from "lucide-react";
import { Metadata } from "next";
import { realitaModules } from "@/data/media-realita/modules";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "Media Realita PPKn | Modul Simulasi",
  description: "Modul simulasi interaktif untuk pembelajaran PPKn",
};

// Icon Registry mapping string names to actual Lucide components
const iconRegistry: Record<string, LucideIcon> = {
  Landmark,
  GitCommit,
  Vote,
  UserCheck,
  Users,
  Map,
  Scale,
};

export default function MediaRealitaDashboard() {
  return (
    <Section className="min-h-[80vh] py-16 md:py-24 bg-gray-50 dark:bg-background">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 sm:px-0">
          <Link 
            href="/media" 
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Media Pembelajaran
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            <Link href="/media" className="hover:text-primary dark:hover:text-gold transition-colors">Media</Link>
            <span>/</span>
            <span className="text-gray-600 dark:text-gray-300">Media Realita</span>
          </div>
        </div>

        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-8 relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900/50 p-8 shadow-sm mx-4 sm:mx-0">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 bg-primary/10 dark:bg-gold/10 text-primary dark:text-gold rounded-xl flex items-center justify-center">
                <Globe className="h-5 w-5" />
              </div>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-lg uppercase tracking-wider">
                Media Realita
              </span>
            </div>
            <h1 className="font-title text-3xl font-bold text-gray-900 dark:text-white md:text-5xl tracking-tight mb-4">
              Katalog Modul Simulasi
            </h1>
            <p className="font-desc text-gray-600 dark:text-gray-400 max-w-2xl text-lg leading-relaxed">
              Pilih modul untuk mengeksplorasi penerapan konsep-konsep PPKn di dunia nyata melalui interaksi visual dan diagram alur yang komprehensif.
            </p>
          </div>
        </div>

        {/* Grid Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 px-4 sm:px-0">
          {realitaModules.map((mod) => {
            const IconComponent = iconRegistry[mod.iconName] || Globe;
            const isActive = mod.status === "active";
            
            return (
              <Link 
                key={mod.id}
                href={mod.href}
                className={clsx(
                  "group relative flex flex-col p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 dark:focus-visible:ring-offset-background",
                  isActive 
                    ? "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-primary dark:hover:border-gold hover:shadow-xl" 
                    : "border-dashed border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 hover:border-gray-400 dark:hover:border-gray-600 opacity-90 hover:opacity-100"
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-8 gap-4">
                  <div className={clsx(
                    "h-16 w-16 rounded-2xl flex items-center justify-center shadow-inner transition-transform",
                    isActive ? "bg-primary/10 dark:bg-gold/10 text-primary dark:text-gold group-hover:scale-110" : "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                  )}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  
                  {/* Status Badge */}
                  <span className={clsx(
                    "px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full whitespace-nowrap w-fit",
                    mod.status === "active" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                    mod.status === "development" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" :
                    "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                  )}>
                    {mod.status === "active" ? "Aktif" : 
                     mod.status === "development" ? "Dalam Pengembangan" : 
                     "Segera Hadir"}
                  </span>
                </div>
                
                <h2 className={clsx(
                  "font-title text-2xl font-bold mb-3 transition-colors",
                  isActive ? "text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-gold" : "text-gray-700 dark:text-gray-300"
                )}>
                  {mod.title}
                </h2>
                
                <p className="font-desc text-gray-500 dark:text-gray-400 leading-relaxed mb-8 grow">
                  {mod.description}
                </p>

                <div className={clsx(
                  "flex items-center text-sm font-bold mt-auto",
                  isActive ? "text-primary dark:text-gold group-hover:underline" : "text-gray-500 dark:text-gray-400"
                )}>
                  {isActive ? "Mulai Simulasi" : "Lihat Detail"}
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </Section>
  );
}
