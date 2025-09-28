
export type Media = {
    id: string;
    title: string;
    description: string;
    thumbnail: string; // URL to the thumbnail image
    mediaType: 'movie' | 'series';
    genres: string[];
    releaseYear: number;
    cast: string[];
    seasons?: {
        seasonNumber: number;
        episodes: {
            episodeNumber: number;
            title: string;
            description: string;
            thumbnail: string;
        }[];
    }[];
};
