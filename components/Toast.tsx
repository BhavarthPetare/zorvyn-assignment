'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useDashboardStore } from '../store/useDashboardStore';
import { CheckCircle2, Trash2 } from 'lucide-react';

export default function Toast() {
  const { toast } = useDashboardStore();

  return (
    <AnimatePresence>
      {toast.type && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 pointer-events-none"
        >
          {/* Replaced transparent classes with solid background colors and white text */}
          <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border text-white ${
            toast.type === 'success' 
              ? 'bg-emerald-600 border-emerald-700' 
              : 'bg-rose-600 border-rose-700'
          }`}>
            <div className="p-1 rounded-full bg-white/20">
              {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <Trash2 className="w-5 h-5" />}
            </div>
            <p className="font-semibold text-sm">{toast.message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}