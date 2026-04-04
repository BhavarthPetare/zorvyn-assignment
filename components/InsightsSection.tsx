'use client';

import { useDashboardStore } from '../store/useDashboardStore';
import { Lightbulb, AlertCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function InsightsSection() {
  const transactions = useDashboardStore((state) => state.transactions);

  const expenses = transactions.filter((t) => t.type === 'expense');
  
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {} as Record<string, number>);

  let highestCategory = 'N/A';
  let highestAmount = 0;
  
  Object.entries(categoryTotals).forEach(([category, amount]) => {
    if (amount > highestAmount) {
      highestAmount = amount;
      highestCategory = category;
    }
  });

  const largestExpense = [...expenses].sort((a, b) => b.amount - a.amount)[0];

  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);
  
  const savingsRate = totalIncome > 0 
    ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1) 
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
    >
      <h3 className="text-lg font-bold text-textMain mb-4 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        Smart Insights
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Top Category */}
        <div className="bg-sky-500/10 border border-sky-500/20 p-5 rounded-2xl flex items-start gap-4">
          <div className="bg-sky-500/20 p-2.5 rounded-xl text-sky-500">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-textMain">Top Spending Area</p>
            <p className="text-sm text-muted mt-1 leading-relaxed">
              Most spending is on <span className="font-bold text-sky-500">{highestCategory}</span> (${highestAmount.toFixed(2)}).
            </p>
          </div>
        </div>

        {/* Largest Expense */}
        <div className="bg-rose-500/10 border border-rose-500/20 p-5 rounded-2xl flex items-start gap-4">
          <div className="bg-rose-500/20 p-2.5 rounded-xl text-rose-500">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-textMain">Largest Transaction</p>
            <p className="text-sm text-muted mt-1 leading-relaxed">
              Biggest hit was <span className="font-bold text-rose-500">{largestExpense?.description || 'N/A'}</span> for ${largestExpense?.amount.toFixed(2) || '0.00'}.
            </p>
          </div>
        </div>

        {/* Financial Health */}
        <div className={`p-5 rounded-2xl flex items-start gap-4 border ${Number(savingsRate) >= 20 ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-card border-borderMain'}`}>
          <div className={`p-2.5 rounded-xl ${Number(savingsRate) >= 20 ? 'bg-emerald-500/20 text-emerald-500' : 'bg-borderMain text-muted'}`}>
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-textMain">Savings Rate</p>
            <p className="text-sm mt-1 leading-relaxed text-muted">
              You are saving <span className={`font-bold ${Number(savingsRate) >= 20 ? 'text-emerald-500' : 'text-textMain'}`}>{savingsRate}%</span> of your income. 
              {Number(savingsRate) >= 20 ? ' Great job!' : ' Monitor your spending.'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}