// src/pages/HomePage.jsx
import { useState } from 'react';
import HeroSection from '../components/HeroSection';
import MovieGrid from '../components/MovieGrid';
import SearchBar from '../components/SearchBar';
import { useMovies } from '../hooks/useMovies';
import { ENDPOINTS } from '../api/tmdb';

const TABS = [
  { id: 'nowplaying', label: 'Now Playing' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'toprated', label: 'Top Rated' },
  { id: 'popular', label: 'Popular' },
];

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('nowplaying');

  const fetchFn = ENDPOINTS[activeTab];
  const { movies, loading, error } = useMovies(fetchFn, [activeTab]);

  return (
    <div className="home-page">
      <div className="header">
        <h1>What do you want to watch?</h1>
        <SearchBar />
      </div>

      <HeroSection />

      <div className="tabs-wrapper">
        <div className="tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="movies-container">
        <MovieGrid movies={movies} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default HomePage;