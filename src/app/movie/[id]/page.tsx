import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { movies, type Series } from '@/lib/movies';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Tv } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type MovieDetailPageProps = {
  params: { id: string };
};

export async function generateMetadata({ params }: MovieDetailPageProps) {
  const media = movies.find((m) => m.id === params.id);
  if (!media) return { title: 'Media Not Found' };

  return {
    title: `${media.title} | CineStream`,
    description: media.description,
  };
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const media = movies.find((m) => m.id === params.id);
  if (!media) notFound();

  const image = PlaceHolderImages.find(img => img.id === media.imageId);
  const imageUrl = image?.imageUrl ?? 'https://picsum.photos/seed/fallback/500/750';
  const imageHint = image?.imageHint ?? 'movie poster';

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <div className="w-64 sm:w-80 md:w-full max-w-sm">
            <Image
              src={imageUrl}
              alt={`Poster for ${media.title}`}
              data-ai-hint={imageHint}
              width={500}
              height={750}
              className="rounded-lg shadow-2xl w-full"
              priority
            />
          </div>
        </div>
        <div className="flex-grow space-y-4 md:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline tracking-tight">{media.title}</h1>
          <div className="flex flex-wrap gap-2">
            {media.genres.map((genre) => (
              <Badge key={genre} variant="secondary" className="text-sm">{genre}</Badge>
            ))}
          </div>
          <p className="text-base sm:text-lg text-foreground/80">{media.description}</p>
          <div>
            <h2 className="text-xl font-semibold mb-2">Starring</h2>
            <p className="text-muted-foreground">{media.actors.join(', ')}</p>
          </div>
          <div className="pt-4">
            {media.mediaType === 'movie' ? (
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 focus-visible:ring-accent">
                <Link href={`/watch/${media.id}`}>
                  <PlayCircle className="mr-2 h-6 w-6" />
                  Play Movie
                </Link>
              </Button>
            ) : (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Tv className="h-6 w-6" />
                  Seasons & Episodes
                </h2>
                <Accordion type="single" collapsible className="w-full" defaultValue="season-1">
                  {(media as Series).seasons.map((season) => (
                    <AccordionItem value={`season-${season.season}`} key={season.season}>
                      <AccordionTrigger className="text-lg sm:text-xl font-medium">Season {season.season}</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-3">
                          {season.episodes.map((episode) => (
                            <li key={episode.episode}>
                              <Link href={`/watch/${media.id}/${season.season}/${episode.episode}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors duration-200 group">
                                <div className="flex items-start sm:items-center gap-4 flex-col sm:flex-row">
                                  <span className="text-lg font-semibold text-muted-foreground w-8 text-center flex-shrink-0">{episode.episode}</span>
                                  <div>
                                    <h4 className="font-semibold group-hover:text-accent-foreground">{episode.title}</h4>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1 sm:mt-0">{episode.description}</p>
                                  </div>
                                </div>
                                <PlayCircle className="h-6 w-6 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-4 flex-shrink-0" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
