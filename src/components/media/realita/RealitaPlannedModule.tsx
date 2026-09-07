import { Section } from "@/components/Section";
import Link from "next/link";
import { ArrowLeft, Clock, LucideIcon } from "lucide-react";
import { RealitaModule } from "@/types/media-realita";

interface RealitaPlannedModuleProps {
  module: RealitaModule;
  icon: LucideIcon;
}

export function RealitaPlannedModule({ module, icon: Icon }: RealitaPlannedModuleProps) {
  return (
    <Section className="min-h-screen py-16 md:py-24 bg-gray-50 dark:bg-background overflow-hidden relative">
      <div className="max-w-4xl mx-auto space-y-8 px-4 sm:px-6">
        
        {/* Header & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link 
            href="/media/realita" 
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Media Realita
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 hidden sm:flex">
            <Link href="/media/realita" className="hover:text-primary dark:hover:text-gold transition-colors">Realita</Link>
            <span>/</span>
            <span className="text-gray-600 dark:text-gray-300">{module.title}</span>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-white dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm p-8 sm:p-16 text-center flex flex-col items-center justify-center min-h-125 relative overflow-hidden">
          
          {/* Decorative background element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gray-100/50 dark:bg-gray-800/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="h-24 w-24 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 rounded-3xl flex items-center justify-center mb-8 shadow-inner border border-gray-200 dark:border-gray-700">
              <Icon className="h-12 w-12" />
            </div>

            <div className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-bold rounded-full uppercase tracking-widest mb-6">
              <Clock className="w-4 h-4 mr-2" />
              Segera Hadir
            </div>

            <h1 className="font-title text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {module.title}
            </h1>

            <p className="font-desc text-gray-500 dark:text-gray-400 text-lg max-w-2xl leading-relaxed mb-10">
              {module.description} Modul interaktif ini telah masuk ke dalam tahapan pengembangan dan akan segera tersedia.
            </p>

            <Link 
              href="/media/realita"
              className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 shadow-lg"
            >
              Kembali ke Media Realita
            </Link>
          </div>
        </div>

      </div>
    </Section>
  );
}
