// src/components/SearchBar.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch, value = '' }) => {
  const [query, setQuery] = useState(value);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(value);
  }, [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (onSearch) {
        onSearch(val.trim());
      }
    }, 400);
  };

  const handleFocus = () => {
    navigate('/search');
  };

  return (
    <div className="search-container">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="search-input"
        placeholder="Search movies..."
        value={query}
        onChange={handleChange}
        onFocus={handleFocus}
      />
      {query && (
        <button
          className="search-clear"
          onClick={() => {
            setQuery('');
            if (onSearch) onSearch('');
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;