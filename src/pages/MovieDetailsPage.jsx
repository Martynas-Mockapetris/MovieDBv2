import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const API_KEY = '53c258bb52d305146e19a71e58aa2cc5';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieDetailsPage = ({ favorites, toggleFavorite }) => {
  const { id } = useParams(); //gauti id is url
  const [filmas, setFilmas] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Format from minutes to "Xh Ym"
  const formatRuntime = (mins) => {
    if (!mins) return '—';
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

  // Fetch movie details when component mounts or id changes
  useEffect(() => {
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Movie details:', data);
        setFilmas(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!filmas) return <p>Movie not found</p>;

  // Extract relevant details
  const year = filmas.release_date ? filmas.release_date.slice(0, 4) : '—';
  const runtime = formatRuntime(filmas.runtime);
  const rating = filmas.vote_average ? filmas.vote_average.toFixed(1) : '—';
  const genres = filmas.genres || [];
  const posterUrl = filmas.poster_path ? `${IMAGE_BASE_URL}${filmas.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image';
  const isFavorite = favorites?.some((fav) => fav.id === filmas.id);

  return (
    <div className="details-hero">
      <button className="details-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="details-card">
        <div className="details-poster">
          <img src={posterUrl} alt={filmas.title} />
        </div>

        <div className="details-info">
          <h1 className="details-title">{filmas.title}</h1>
          <div className="details-subline">
            <span>{year}</span>
            <span>•</span>
            <span>{runtime}</span>
            <span>•</span>
            <span>⭐ {rating}/10</span>
          </div>

          <div className="genre-badges">
            {genres.map((g) => (
              <span key={g.id} className="genre-badge">
                {g.name}
              </span>
            ))}
          </div>

          <div className="details-overview">
            <h3>Overview</h3>
            <p>{filmas.overview}</p>
          </div>

          <div className="details-chips">
            <span className="detail-chip">Release: {filmas.release_date || '—'}</span>
            <span className="detail-chip">Votes: {filmas.vote_count ?? 0}</span>
            {filmas.status && <span className="detail-chip">{filmas.status}</span>}
          </div>
          <button className="details-fav-button" onClick={() => toggleFavorite(filmas)} title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
            {isFavorite ? <i className="bi bi-star-fill"></i> : <i className="bi bi-star"></i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
