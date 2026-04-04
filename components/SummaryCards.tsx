'use client';

import { useDashboardStore } from '../store/useDashboardStore';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { motion, Variants } from 'framer-motion'; // <-- 1. Import Variants

export default function SummaryCards() {
  const transactions = useDashboardStore((state) => state.transactions);

  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const totalBalance = totalIncome - totalExpense;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  // 2. Explicitly type these objects as Variants
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVars: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } }
  };

  return (
    <motion.div 
      variants={containerVars} 
      initial="hidden" 
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {/* Balance Card */}
      <motion.div variants={itemVars} className="bg-card p-6 rounded-2xl border border-borderMain shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
        <div>
          <p className="text-sm font-semibold text-muted mb-1">Total Balance</p>
          <h3 className="text-3xl font-bold text-textMain">{formatCurrency(totalBalance)}</h3>
        </div>
        <div className="w-14 h-14 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
          <Wallet size={28} strokeWidth={2} />
        </div>
      </motion.div>

      {/* Income Card */}
      <motion.div variants={itemVars} className="bg-card p-6 rounded-2xl border border-borderMain shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
        <div>
          <p className="text-sm font-semibold text-muted mb-1">Total Income</p>
          <h3 className="text-3xl font-bold text-emerald-500">{formatCurrency(totalIncome)}</h3>
        </div>
        <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
          <TrendingUp size={28} strokeWidth={2} />
        </div>
      </motion.div>

      {/* Expenses Card */}
      <motion.div variants={itemVars} className="bg-card p-6 rounded-2xl border border-borderMain shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
        <div>
          <p className="text-sm font-semibold text-muted mb-1">Total Expenses</p>
          <h3 className="text-3xl font-bold text-rose-500">{formatCurrency(totalExpense)}</h3>
        </div>
        <div className="w-14 h-14 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
          <TrendingDown size={28} strokeWidth={2} />
        </div>
      </motion.div>
    </motion.div>
  );
}