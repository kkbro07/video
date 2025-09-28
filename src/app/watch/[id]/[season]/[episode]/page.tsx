import { notFound } from 'next/navigation';
import Link from 'next/link';
import { movies, type Series } from '@/lib/movies';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { VideoPlayer } from '@/components/video-player';

type WatchEpisodePageProps = {
  params: { 
    id: string;
    season: string;
    episode: string;
  };
};

export function generateMetadata({ params }: WatchEpisodePageProps) {
  const series = movies.find((m) => m.id === params.id && m.mediaType === 'series') as Series | undefined;
  const season = series?.seasons.find(s => s.season === parseInt(params.season));
  const episode = season?.episodes.find(e => e.episode === parseInt(params.episode));

  if (!episode) {
    return { title: 'Episode Not Found' };
  }
  return {
    title: `Watching: ${series.title} S${params.season}E${params.episode} | CineStream`,
  };
}

export default function WatchEpisodePage({ params }: WatchEpisodePageProps) {
  const series = movies.find((m) => m.id === params.id && m.mediaType === 'series') as Series | undefined;
  const season = series?.seasons.find(s => s.season === parseInt(params.season));
  const episode = season?.episodes.find(e => e.episode === parseInt(params.episode));

  if (!series || !season || !episode) {
    notFound();
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="absolute top-4 left-4 z-[102]">
        <Button asChild variant="ghost" className="text-white bg-black/30 hover:bg-white/10 hover:text-white backdrop-blur-sm">
          <Link href={`/movie/${series.id}`}>
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to details
          </Link>
        </Button>
      </div>
      <VideoPlayer src={episode.videoUrl ?? '/video/video.mp4'} />
    </div>
  );
}
