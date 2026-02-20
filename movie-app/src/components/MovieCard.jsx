// src/components/MovieCard.jsx
import { useNavigate } from 'react-router-dom';
import { IMG_BASE } from '../api/tmdb';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  if (!movie.poster_path) return null;

  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <img
        src={`${IMG_BASE}${movie.poster_path}`}
        alt={movie.title}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.parentElement.style.display = 'none';
        }}
      />
      <div className="movie-card-overlay">
        <span className="movie-rating">
          ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;