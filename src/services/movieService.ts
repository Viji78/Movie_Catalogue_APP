import { Movie, MoviesResponse } from '../types';

const API_URL = 'https://api.sampleapis.com/movies/drama';

export const fetchMovies = async (): Promise<MoviesResponse> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: MoviesResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};