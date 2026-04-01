'use client';

import { useDashboardStore } from '../store/useDashboardStore';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

export default function SummaryCards() {
  const transactions = useDashboardStore((state) => state.transactions);

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Balance Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
        <div>
          <p className="text-sm font-semibold text-slate-500 mb-1">Total Balance</p>
          <h3 className="text-3xl font-bold text-slate-900">{formatCurrency(totalBalance)}</h3>
        </div>
        <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
          <Wallet size={28} strokeWidth={2} />
        </div>
      </div>

      {/* Total Income Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
        <div>
          <p className="text-sm font-semibold text-slate-500 mb-1">Total Income</p>
          <h3 className="text-3xl font-bold text-emerald-600">{formatCurrency(totalIncome)}</h3>
        </div>
        <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
          <TrendingUp size={28} strokeWidth={2} />
        </div>
      </div>

      {/* Total Expenses Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
        <div>
          <p className="text-sm font-semibold text-slate-500 mb-1">Total Expenses</p>
          <h3 className="text-3xl font-bold text-rose-600">{formatCurrency(totalExpense)}</h3>
        </div>
        <div className="w-14 h-14 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
          <TrendingDown size={28} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}