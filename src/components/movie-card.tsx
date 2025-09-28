import Link from 'next/link';
import Image from 'next/image';
import type { Media } from '@/lib/movies';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { Card } from '@/components/ui/card';

type MovieCardProps = {
  movie: Media;
  image: ImagePlaceholder;
};

export function MovieCard({ movie, image }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`} className="group block" aria-label={`View details for ${movie.title}`}>
      <Card className="overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:scale-105 group-hover:border-accent group-hover:shadow-2xl group-hover:shadow-accent/30 bg-card">
        <div className="relative aspect-[2/3] bg-muted">
          <Image
            src={image.imageUrl}
            alt={`Poster for ${movie.title}`}
            data-ai-hint={image.imageHint}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
          />
           <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <h3 className="text-white text-center font-bold text-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{movie.title}</h3>
          </div>
        </div>
      </Card>
    </Link>
  );
}
