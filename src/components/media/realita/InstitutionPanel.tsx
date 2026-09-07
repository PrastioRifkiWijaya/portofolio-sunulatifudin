"use client";

import { StateInstitution } from "@/types/media-realita";
import { motion, AnimatePresence } from "framer-motion";
import { X, Book, Scale, Shield, Users, Landmark, AlertCircle } from "lucide-react";
import { useEffect, useRef } from "react";

interface InstitutionPanelProps {
  institution: StateInstitution | null;
  onClose: () => void;
}

export function InstitutionPanel({ institution, onClose }: InstitutionPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Handle ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Focus trap could be added here, but for simplicity we focus the panel
  useEffect(() => {
    if (institution && panelRef.current) {
      panelRef.current.focus();
    }
  }, [institution]);

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Eksekutif': return <Users className="w-5 h-5" />;
      case 'Legislatif': return <Landmark className="w-5 h-5" />;
      case 'Yudikatif': return <Scale className="w-5 h-5" />;
      case 'Eksaminatif': return <Shield className="w-5 h-5" />;
      default: return <Book className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Eksekutif': return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      case 'Legislatif': return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
      case 'Yudikatif': return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800";
      case 'Eksaminatif': return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700";
    }
  };

  return (
    <AnimatePresence>
      {institution && (
        <>
          {/* Backdrop for mobile */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          />
          
          {/* Panel */}
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            initial={{ opacity: 0, x: 20, y: '100%' }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 20, y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 h-[85vh] lg:h-auto lg:top-24 lg:bottom-6 lg:right-6 lg:left-auto lg:w-112.5 z-50 bg-white dark:bg-gray-900 shadow-2xl rounded-t-3xl lg:rounded-3xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden outline-none lg:translate-y-0"
            role="dialog"
            aria-label={`Detail Lembaga: ${institution.name}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 shrink-0">
              <div className="pr-4">
                <div className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-3 border ${getCategoryColor(institution.category)}`}>
                  {getCategoryIcon(institution.category)}
                  <span className="ml-1.5">{institution.category}</span>
                </div>
                <h2 className="font-title text-2xl font-bold text-gray-900 dark:text-white">
                  {institution.name}
                </h2>
                <p className="font-title text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {institution.fullName}
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400 transition-colors shrink-0 shadow-sm border border-gray-200 dark:border-gray-700"
                aria-label="Tutup panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto grow space-y-8">
              {/* Ringkasan */}
              <section>
                <h3 className="text-xs font-bold text-primary dark:text-gold uppercase tracking-wider mb-2 flex items-center">
                  <Book className="w-4 h-4 mr-1.5" />
                  Ringkasan
                </h3>
                <p className="font-desc text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {institution.shortDescription}
                </p>
              </section>

              {/* Kewenangan */}
              {institution.authorities.length > 0 && (
                <section>
                  <h3 className="text-xs font-bold text-primary dark:text-gold uppercase tracking-wider mb-3 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1.5" />
                    Wewenang Utama
                  </h3>
                  <ul className="space-y-2">
                    {institution.authorities.map((item, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                        <span className="mr-2.5 mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60 dark:bg-gold/60" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Tugas */}
              {institution.duties.length > 0 && (
                <section>
                  <h3 className="text-xs font-bold text-primary dark:text-gold uppercase tracking-wider mb-3 flex items-center">
                    <Shield className="w-4 h-4 mr-1.5" />
                    Tugas Utama
                  </h3>
                  <ul className="space-y-2">
                    {institution.duties.map((item, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                        <span className="mr-2.5 mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400 dark:bg-gray-600" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Dasar Hukum */}
              {institution.legalBasis.length > 0 && (
                <section className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                  <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-2 flex items-center">
                    <Scale className="w-4 h-4 mr-1.5" />
                    Dasar Hukum
                  </h3>
                  <div className="space-y-1">
                    {institution.legalBasis.map((item, idx) => (
                      <div key={idx} className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                        {item}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
