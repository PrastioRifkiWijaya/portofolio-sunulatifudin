import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";

export type ModalType = "info" | "success" | "warning";

interface GameModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  type?: ModalType;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function GameModal({
  isOpen,
  title,
  message,
  type = "info",
  onClose,
  onConfirm,
  confirmText = "OK",
  cancelText = "Batal",
}: GameModalProps) {
  
  const getIcon = () => {
    switch(type) {
      case "success": return <CheckCircle className="w-8 h-8 text-[#10b981]" />;
      case "warning": return <AlertCircle className="w-8 h-8 text-[#f59e0b]" />;
      default: return <Info className="w-8 h-8 text-[#3b82f6]" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-gradient-to-b from-[#0a1e54] to-[#051033] border-2 border-[#ffd700] rounded-[24px] shadow-[0_0_40px_rgba(255,215,0,0.2)] overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#ffd700] via-[#ffb300] to-[#ffd700]" />
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-[#87a9ff] hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8 pt-10 flex flex-col items-center text-center">
              <div className="mb-4 bg-[#051033] p-3 rounded-full border border-[#87a9ff]/30 shadow-inner">
                 {getIcon()}
              </div>
              
              <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-3">
                {title}
              </h3>
              
              <p className="text-[#87a9ff] font-medium text-base mb-8 whitespace-pre-wrap">
                {message}
              </p>
              
              <div className="flex gap-4 w-full">
                {onConfirm && (
                  <button 
                    onClick={onClose}
                    className="flex-1 px-4 py-3 rounded-xl border border-[#87a9ff]/50 text-[#87a9ff] font-bold hover:bg-[#87a9ff]/10 transition-colors"
                  >
                    {cancelText}
                  </button>
                )}
                
                <button 
                  onClick={() => {
                    if (onConfirm) onConfirm();
                    onClose();
                  }}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-[#ffd700] to-[#ffb300] text-[#0a1e54] font-black uppercase tracking-wider hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-all"
                >
                  {confirmText}
                </button>
              </div>
            </div>
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
