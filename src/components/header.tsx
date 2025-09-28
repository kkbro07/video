import Link from 'next/link';
import { Film } from 'lucide-react';
import { SearchBar } from './search-bar';
import { Button } from './ui/button';
import { MobileNav } from './mobile-nav';
import { Suspense } from 'react';

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full bg-gradient-to-b from-black/80 to-transparent transition-all duration-300">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Film className="h-8 w-8 text-accent" />
            <span className="font-black text-2xl tracking-tighter sm:inline-block">
              CineStream
            </span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
             <Link
              href="/"
              className="font-medium text-muted-foreground transition-colors hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/recommendations"
              className="font-medium text-muted-foreground transition-colors hover:text-white"
            >
              Recommendations
            </Link>
          </nav>
        </div>
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Suspense fallback={<div />}>
              <SearchBar />
            </Suspense>
          </div>
          <Button variant="destructive" size="sm">Sign In</Button>
        </div>
      </div>
    </header>
  );
}
