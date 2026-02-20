// src/pages/WatchlistPage.jsx
import { useNavigate } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import { IMG_BASE } from '../api/tmdb';

const WatchlistPage = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const navigate = useNavigate();

  return (
    <div className="watchlist-page">
      <div className="page-header">
        <h2 className="page-title">Watch List</h2>
        {watchlist.length > 0 && (
          <span className="watchlist-count">{watchlist.length} movies</span>
        )}
      </div>

      {watchlist.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔖</div>
          <p>Your watch list is empty</p>
          <span>Save movies to watch them later</span>
          <button className="explore-btn" onClick={() => navigate('/')}>
            Explore Movies
          </button>
        </div>
      ) : (
        <div className="watchlist-list">
          {watchlist.map((movie) => (
            <div
              key={movie.id}
              className="watchlist-item"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <div className="watchlist-poster">
                <img
                  src={`${IMG_BASE}${movie.poster_path}`}
                  alt={movie.title}
                  onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/100x150?text=No+Image'; }}
                />
              </div>
              <div className="watchlist-info">
                <h3 className="watchlist-title">{movie.title}</h3>
                <div className="watchlist-meta">
                  <span>⭐ {movie.vote_average?.toFixed(1) || 'N/A'}</span>
                  <span>📅 {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</span>
                  <span>⏱ {movie.runtime || 'N/A'} min</span>
                </div>
                <p className="watchlist-genre">
                  🎭 {movie.genres?.[0]?.name || 'N/A'}
                </p>
              </div>
              <button
                className="watchlist-remove"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWatchlist(movie.id);
                }}
                title="Remove from watchlist"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;