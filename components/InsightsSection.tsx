'use client';

import { useDashboardStore } from '../store/useDashboardStore';
import { Lightbulb, AlertCircle, TrendingUp } from 'lucide-react';

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
    <div>
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        Smart Insights
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Insight 1: Top Category */}
        <div className="bg-sky-50/50 border border-sky-100 p-5 rounded-2xl flex items-start gap-4">
          <div className="bg-sky-100 p-2.5 rounded-xl text-sky-600">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-sky-900">Top Spending Area</p>
            <p className="text-sm text-sky-700 mt-1 leading-relaxed">
              Most spending is on <span className="font-bold">{highestCategory}</span> (${highestAmount.toFixed(2)}).
            </p>
          </div>
        </div>

        {/* Insight 2: Largest Expense */}
        <div className="bg-rose-50/50 border border-rose-100 p-5 rounded-2xl flex items-start gap-4">
          <div className="bg-rose-100 p-2.5 rounded-xl text-rose-600">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-rose-900">Largest Transaction</p>
            <p className="text-sm text-rose-700 mt-1 leading-relaxed">
              Biggest hit was <span className="font-bold">{largestExpense?.description || 'N/A'}</span> for ${largestExpense?.amount.toFixed(2) || '0.00'}.
            </p>
          </div>
        </div>

        {/* Insight 3: Financial Health */}
        <div className={`p-5 rounded-2xl flex items-start gap-4 border ${Number(savingsRate) >= 20 ? 'bg-emerald-50/50 border-emerald-100' : 'bg-slate-50/50 border-slate-200'}`}>
          <div className={`p-2.5 rounded-xl ${Number(savingsRate) >= 20 ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-600'}`}>
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <p className={`text-sm font-bold ${Number(savingsRate) >= 20 ? 'text-emerald-900' : 'text-slate-900'}`}>Savings Rate</p>
            <p className={`text-sm mt-1 leading-relaxed ${Number(savingsRate) >= 20 ? 'text-emerald-700' : 'text-slate-700'}`}>
              You are saving <span className="font-bold">{savingsRate}%</span> of your income. 
              {Number(savingsRate) >= 20 ? ' Great job!' : ' Monitor your spending.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}