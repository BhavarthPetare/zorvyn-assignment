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
      {/* Replaced hardcoded slate colors with dynamic variables */}
      <body className="bg-main text-textMain min-h-screen font-sans antialiased transition-colors duration-300">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}