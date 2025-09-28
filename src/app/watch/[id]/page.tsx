'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { movies } from '@/lib/movies';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { VideoPlayer } from '@/components/video-player';

export default function WatchPage() {
  const params = useParams<{ id: string }>();
  const media = movies.find((m) => m.id === params.id);

  if (!media || media.mediaType !== 'movie') {
    notFound();
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="absolute top-4 left-4 z-[102]">
        <Button asChild variant="ghost" className="text-white bg-black/30 hover:bg-white/10 hover:text-white backdrop-blur-sm">
          <Link href={`/movie/${media.id}`}>
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to details
          </Link>
        </Button>
      </div>
      <VideoPlayer src={media.videoUrl ?? '/video/video.mp4'} />
    </div>
  );
}
