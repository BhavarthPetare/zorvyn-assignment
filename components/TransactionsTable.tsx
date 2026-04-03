'use client';

import { useState } from 'react';
import { useDashboardStore } from '../store/useDashboardStore';
import { Search, Trash2, Plus, Receipt } from 'lucide-react';

export default function TransactionsTable() {
  const { transactions, role, addTransaction, deleteTransaction } = useDashboardStore();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [newTx, setNewTx] = useState({
    description: '',
    amount: '',
    category: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
  });

  const filteredTransactions = transactions.filter((t) =>
    t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTx.description || !newTx.amount || !newTx.category) return;

    addTransaction({
      id: Date.now(),
      description: newTx.description,
      amount: parseFloat(newTx.amount),
      category: newTx.category,
      type: newTx.type as 'income' | 'expense',
      date: newTx.date,
    });

    setNewTx({ ...newTx, description: '', amount: '', category: '' });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
      {/* Header & Search */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Receipt className="w-5 h-5 text-indigo-500" />
          Transaction History
        </h3>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all w-full sm:w-72 text-slate-800 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Admin Only: Add Transaction Form */}
      {role === 'Admin' && (
        <div className="bg-indigo-50/30 p-6 border-b border-slate-100">
          <h4 className="text-sm font-bold text-indigo-900 mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add New Transaction
          </h4>
          <form onSubmit={handleAddTransaction} className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-37.5">
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Description</label>
              <input type="text" required value={newTx.description} onChange={(e) => setNewTx({...newTx, description: e.target.value})} className="w-full p-2.5 bg-white border border-slate-200 text-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. Groceries" />
            </div>
            <div className="w-28">
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Amount</label>
              <input type="number" required min="0" step="0.01" value={newTx.amount} onChange={(e) => setNewTx({...newTx, amount: e.target.value})} className="w-full p-2.5 bg-white border border-slate-200 text-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="0.00" />
            </div>
            <div className="w-36">
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Category</label>
              <input type="text" required value={newTx.category} onChange={(e) => setNewTx({...newTx, category: e.target.value})} className="w-full p-2.5 bg-white border border-slate-200 text-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. Food" />
            </div>
            <div className="w-32">
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Type</label>
              <select title='type' value={newTx.type} onChange={(e) => setNewTx({...newTx, type: e.target.value})} className="w-full p-2.5 bg-white border border-slate-200 text-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer">
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <button type="submit" className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm hover:shadow active:scale-95">
              Add Entry
            </button>
          </form>
        </div>
      )}

      {/* Transactions List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/50 text-slate-500 font-semibold border-b border-slate-100">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-right">Amount</th>
              {role === 'Admin' && <th className="px-6 py-4 text-center">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={role === 'Admin' ? 5 : 4} className="px-6 py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Receipt className="w-8 h-8 opacity-20" />
                    <p>No transactions found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-slate-500">{tx.date}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{tx.description}</td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-medium">
                      {tx.category}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-right font-bold whitespace-nowrap ${tx.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </td>
                  {role === 'Admin' && (
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => deleteTransaction(tx.id)}
                        className="text-slate-300 hover:text-rose-500 transition-colors p-1 rounded-md hover:bg-rose-50"
                        title="Delete Transaction"
                      >
                        <Trash2 className="w-4 h-4 mx-auto" />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}