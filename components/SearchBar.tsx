"use client";

import React from "react";
import { Input } from "components/ui/input";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  isCompact?: boolean; // NOVA PROP
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  placeholder = "Digite o que deseja...",
  isCompact = false, // DEFAULT
}) => {
  if (isCompact) {
    return (
      <button
        className="p-2 rounded-full bg-[#5A9BF6] dark:bg-blue-400 text-white hover:bg-blue-600 dark:hover:bg-blue-500 shadow"
        title="Pesquisar"
      >
        <FaSearch size={16} />
      </button>
    );
  }

  return (
    <div className="relative w-full max-w-md self-start">
      <FaSearch
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A9BF6] dark:text-blue-400"
        size={16}
      />
      <Input
        type="text"
        value={searchQuery}
        onChange={onSearchChange}
        placeholder={placeholder}
        className="pl-10 py-3 rounded-full bg-[#E2EAF8] dark:bg-slate-800 text-[#5A9BF6] dark:text-white placeholder:text-[#5A9BF6] dark:placeholder:text-blue-300 shadow-sm border-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[#5A9BF6] dark:focus-visible:ring-blue-400"
      />
    </div>
  );
};

export default SearchBar;
