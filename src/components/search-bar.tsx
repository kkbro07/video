'use client';

import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useCallback } from 'react';

import { Input } from '@/components/ui/input';

export function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = useCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    // For search, we want to navigate to the home page
    replace(`/?${params.toString()}`);
  }, [searchParams, replace]);

  const debouncedSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    const term = event.target.value;
    timeoutRef.current = setTimeout(() => {
      handleSearch(term);
    }, 300);
  };
  
  useEffect(() => {
    // Cleanup the timeout on component unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // When path changes, if we are not on the home page, we should clear the search
  useEffect(() => {
    if (pathname !== '/') {
      const input = document.querySelector('input[placeholder="Search movies, genres, actors..."]');
      if (input) {
        (input as HTMLInputElement).value = '';
      }
    }
  }, [pathname]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search movies, genres, actors..."
        className="w-full max-w-xs sm:max-w-sm pl-9 bg-black/20 border-white/30 focus:bg-black/50 focus:border-white"
        onChange={debouncedSearch}
        defaultValue={searchParams.get('query')?.toString() ?? ""}
      />
    </div>
  );
}
