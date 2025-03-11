
import React, { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';

interface SearchFilterBarProps {
  onSearch: (query: string) => void;
  onFilter: (category: string) => void;
  filterOptions: { value: string; label: string }[];
  placeholder?: string;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  onSearch,
  onFilter,
  filterOptions,
  placeholder = "Search..."
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  const handleFilterSelect = (category: string) => {
    setActiveFilter(category === activeFilter ? null : category);
    onFilter(category === activeFilter ? '' : category);
    setShowFilterMenu(false);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-teams-secondarytext">
            <Search size={16} />
          </div>
          <input
            type="text"
            className="bg-teams-darkgray border border-teams-border text-teams-text w-full pl-10 pr-10 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-teams-accent"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery && (
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-teams-secondarytext hover:text-teams-text"
              onClick={handleClearSearch}
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="relative">
          <button
            className={`flex items-center space-x-1 bg-teams-darkgray border border-teams-border px-3 py-2 rounded-md hover:bg-teams-gray ${activeFilter ? 'text-teams-accent' : 'text-teams-secondarytext'}`}
            onClick={() => setShowFilterMenu(!showFilterMenu)}
          >
            <Filter size={16} />
            <span>Filter</span>
          </button>
          
          {showFilterMenu && (
            <div className="absolute right-0 mt-1 w-48 bg-teams-darkgray border border-teams-border rounded-md shadow-lg z-10 animate-fade-in">
              <div className="py-1">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-teams-gray ${activeFilter === option.value ? 'text-teams-accent' : 'text-teams-text'}`}
                    onClick={() => handleFilterSelect(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {activeFilter && (
        <div className="mt-2 flex items-center">
          <span className="text-xs text-teams-secondarytext mr-2">Filtered by:</span>
          <div className="flex items-center bg-teams-accent/10 text-teams-accent text-xs px-2 py-1 rounded">
            {filterOptions.find(o => o.value === activeFilter)?.label}
            <button className="ml-1" onClick={() => handleFilterSelect(activeFilter)}>
              <X size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilterBar;
