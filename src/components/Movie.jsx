import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Movie = ({ movie, isFavorite, onToggleFavorite }) => {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  return (
    <div style={{ position: 'relative' }}>
      {/* Star button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          onToggleFavorite(movie);
        }}
        className="star-button"
      >
        {isFavorite ? <i className="bi bi-star-fill"></i> : <i className="bi bi-star"></i>}
      </button>

      {/* Movie card with link to details */}
      <Link to={`/movie/${movie.id}`}>
        <div className="movie-card">
          <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
          <h3>{movie.title}</h3>
        </div>
      </Link>
    </div>
  );
};

export default Movie;
