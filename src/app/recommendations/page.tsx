import { MovieCard } from '@/components/movie-card';
import { movies } from '@/lib/movies';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';

const fallbackImage: ImagePlaceholder = {
  id: 'fallback',
  imageUrl: 'https://picsum.photos/seed/fallback/500/750',
  description: 'Fallback movie poster',
  imageHint: 'movie poster'
}

export default function RecommendationsPage() {
  const recommendedMovies = movies.slice(0, 3);

  const getImage = (imageId: string) => {
    return PlaceHolderImages.find(img => img.id === imageId) ?? fallbackImage;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Top Recommendations</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {recommendedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} image={getImage(movie.imageId)} />
        ))}
      </div>
    </div>
  );
}
