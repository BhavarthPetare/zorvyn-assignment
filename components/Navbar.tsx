'use client';

import { useDashboardStore } from '../store/useDashboardStore';
import { Shield, User, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const { role, toggleRole } = useDashboardStore();

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md text-white">
          <LayoutDashboard className="w-5 h-5" />
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-slate-800 to-slate-600">
          FinanceFlow
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 bg-slate-100 rounded-full text-slate-600">
          {role === 'Admin' ? <Shield className="w-4 h-4 text-indigo-600" /> : <User className="w-4 h-4 text-slate-400" />}
          <span>{role}</span>
        </div>
        
        <button
          onClick={toggleRole}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-all shadow-sm hover:shadow active:scale-95"
        >
          Switch to {role === 'Viewer' ? 'Admin' : 'Viewer'}
        </button>
      </div>
    </nav>
  );
}