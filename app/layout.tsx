import './globals.css';
import Navbar from '../components/Navbar';
import React from 'react';

export const metadata = {
  title: 'Finance Dashboard',
  description: 'A clean and interactive finance dashboard interface',
};

export default function RootLayout({ 
  children,
} : {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Explicitly forcing light mode colors to prevent Next.js default dark mode clashes */}
      <body className="bg-slate-50 min-h-screen font-sans text-slate-900 antialiased selection:bg-blue-200">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}