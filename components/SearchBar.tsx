import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/router';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/stocks/${query.trim().toUpperCase()}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative group w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 group-hover:text-white transition-colors">
        <Search className="w-5 h-5" />
      </div>
      <input
        type="text"
        className="w-full bg-gray-800 border-none rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rhGreen focus:bg-gray-900 transition-all placeholder-gray-400"
        placeholder="Search for a symbol (e.g., AAPL, TSLA)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
