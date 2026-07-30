'use client';

import { useState } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface SearchBarProps {
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Current search value */
  value: string;
  /** Callback when search value changes */
  onChange: (value: string) => void;
  /** Callback when search is submitted (Enter key or search button) */
  onSearch?: (value: string) => void;
  /** Whether search is in progress */
  isSearching?: boolean;
  /** Whether to show the search button */
  showSearchButton?: boolean;
  /** Whether to show the clear button */
  showClearButton?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Whether to auto-focus the input */
  autoFocus?: boolean;
  /** Debounce delay for onChange in milliseconds */
  debounceDelay?: number;
}

/**
 * Reusable search bar component
 * 
 * @example
 * <SearchBar
 *   placeholder="ابحث عن التقارير..."
 *   value={searchTerm}
 *   onChange={setSearchTerm}
 *   onSearch={handleSearch}
 *   isSearching={isSearching}
 * />
 */
export function SearchBar({
  placeholder = 'بحث...',
  value,
  onChange,
  onSearch,
  isSearching = false,
  showSearchButton = true,
  showClearButton = true,
  className,
  autoFocus = false,
  debounceDelay = 0,
}: SearchBarProps) {
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const handleChange = (newValue: string) => {
    if (debounceDelay > 0) {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      
      const timer = setTimeout(() => {
        onChange(newValue);
      }, debounceDelay);
      
      setDebounceTimer(timer);
    } else {
      onChange(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    onChange('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={cn('relative flex items-center gap-2', className)}>
      <div className="relative flex-1">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pr-10 pl-10"
          autoFocus={autoFocus}
          disabled={isSearching}
        />
        {showClearButton && value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
            onClick={handleClear}
            disabled={isSearching}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {showSearchButton && (
        <Button
          type="button"
          onClick={handleSearchClick}
          disabled={isSearching || !value}
          className="min-w-[80px]"
        >
          {isSearching ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              جاري البحث
            </>
          ) : (
            'بحث'
          )}
        </Button>
      )}
    </div>
  );
}
