'use client';

import { useEffect } from 'react'; // <-- Add this import
import { useDashboardStore } from '../store/useDashboardStore';
import { Shield, User, LayoutDashboard, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { role, toggleRole, theme, toggleTheme } = useDashboardStore();
  const isAdmin = role === 'Admin';
  const isDark = theme === 'dark';

  // <-- ADD THIS EFFECT: It syncs Zustand to the HTML tag
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <nav className="bg-card/80 backdrop-blur-md sticky top-0 z-50 border-b border-borderMain px-4 sm:px-6 py-4 flex justify-between items-center shadow-sm transition-colors duration-300">
      
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-linear-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-md text-white">
          <LayoutDashboard className="w-5 h-5" />
        </div>
        <h1 className={isDark ? `text-xl font-bold text-white hidden sm:block` : `text-xl font-bold text-black hidden sm:block`}>
          FinanceFlow
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Animated Dark/Light Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="relative flex items-center justify-center w-10 h-10 rounded-full bg-main border border-borderMain text-textMain hover:bg-borderMain transition-colors"
          aria-label="Toggle Dark Mode"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={theme}
              initial={{ y: -20, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 20, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </motion.div>
          </AnimatePresence>
        </button>

        {/* Animated Role Toggle */}
        <div
          onClick={toggleRole}
          className="relative flex items-center bg-main border border-borderMain hover:brightness-95 rounded-full p-1 cursor-pointer w-48 h-10 shadow-inner transition-colors"
          role="button"
          tabIndex={0}
        >
          <motion.div
            className="absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] bg-card rounded-full shadow-md"
            initial={false}
            animate={{ x: isAdmin ? "100%" : "0%" }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />

          <div className={`relative z-10 flex flex-1 items-center justify-center gap-1.5 text-sm font-bold transition-colors duration-300 ${!isAdmin ? 'text-textMain' : 'text-muted'}`}>
            <User className="w-4 h-4" />
            <span>Viewer</span>
          </div>

          <div className={`relative z-10 flex flex-1 items-center justify-center gap-1.5 text-sm font-bold transition-colors duration-300 ${isAdmin ? 'text-indigo-500' : 'text-muted'}`}>
            <Shield className="w-4 h-4" />
            <span>Admin</span>
          </div>
        </div>
      </div>
    </nav>
  );
}