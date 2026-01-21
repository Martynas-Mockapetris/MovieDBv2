import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import { useState, useEffect } from 'react';

function App() {
  // State to manage favorite movies
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  )

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites]);

  // Function to add or remove a movie from favorites
  const toggleFavorite = (movie) => {
    // Check if movie is already in favorites
    if (favorites.find(fav => fav.id === movie.id)) {
      setFavorites(favorites.filter(fav => fav.id !== movie.id));
    // If not, add it to favorites
    } else {
      setFavorites([...favorites, movie]);
    }
  }

  return (
    <Router>
      {/* Navigation bar */}
      <nav
        style={{
          padding: '20px',
          backgroundColor: '#333',
          display: 'flex',
          gap: '20px'
        }}
      >
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          Home
        </Link>
        <Link to="/favorites" style={{ color: 'white', textDecoration: 'none' }}>
          Favorites ({favorites.length})
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<MoviesPage favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route path="/favorites" element={<FavoritesPage favorites={favorites} toggleFavorite={toggleFavorite} />} />
      </Routes>
    </Router>
  );
}

export default App;
