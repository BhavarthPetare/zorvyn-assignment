'use client';

import { useMemo } from 'react';
import { useDashboardStore } from '../store/useDashboardStore';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function DashboardCharts() {
  const transactions = useDashboardStore((state) => state.transactions);

  const doughnutData = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === 'expense');
    const grouped = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

    return {
      labels: Object.keys(grouped),
      datasets: [
        {
          data: Object.values(grouped),
          backgroundColor: [
            'rgba(99, 102, 241, 0.85)',
            'rgba(14, 165, 233, 0.85)',
            'rgba(244, 63, 94, 0.85)',
            'rgba(245, 158, 11, 0.85)',
            'rgba(16, 185, 129, 0.85)',
          ],
          borderWidth: 0,
          hoverOffset: 4,
        },
      ],
    };
  }, [transactions]);

  const barData = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const uniqueDates = Array.from(new Set(sorted.map(t => t.date)));

    const incomeData = uniqueDates.map(date => {
      return sorted.filter(t => t.date === date && t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    });

    const expenseData = uniqueDates.map(date => {
      return sorted.filter(t => t.date === date && t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    });

    return {
      labels: uniqueDates,
      datasets: [
        {
          label: 'Income',
          data: incomeData,
          backgroundColor: 'rgba(16, 185, 129, 0.9)',
          borderRadius: 4,
        },
        {
          label: 'Expenses',
          data: expenseData,
          backgroundColor: 'rgba(244, 63, 94, 0.9)',
          borderRadius: 4,
        },
      ],
    };
  }, [transactions]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      <div className="bg-card p-6 rounded-2xl border border-borderMain shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-lg font-bold text-textMain mb-6">Cash Flow Trend</h3>
        <div className="h-64 flex items-center justify-center">
          <Bar data={barData} options={{ maintainAspectRatio: false, responsive: true }} />
        </div>
      </div>

      <div className="bg-card p-6 rounded-2xl border border-borderMain shadow-sm hover:shadow-md transition-shadow">
        <h3 className="text-lg font-bold text-textMain mb-6">Spending Breakdown</h3>
        <div className="h-64 flex items-center justify-center">
          <Doughnut data={doughnutData} options={{ maintainAspectRatio: false, responsive: true, cutout: '70%' }} />
        </div>
      </div>
    </motion.div>
  );
}