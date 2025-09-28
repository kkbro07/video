export type Episode = {
  episode: number;
  title: string;
  description: string;
  videoUrl: string;
};

export type Season = {
  season: number;
  episodes: Episode[];
};

export type Movie = {
  mediaType: 'movie';
  id: string;
  title: string;
  description: string;
  genres: string[];
  actors: string[];
  imageId: string;
  videoUrl?: string;
};

export type Series = {
  mediaType: 'series';
  id: string;
  title: string;
  description: string;
  genres: string[];
  actors: string[];
  imageId: string;
  seasons: Season[];
};

export type Media = Movie | Series;


export const movies: Media[] = [
  {
    mediaType: 'series',
    id: '13',
    title: 'Alice in Borderland',
    description: 'A group of bored delinquents are transported to a parallel dimension where they must play a series of sadistic games to survive.',
    genres: ['Thriller', 'Sci-Fi', 'Action'],
    actors: ['Kento Yamazaki', 'Tao Tsuchiya', 'Nijiro Murakami'],
    imageId: 'movie_poster_13',
    seasons: [
      {
        season: 1,
        episodes: [
          { episode: 1, title: 'Episode 1', description: 'Arisu and his friends run from the police, only to find themselves in a deserted Tokyo. They are forced to play a deadly game to survive.', videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
          { episode: 2, title: 'Episode 2', description: 'The game of tag continues. Arisu must use his wits to save his friends and a mysterious woman named Usagi.', videoUrl: '/video/Alice_in_Borderland/s1/E2.mp4' },
        ]
      },
      {
        season: 2,
        episodes: [
          { episode: 1, title: 'Episode 1', description: 'The face card games begin. Arisu and his companions face the King of Spades.', videoUrl: '/video/Alice_in_Borderland/s2/E1.mp4' },
        ]
      }
    ]
  }
];
