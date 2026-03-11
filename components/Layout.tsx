import React, { ReactNode, useState } from 'react';
import Head from 'next/head';
import SearchBar from './SearchBar';
import { LineChart, Search, User } from 'lucide-react';
import Link from 'next/link';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export default function Layout({ children, title = 'Investment App' }: LayoutProps) {
  return (
    <div className="min-h-screen bg-rhDark text-white font-sans flex flex-col">
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Top Header Navigation */}
      <header className="fixed top-0 w-full z-50 bg-rhDark border-b border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-rhGreen hover:text-green-400 transition-colors">
            <LineChart className="w-8 h-8" />
            <span className="text-xl font-bold tracking-tight hidden sm:block">InvestApp</span>
          </Link>

          <div className="flex-1 max-w-xl mx-8">
            <SearchBar />
          </div>

          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold">
              <Link href="#" className="hover:text-rhGreen transition-colors">Invest</Link>
              <Link href="#" className="hover:text-rhGreen transition-colors">Crypto</Link>
              <Link href="#" className="hover:text-rhGreen transition-colors">Cash</Link>
            </nav>
            <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 mt-16 max-w-7xl mx-auto w-full px-4 py-8">
        {children}
      </main>
    </div>
  );
}
