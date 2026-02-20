import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WatchlistProvider } from './context/WatchlistContext';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import WatchlistPage from './pages/WatchlistPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <WatchlistProvider>
      <BrowserRouter>
        <div className="app">
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movie/:id" element={<DetailPage />} />
              <Route path="/watchlist" element={<WatchlistPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </BrowserRouter>
    </WatchlistProvider>
  );
}
export default App;
