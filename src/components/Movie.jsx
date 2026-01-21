import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Movie = ({ movie, isFavorite, onToggleFavorite }) => {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  return (
    <div style={{ position: 'relative' }}>
      {/* Star button */}
      <button
        onClick={(e) => {
          e.preventDefault(); // Don't navigate to details
          onToggleFavorite(movie);
        }}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          borderRadius: '50%',
          width: '35px',
          height: '35px',
          cursor: 'pointer',
          fontSize: '18px',
          zIndex: 10
        }}
      >
        {isFavorite ? <i className="bi bi-star-fill" style={{ color: 'gold' }}></i> : <i className="bi bi-star"></i>}
      </button>

      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
        <div className="movie-card">
          <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
          <h3>{movie.title}</h3>
        </div>
      </Link>
    </div>
  );
};

export default Movie;
