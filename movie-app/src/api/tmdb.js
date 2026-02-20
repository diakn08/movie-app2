// src/api/tmdb.js

const API_KEY = '1cf50e6248dc270629e802686245c2c8';
const API_BASE = 'https://api.themoviedb.org/3';

export const IMG_BASE = 'https://image.tmdb.org/t/p/w500';
export const IMG_ORIGINAL = 'https://image.tmdb.org/t/p/original';

const fetchFromAPI = async (endpoint, params = '') => {
  const url = `${API_BASE}${endpoint}?api_key=${API_KEY}&language=en-US${params}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

export const getPopularMovies = (page = 1) =>
  fetchFromAPI('/movie/popular', `&page=${page}`);

export const getNowPlayingMovies = (page = 1) =>
  fetchFromAPI('/movie/now_playing', `&page=${page}`);

export const getUpcomingMovies = (page = 1) =>
  fetchFromAPI('/movie/upcoming', `&page=${page}`);

export const getTopRatedMovies = (page = 1) =>
  fetchFromAPI('/movie/top_rated', `&page=${page}`);

export const getMovieDetails = (movieId) =>
  fetchFromAPI(`/movie/${movieId}`, '&append_to_response=credits,videos');

export const searchMovies = (query, page = 1) =>
  fetchFromAPI('/search/movie', `&query=${encodeURIComponent(query)}&page=${page}`);

export const ENDPOINTS = {
  nowplaying: getNowPlayingMovies,
  upcoming: getUpcomingMovies,
  toprated: getTopRatedMovies,
  popular: getPopularMovies,
};
