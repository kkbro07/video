
'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0 bg-background w-full">
        <Link href="/" className="mr-6 flex items-center space-x-2">
           <Film className="h-8 w-8 text-accent" />
            <span className="font-black text-2xl tracking-tighter sm:inline-block">
              CineStream
            </span>
        </Link>
        <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
             <Link
              href="/"
              onClick={() => setOpen(false)}
              className="font-medium text-muted-foreground transition-colors hover:text-white text-lg"
            >
              Home
            </Link>
            <Link
              href="/recommendations"
               onClick={() => setOpen(false)}
              className="font-medium text-muted-foreground transition-colors hover:text-white text-lg"
            >
              Recommendations
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
