import { useState, useEffect } from 'react';
import Movie from '../components/Movie';

const API_KEY = '53c258bb52d305146e19a71e58aa2cc5';
const BASE_URL = 'https://api.themoviedb.org/3';

const MoviesPage = ({ favorites, toggleFavorite }) => {
  const [filmai, setFilmai] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  // Pagination + mode
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [mode, setMode] = useState('popular'); // 'popular' | 'search' | 'genre'
  const [lastQuery, setLastQuery] = useState('');
  const [lastGenre, setLastGenre] = useState('');

  // Fetch genres once
  useEffect(() => {
    fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setGenres(data.genres || []));
  }, []);

  // Fetch movies whenever mode/page/query/genre changes
  useEffect(() => {
    const fetchMovies = async () => {
      let url = '';

      if (mode === 'popular') {
        url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${currentPage}`;
      } else if (mode === 'search') {
        if (lastQuery.length < 2) return; // guard short queries
        url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(lastQuery)}&page=${currentPage}`;
      } else if (mode === 'genre') {
        if (!lastGenre) return;
        url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${lastGenre}&page=${currentPage}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setFilmai(data.results || []);
      // TMDB caps pages at 500; also guard missing total_pages
      setTotalPages(Math.max(1, Math.min(data.total_pages || 1, 500)));
    };

    fetchMovies();
  }, [mode, currentPage, lastQuery, lastGenre]);

  // Search handler
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.length >= 2) {
      setMode('search');
      setLastQuery(value);
      setCurrentPage(1);
    } else if (value.length === 0) {
      setMode('popular');
      setLastQuery('');
      setCurrentPage(1);
    }
  };

  // Genre filter handler
  const handleGenreFilter = (genreId) => {
    setSelectedGenre(genreId);
    if (!genreId) {
      setMode('popular');
      setLastGenre('');
      setCurrentPage(1);
    } else {
      setMode('genre');
      setLastGenre(genreId);
      setCurrentPage(1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="movie-container">
      <h1>Discover Movies</h1>

      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedGenre}
          onChange={(e) => handleGenreFilter(e.target.value)}
          className="genre-select"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>

      <p className="movie-count">
        Showing {filmai.length} movies • Page {currentPage} of {totalPages}
      </p>

      <div className="movie-list">
        {filmai.map((filmas) => (
          <Movie
            key={filmas.id}
            movie={filmas}
            isFavorite={favorites.find((fav) => fav.id === filmas.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>
          Previous
        </button>
        <span className="page-indicator">Page {currentPage} / {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MoviesPage;