
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

export const movies: Media[] = [
    {
        "id": "1",
        "title": "Inception",
        "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        "thumbnail": "/thumbnails/inception.jpg",
        "mediaType": "movie",
        "genres": ["Action", "Adventure", "Sci-Fi"],
        "releaseYear": 2010,
        "cast": ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"]
    },
    {
        "id": "2",
        "title": "Breaking Bad",
        "description": "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
        "thumbnail": "/thumbnails/breaking-bad.jpg",
        "mediaType": "series",
        "genres": ["Crime", "Drama", "Thriller"],
        "releaseYear": 2008,
        "cast": ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
        "seasons": [
            {
                "seasonNumber": 1,
                "episodes": [
                    {
                        "episodeNumber": 1,
                        "title": "Pilot",
                        "description": "A high school chemistry teacher learns he has terminal cancer and decides to produce and sell meth to secure his family's future.",
                        "thumbnail": "/thumbnails/bb_s1e1.jpg"
                    },
                    {
                        "episodeNumber": 2,
                        "title": "Cat's in the Bag...",
                        "description": "Jesse and Walt have to dispose of the bodies of the drug dealers Walt killed.",
                        "thumbnail": "/thumbnails/bb_s1e2.jpg"
                    }
                ]
            }
        ]
    }
];
