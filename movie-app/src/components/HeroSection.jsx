// src/components/HeroSection.jsx
import { useNavigate } from 'react-router-dom';
import { IMG_BASE } from '../api/tmdb';
import { useMovies } from '../hooks/useMovies';
import { getPopularMovies } from '../api/tmdb';

const HeroSection = () => {
  const navigate = useNavigate();
  const { movies, loading } = useMovies(getPopularMovies);

  if (loading) {
    return (
      <div className="hero-section">
        <div className="hero-grid">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="hero-card skeleton-card" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="hero-section">
      <div className="hero-grid">
        {movies.slice(0, 6).map((movie) => (
          <div
            key={movie.id}
            className="hero-card"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <img
              src={`${IMG_BASE}${movie.poster_path}`}
              alt={movie.title}
              loading="lazy"
            />
            <div className="hero-card-overlay">
              <span className="hero-card-title">{movie.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;