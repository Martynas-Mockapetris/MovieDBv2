import { useState, useEffect } from 'react';
import Movie from '../components/Movie';

const API_KEY = '53c258bb52d305146e19a71e58aa2cc5';
const BASE_URL = 'https://api.themoviedb.org/3';

const MoviesPage = ({ favorites, toggleFavorite }) => {
  const [filmai, setFilmai] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    // Fetch popular movies on component mount
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=1`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Filmai:', data.results);
        setFilmai(data.results);
      });

    // Fetch movie genres
    fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Genres:', data.genres);
        setGenres(data.genres);
      });
  }, []);

  // Handle search input changes
  const handleSearch = (searchValue) => {
    console.log('Searching for:', searchValue);

    // Only search if user typed 2+ characters
    if (searchValue.length >= 2) {
      fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchValue}`)
        .then((res) => res.json())
        .then((data) => {
          console.log('Search results:', data.results);
          setFilmai(data.results);
        });
    } else if (searchValue.length === 0) {
      // If search is cleared, show popular movies again
      fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=1`)
        .then((res) => res.json())
        .then((data) => {
          setFilmai(data.results);
        });
    }
  };

  // Filter movies by selected genre
  const handleGenreFilter = (genreId) => {
    console.log('Filtering by genre:', genreId);

    if (genreId === '' || genreId === 0) {
      // If no genre selected, load popular movies
      fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=1`)
        .then((res) => res.json())
        .then((data) => {
          setFilmai(data.results);
        });
    } else {
      // Filter movies by genre ID
      fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log('Movies by genre:', data.results);
          setFilmai(data.results);
        });
    }
  };

  return (
    <div className="movie-container">
      <h1>Discover Movies</h1>

      {/* Search and filter controls */}
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(e.target.value);
          }}
          className="search-input"
        />

        {/* Genre filter dropdown */}
        <select
          value={selectedGenre}
          onChange={(e) => {
            const genreId = e.target.value;
            setSelectedGenre(genreId);
            handleGenreFilter(genreId);
          }}
          className="genre-select"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <p className="movie-count">Showing {filmai.length} movies</p>

      {/* Movie list */}
      <div className="movie-list">
        {filmai.map((filmas) => (
          <Movie key={filmas.id} movie={filmas} isFavorite={favorites.find((fav) => fav.id === filmas.id)} onToggleFavorite={toggleFavorite} />
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
