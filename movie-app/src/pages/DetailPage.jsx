// src/pages/DetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, IMG_BASE, IMG_ORIGINAL } from '../api/tmdb';
import { useWatchlist } from '../context/WatchlistContext';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="detail-page">
        <div className="detail-header">
          <button className="back-button" onClick={() => navigate(-1)}>‹</button>
          <span className="page-title">Detail</span>
          <div style={{ width: 40 }} />
        </div>
        <div className="detail-skeleton">
          <div className="skeleton-hero" />
          <div className="detail-content">
            <div className="skeleton-title" />
            <div className="skeleton-meta" />
            <div className="skeleton-text" />
            <div className="skeleton-text" />
            <div className="skeleton-text" style={{ width: '60%' }} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="detail-page">
        <div className="detail-header">
          <button className="back-button" onClick={() => navigate(-1)}>‹</button>
          <span className="page-title">Error</span>
          <div style={{ width: 40 }} />
        </div>
        <div className="empty-state">
          <div className="empty-icon">⚠️</div>
          <p>Failed to load movie details</p>
          <button className="retry-btn" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    );
  }

  const bookmarked = isInWatchlist(movie.id);
  const cast = movie.credits?.cast?.slice(0, 10) || [];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="tab-content">
            <p className="detail-description">{movie.overview || 'No description available.'}</p>
            {movie.genres?.length > 0 && (
              <div className="genres-list">
                {movie.genres.map((g) => (
                  <span key={g.id} className="genre-tag">{g.name}</span>
                ))}
              </div>
            )}
          </div>
        );
      case 'cast':
        return (
          <div className="tab-content cast-grid">
            {cast.length === 0 ? (
              <p className="detail-description">No cast information available.</p>
            ) : (
              cast.map((actor) => (
                <div key={actor.cast_id ?? actor.id} className="cast-item">
                  {actor.profile_path ? (
                    <img
                      src={`${IMG_BASE}${actor.profile_path}`}
                      alt={actor.name}
                      className="cast-avatar"
                    />
                  ) : (
                    <div className="cast-avatar cast-avatar-placeholder">👤</div>
                  )}
                  <p className="cast-name">{actor.name}</p>
                  <p className="cast-character">{actor.character}</p>
                </div>
              ))
            )}
          </div>
        );
      case 'reviews':
        return (
          <div className="tab-content">
            <p className="detail-description">Reviews feature coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="detail-page">
      <div className="detail-header">
        <button className="back-button" onClick={() => navigate(-1)}>‹</button>
        <span className="page-title">Detail</span>
        <button
          className={`bookmark-btn ${bookmarked ? 'active' : ''}`}
          onClick={() => toggleWatchlist(movie)}
          title={bookmarked ? 'Remove from watchlist' : 'Add to watchlist'}
        >
          {bookmarked ? '🔖' : '🏷️'}
        </button>
      </div>

      <div className="detail-hero">
        <img
          className="detail-backdrop"
          src={movie.backdrop_path ? `${IMG_ORIGINAL}${movie.backdrop_path}` : `${IMG_BASE}${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="detail-poster-wrap">
          <img
            className="detail-poster"
            src={`${IMG_BASE}${movie.poster_path}`}
            alt={movie.title}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
        <div className="detail-rating-badge">
          ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}
        </div>
      </div>

      <div className="detail-content">
        <h2 className="detail-title">{movie.title}</h2>
        <div className="detail-meta">
          <span className="meta-item">
            📅 {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
          </span>
          <span className="meta-divider">|</span>
          <span className="meta-item">
            ⏱ {movie.runtime || 'N/A'} min
          </span>
          <span className="meta-divider">|</span>
          <span className="meta-item">
            🎭 {movie.genres?.[0]?.name || 'Action'}
          </span>
        </div>

        <div className="detail-tabs">
          {['about', 'cast', 'reviews'].map((tab) => (
            <button
              key={tab}
              className={`detail-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {renderTabContent()}
      </div>
    </div>
  );
};

export default DetailPage;