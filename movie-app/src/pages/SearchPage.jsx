// src/pages/SearchPage.jsx
import { useState, useEffect, useRef } from 'react';
import { searchMovies, getPopularMovies } from '../api/tmdb';
import MovieGrid from '../components/MovieGrid';

const HISTORY_KEY = 'movieapp_search_history';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    } catch {
      return [];
    }
  });
  const timeoutRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    getPopularMovies().then((d) => setPopular(d.results?.slice(0, 12) || []));
  }, []);

  const saveHistory = (term) => {
    const updated = [term, ...history.filter((h) => h.toLowerCase() !== term.toLowerCase())].slice(0, 8);
    setHistory(updated);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  const handleSearch = async (val) => {
    if (!val.trim()) {
      setMovies([]);
      return;
    }
    try {
      setLoading(true);
      const data = await searchMovies(val);
      setMovies(data.results || []);
      saveHistory(val.trim());
    } catch {
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => handleSearch(val), 400);
  };

  const handleHistoryClick = (term) => {
    setQuery(term);
    handleSearch(term);
  };

  const showResults = query.trim().length > 0;

  return (
    <div className="search-page">
      <div className="search-header">
        <div className="search-input-wrap">
          <span className="search-icon-inner">🔍</span>
          <input
            ref={inputRef}
            type="text"
            className="search-input search-input-page"
            placeholder="Search movies, genres..."
            value={query}
            onChange={handleChange}
          />
          {query && (
            <button className="search-clear" onClick={() => { setQuery(''); setMovies([]); }}>
              ✕
            </button>
          )}
        </div>
      </div>

      {!showResults && (
        <>
          {history.length > 0 && (
            <section className="search-section">
              <div className="section-header">
                <h3 className="section-title">Recent Searches</h3>
                <button className="clear-btn" onClick={clearHistory}>Clear</button>
              </div>
              <div className="history-chips">
                {history.map((term) => (
                  <button key={term} className="history-chip" onClick={() => handleHistoryClick(term)}>
                    🕐 {term}
                  </button>
                ))}
              </div>
            </section>
          )}

          <section className="search-section">
            <h3 className="section-title">Popular Right Now</h3>
            <MovieGrid movies={popular} loading={false} />
          </section>
        </>
      )}

      {showResults && (
        <section className="search-section">
          <h3 className="section-title">
            {loading ? 'Searching...' : `Results for "${query}"`}
          </h3>
          <MovieGrid movies={movies} loading={loading} />
        </section>
      )}
    </div>
  );
};

export default SearchPage;