'use client'; // Needed because we use useSearchParams hook

import { useSearchParams } from 'next/navigation';
import { movies } from '@/lib/movies';
import { MovieCard } from '@/components/movie-card';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';

const fallbackImage: ImagePlaceholder = {
  id: 'fallback',
  imageUrl: 'https://picsum.photos/seed/fallback/500/750',
  description: 'Fallback movie poster',
  imageHint: 'movie poster'
}

export default function Home() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('query') ?? '';

  const allMedia = movies;
  const featured = allMedia[0];
  const featuredImage = PlaceHolderImages.find(img => img.id === featured.imageId) ?? fallbackImage;

  const filteredMovies = allMedia.filter((movie) => {
    const searchableText = [
      movie.title,
      ...movie.genres,
      ...movie.actors,
    ].join(' ').toLowerCase();
    return searchableText.includes(query.toLowerCase());
  });

  const getImage = (imageId: string) => {
    return PlaceHolderImages.find(img => img.id === imageId) ?? fallbackImage;
  }

  if (filteredMovies.length === 0 && query) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24 text-center text-muted-foreground mt-20">
        <p className="text-2xl font-semibold">No movies found for "{query}"</p>
        <p className="mt-2">Try searching for something else or clear the search.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      {!query && featured && (
         <div className="relative h-[50vh] sm:h-[60vh] md:h-[80vh] w-full mb-12">
           <div className="absolute inset-0">
             <Image
               src={featuredImage.imageUrl}
               alt={`Poster for ${featured.title}`}
               fill
               className="object-cover"
               priority
               data-ai-hint={featuredImage.imageHint}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
             <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
           </div>
           <div className="relative z-10 flex flex-col justify-end h-full container mx-auto px-4 py-8 md:p-8 lg:p-12">
             <div className="max-w-xl">
               <h1 className="text-3xl sm:text-4xl md:text-6xl font-black font-headline tracking-tighter mb-4 text-white">
                 {featured.title}
               </h1>
               <p className="text-sm md:text-base text-white/80 line-clamp-2 sm:line-clamp-3 mb-6">
                 {featured.description}
               </p>
               <div className="flex flex-col sm:flex-row gap-4">
                 <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:ring-accent">
                   <Link href={`/movie/${featured.id}`}>
                     <PlayCircle className="mr-2 h-6 w-6" />
                     Play
                   </Link>
                 </Button>
                  <Button asChild size="lg" variant="secondary" className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
                   <Link href={`/movie/${featured.id}`}>
                     More Info
                   </Link>
                 </Button>
               </div>
             </div>
           </div>
         </div>
      )}
      
      {/* Movie Grid */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">{query ? `Search Results for "${query}"` : 'Trending Now'}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {(query ? filteredMovies : allMedia).map((movie) => (
            <MovieCard key={movie.id} movie={movie} image={getImage(movie.imageId)} />
          ))}
        </div>
      </div>
    </div>
  );
}
