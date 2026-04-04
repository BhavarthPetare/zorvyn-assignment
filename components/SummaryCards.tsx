'use client';

import { useDashboardStore } from '../store/useDashboardStore';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export default function SummaryCards() {
  const transactions = useDashboardStore((state) => state.transactions);

  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const totalBalance = totalIncome - totalExpense;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  
  const itemVars: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: smoothEase } }
  };

  return (
    <motion.div 
      variants={containerVars} 
      initial="hidden" 
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-3"
    >
      {/* CHANGED: `flex-wrap` is now `flex-wrap-reverse` so the icon wraps UP.
        ADDED: `ml-auto md:ml-0` to the icon container so it stays right-aligned when stacked.
      */}
      <motion.div variants={itemVars} className="bg-card p-6 rounded-2xl border border-borderMain shadow-sm hover:shadow-md transition-all flex flex-wrap-reverse items-center justify-between gap-x-8 gap-y-4 group">
        <div className="flex-1 min-w-35">
          <p className="text-sm font-semibold text-muted mb-1">Total Balance</p>
          <h3 className="text-3xl font-bold text-textMain wrap-break-word">{formatCurrency(totalBalance)}</h3>
        </div>
        <div className="w-14 h-14 shrink-0 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform ml-auto md:ml-0">
          <Wallet size={28} strokeWidth={2} />
        </div>
      </motion.div>

      <motion.div variants={itemVars} className="bg-card p-6 rounded-2xl border border-borderMain shadow-sm hover:shadow-md transition-all flex flex-wrap-reverse items-center justify-between gap-x-8 gap-y-4 group">
        <div className="flex-1 min-w-35">
          <p className="text-sm font-semibold text-muted mb-1">Total Income</p>
          <h3 className="text-3xl font-bold text-emerald-500 wrap-break-word">{formatCurrency(totalIncome)}</h3>
        </div>
        <div className="w-14 h-14 shrink-0 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform ml-auto md:ml-0">
          <TrendingUp size={28} strokeWidth={2} />
        </div>
      </motion.div>

      <motion.div variants={itemVars} className="bg-card p-6 rounded-2xl border border-borderMain shadow-sm hover:shadow-md transition-all flex flex-wrap-reverse items-center justify-between gap-x-8 gap-y-4 group">
        <div className="flex-1 min-w-35">
          <p className="text-sm font-semibold text-muted mb-1">Total Expenses</p>
          <h3 className="text-3xl font-bold text-rose-500 wrap-break-word">{formatCurrency(totalExpense)}</h3>
        </div>
        <div className="w-14 h-14 shrink-0 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform ml-auto md:ml-0">
          <TrendingDown size={28} strokeWidth={2} />
        </div>
      </motion.div>
    </motion.div>
  );
}