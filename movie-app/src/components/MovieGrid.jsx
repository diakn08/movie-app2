// src/components/MovieGrid.jsx
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, loading, error }) => {
  if (loading) {
    return (
      <div className="grid-skeleton">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="skeleton-card" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state">
        <div className="empty-icon">⚠️</div>
        <p>Failed to load movies</p>
        <span>{error}</span>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🎬</div>
        <p>No movies found</p>
      </div>
    );
  }

  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;