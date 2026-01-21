import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_KEY = '53c258bb52d305146e19a71e58aa2cc5';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieDetailsPage = () => {
  const { id } = useParams(); //gauti id is url
  const [filmas, setFilmas] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  return (
    <div className="movie-details">
      <button onClick={() => navigate(-1)}>Back</button>
      <div className="details-content">
        <img src={`${IMAGE_BASE_URL}${filmas.poster_path}`} alt={filmas.title} />

        <div className="details-info">
          <h1>{filmas.title}</h1>
          <p>
            <strong>Release Date:</strong> {filmas.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {filmas.vote_average}/10
          </p>
          <p>
            <strong>Overview:</strong> {filmas.overview}
          </p>
          <p>
            <strong>Runtime:</strong> {filmas.runtime} minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
