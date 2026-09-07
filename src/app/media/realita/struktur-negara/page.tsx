"use client";

import { Section } from "@/components/Section";
import Link from "next/link";
import { ArrowLeft, BookOpen, Search } from "lucide-react";
import { useState } from "react";
import { stateInstitutions } from "@/data/media-realita/struktur-negara";
import { StateInstitution } from "@/types/media-realita";
import { InstitutionPanel } from "@/components/media/realita/InstitutionPanel";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function StrukturNegaraPage() {
  const [selectedInst, setSelectedInst] = useState<StateInstitution | null>(null);


  const handleSelect = (inst: StateInstitution) => {
    setSelectedInst(inst);
  };

  const categories = [
    { name: "Eksekutif", color: "border-blue-500", bg: "bg-blue-50 dark:bg-blue-900/10" },
    { name: "Legislatif", color: "border-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/10" },
    { name: "Yudikatif", color: "border-purple-500", bg: "bg-purple-50 dark:bg-purple-900/10" },
    { name: "Eksaminatif", color: "border-amber-500", bg: "bg-amber-50 dark:bg-amber-900/10" }
  ];

  return (
    <Section className="min-h-screen py-16 md:py-24 bg-gray-50 dark:bg-background overflow-hidden relative">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link 
            href="/media/realita" 
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-gold transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Media Realita
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            <Link href="/media/realita" className="hover:text-primary dark:hover:text-gold transition-colors">Realita</Link>
            <span>/</span>
            <span className="text-gray-600 dark:text-gray-300">Struktur Ketatanegaraan</span>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-title text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Struktur Ketatanegaraan Indonesia
          </h1>
          <p className="font-desc text-gray-600 dark:text-gray-400 text-base md:text-lg">
            Hubungan lembaga-lembaga negara Republik Indonesia berdasarkan Undang-Undang Dasar 1945 (Pasca Amandemen). Klik setiap lembaga untuk melihat detail tugas dan wewenangnya.
          </p>
        </div>

        {/* Diagram Area */}
        <div className="relative w-full max-w-5xl mx-auto p-4 sm:p-8 bg-white dark:bg-gray-900/50 rounded-3xl border-2 border-gray-100 dark:border-gray-800 shadow-sm overflow-x-auto">
          
          {/* UUD 1945 Node (Top) */}
          <div className="flex justify-center mb-12 relative">
            <div className="relative z-10 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-title font-bold text-xl rounded-2xl shadow-lg border-b-4 border-gray-700 dark:border-gray-300 flex items-center">
              <BookOpen className="w-6 h-6 mr-3" />
              UUD NRI Tahun 1945
            </div>
            {/* Main Vertical Line */}
            <div className="absolute top-full left-1/2 -ml-px w-0.5 h-12 bg-gray-300 dark:bg-gray-700" />
          </div>

          {/* Horizontal Connector Line */}
          <div className="relative w-full h-0.5 bg-gray-300 dark:bg-gray-700 mb-8 max-w-[90%] mx-auto" />

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {categories.map((cat) => {
              const catInstitutions = stateInstitutions.filter(inst => inst.category === cat.name);
              
              return (
                <div key={cat.name} className="relative flex flex-col items-center">
                  {/* Vertical line connecting to horizontal line */}
                  <div className="absolute -top-8 left-1/2 -ml-px w-0.5 h-8 bg-gray-300 dark:bg-gray-700 hidden lg:block" />
                  
                  {/* Category Header */}
                  <div className={clsx(
                    "w-full text-center py-2 mb-6 border-b-2 font-title font-bold text-sm tracking-widest uppercase",
                    cat.color,
                    "text-gray-700 dark:text-gray-300"
                  )}>
                    {cat.name}
                  </div>

                  {/* Institutions in Category */}
                  <div className="w-full flex flex-col gap-4">
                    {catInstitutions.map((inst) => (
                      <motion.button
                        key={inst.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelect(inst)}
                        className={clsx(
                          "relative group w-full text-left p-4 rounded-xl border-2 transition-all duration-200 overflow-hidden",
                          cat.bg,
                          "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500",
                          selectedInst?.id === inst.id && "ring-2 ring-primary dark:ring-gold border-transparent"
                        )}
                      >
                        <div className="font-title font-bold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-gold transition-colors">
                          {inst.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate">
                          {inst.fullName}
                        </div>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-primary dark:text-gold">
                          <Search className="w-4 h-4" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center text-xs text-gray-400 dark:text-gray-600 font-desc max-w-2xl mx-auto">
            *Bagan ini adalah representasi fungsional untuk memudahkan pembelajaran. Beberapa lembaga independen lain (seperti KPU, Bank Indonesia) juga memiliki kedudukan penting sesuai UUD 1945.
          </div>
        </div>

      </div>

      <InstitutionPanel 
        institution={selectedInst} 
        onClose={() => setSelectedInst(null)} 
      />
    </Section>
  );
}
