
// Movie type from API
export interface Movie {
  id: number;
  title: string;
  posterURL: string;
  imdbId: string;
}

// Navigation types
export type RootStackParamList = {
  Login: undefined;
  MovieList: undefined;
  MovieDetailScreen: { movie: Movie };
};

export interface MovieListScreenProps {
  onLogout: () => void;
}

// Props for components
export interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
}

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}


// API Response types
export type MoviesResponse = Movie[];
