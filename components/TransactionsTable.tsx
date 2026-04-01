'use client';

import { useState } from 'react';
import { useDashboardStore } from '../store/useDashboardStore';
import { Search, Trash2, Plus } from 'lucide-react';

export default function TransactionsTable() {
  const { transactions, role, addTransaction, deleteTransaction } = useDashboardStore();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Local state for the "Add Transaction" form
  const [newTx, setNewTx] = useState({
    description: '',
    amount: '',
    category: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0], // Today's date as default YYYY-MM-DD
  });

  // Filter logic: Check if description or category matches the search term
  const filteredTransactions = transactions.filter((t) =>
    t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTx.description || !newTx.amount || !newTx.category) return;

    addTransaction({
      id: Date.now(), // Simple unique ID generator
      description: newTx.description,
      amount: parseFloat(newTx.amount),
      category: newTx.category,
      type: newTx.type as 'income' | 'expense',
      date: newTx.date,
    });

    // Reset form
    setNewTx({ ...newTx, description: '', amount: '', category: '' });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header & Search */}
      <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800 w-4 h-4" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-800 text-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Admin Only: Add Transaction Form */}
      {role === 'Admin' && (
        <div className="bg-gray-50 p-6 border-b border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add New Transaction
          </h4>
          <form onSubmit={handleAddTransaction} className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-37.5">
              <label className="block text-xs text-gray-800 mb-1">Description</label>
              <input title='description' type="text" required value={newTx.description} onChange={(e) => setNewTx({...newTx, description: e.target.value})} className="w-full p-2 border border-gray-300 text-gray-800 rounded-md text-sm" />
            </div>
            <div className="w-24">
              <label className="block text-xs text-gray-800 mb-1">Amount</label>
              <input title='amount' type="number" required min="0" step="0.01" value={newTx.amount} onChange={(e) => setNewTx({...newTx, amount: e.target.value})} className="w-full p-2 border border-gray-300 text-gray-800 rounded-md text-sm" />
            </div>
            <div className="w-32">
              <label className="block text-xs text-gray-800 mb-1">Category</label>
              <input title='category' type="text" required value={newTx.category} onChange={(e) => setNewTx({...newTx, category: e.target.value})} className="w-full p-2 border border-gray-300 text-gray-800 rounded-md text-sm" />
            </div>
            <div className="w-28">
              <label className="block text-xs text-gray-800 mb-1">Type</label>
              <select title='type' value={newTx.type} onChange={(e) => setNewTx({...newTx, type: e.target.value})} className="w-full p-2 border border-gray-300 text-gray-800 rounded-md text-sm bg-white">
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              Add
            </button>
          </form>
        </div>
      )}

      {/* Transactions List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3 text-right">Amount</th>
              {role === 'Admin' && <th className="px-6 py-3 text-center">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={role === 'Admin' ? 5 : 4} className="px-6 py-8 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            ) : (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">{tx.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{tx.description}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                      {tx.category}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-right font-medium whitespace-nowrap ${tx.type === 'income' ? 'text-green-600' : 'text-gray-900'}`}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </td>
                  {/* Admin Only: Delete Button */}
                  {role === 'Admin' && (
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => deleteTransaction(tx.id)}
                        className="text-red-400 hover:text-red-600 transition-colors"
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