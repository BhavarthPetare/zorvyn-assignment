import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialTransactions } from '../lib/mockData';


// 1. Define the exact shape of a single transaction
export interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  type: 'income' | 'expense';
  amount: number;
}

// 2. Define the shape of your entire Zustand store
interface DashboardState {
  transactions: Transaction[];
  role: 'Viewer' | 'Admin';
  toggleRole: () => void;
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: number) => void;

  theme: 'light' | 'dark';
  toggleTheme: () => void;

  toast: { message: string; type: 'success' | 'error' | null };
  showToast: (message: string, type: 'success' | 'error') => void;
  hideToast: () => void;
}

// 3. Pass the DashboardState interface into the create function
export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      transactions: initialTransactions as Transaction[],
      role: 'Viewer',
      theme: 'light',
      toast: {message: '', type: null},
      
      toggleRole: () => set((state) => ({ 
        role: state.role === 'Viewer' ? 'Admin' : 'Viewer' 
      })),
      
      addTransaction: (newTransaction) => set((state) => ({
        transactions: [newTransaction, ...state.transactions]
      })),

      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter(t => t.id !== id)
      })),

      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
      })),

      showToast: (message, type) => {
        set({ toast: { message, type } });
        setTimeout(() => {
          set({ toast: { message: '', type: null } });
        }, 3000);
      },
      hideToast: () => set({ toast: { message: '', type: null } }),
    }),
    {
      name: 'finance-dashboard-storage',
    }
  )
);