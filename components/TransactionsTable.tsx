'use client';

import { useState } from 'react';
import { useDashboardStore } from '../store/useDashboardStore';
import { Search, Trash2, Plus, Receipt } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
      className="bg-card rounded-2xl border border-borderMain shadow-sm overflow-hidden mb-8"
    >
      {/* Header & Search */}
      <div className="p-6 border-b border-borderMain flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-textMain flex items-center gap-2">
          <Receipt className="w-5 h-5 text-indigo-500" />
          Transaction History
        </h3>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-4 h-4" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 bg-main border border-borderMain rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-full sm:w-72 text-textMain placeholder-muted"
          />
        </div>
      </div>

      {/* Admin Only: Add Transaction Form */}
      {role === 'Admin' && (
        <div className="bg-indigo-500/5 p-6 border-b border-borderMain">
          <h4 className="text-sm font-bold text-textMain mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-500" /> Add New Transaction
          </h4>
          <form onSubmit={handleAddTransaction} className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-37.5">
              <label className="block text-xs font-medium text-muted mb-1.5">Description</label>
              <input type="text" required value={newTx.description} onChange={(e) => setNewTx({...newTx, description: e.target.value})} className="w-full p-2.5 bg-card border border-borderMain text-textMain rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. Groceries" />
            </div>
            <div className="w-28">
              <label className="block text-xs font-medium text-muted mb-1.5">Amount</label>
              <input type="number" required min="0" step="0.01" value={newTx.amount} onChange={(e) => setNewTx({...newTx, amount: e.target.value})} className="w-full p-2.5 bg-card border border-borderMain text-textMain rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="0.00" />
            </div>
            <div className="w-36">
              <label className="block text-xs font-medium text-muted mb-1.5">Category</label>
              <input type="text" required value={newTx.category} onChange={(e) => setNewTx({...newTx, category: e.target.value})} className="w-full p-2.5 bg-card border border-borderMain text-textMain rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="e.g. Food" />
            </div>
            <div className="w-32">
              <label className="block text-xs font-medium text-muted mb-1.5">Type</label>
              <select title='type' value={newTx.type} onChange={(e) => setNewTx({...newTx, type: e.target.value})} className="w-full p-2.5 bg-card border border-borderMain text-textMain rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer">
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <button type="submit" className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm hover:shadow active:scale-95 w-full sm:w-auto">
              Add Entry
            </button>
          </form>
        </div>
      )}

      {/* --- MOBILE VIEW: Card Layout --- */}
      <div className="block md:hidden divide-y divide-borderMain bg-card">
        {filteredTransactions.length === 0 ? (
          <div className="py-12 text-center text-muted flex flex-col items-center justify-center gap-2">
            <Receipt className="w-8 h-8 opacity-20" />
            <p>No transactions found.</p>
          </div>
        ) : (
          filteredTransactions.map((tx) => (
            <div key={tx.id} className="p-5 hover:bg-main/50 transition-colors flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-textMain">{tx.description}</span>
                <div className="flex items-center gap-2 text-xs font-medium text-muted">
                  <span>{tx.date}</span>
                  <span className="w-1 h-1 rounded-full bg-borderMain"></span>
                  <span className="text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-md">{tx.category}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className={`font-bold ${tx.type === 'income' ? 'text-emerald-500' : 'text-textMain'}`}>
                  {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                </span>
                
                {role === 'Admin' && (
                  <button 
                    onClick={() => deleteTransaction(tx.id)}
                    className="text-muted hover:text-rose-500 transition-colors p-2 bg-main rounded-lg hover:bg-rose-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* --- DESKTOP VIEW: Table Layout --- */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm text-textMain">
          <thead className="bg-main/50 text-muted font-semibold border-b border-borderMain">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-right">Amount</th>
              {role === 'Admin' && <th className="px-6 py-4 text-center">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-borderMain">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={role === 'Admin' ? 5 : 4} className="px-6 py-12 text-center text-muted">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Receipt className="w-8 h-8 opacity-20" />
                    <p>No transactions found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-main/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-muted font-medium">{tx.date}</td>
                  <td className="px-6 py-4 font-bold text-textMain">{tx.description}</td>
                  <td className="px-6 py-4">
                    <span className="bg-main text-textMain px-2.5 py-1 rounded-md text-xs font-semibold border border-borderMain">
                      {tx.category}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-right font-bold whitespace-nowrap ${tx.type === 'income' ? 'text-emerald-500' : 'text-textMain'}`}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </td>
                  {role === 'Admin' && (
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => deleteTransaction(tx.id)}
                        className="text-muted hover:text-rose-500 transition-colors p-1.5 rounded-md hover:bg-rose-500/10"
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
    </motion.div>
  );
}