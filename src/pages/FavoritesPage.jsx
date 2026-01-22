import { useEffect, useState } from 'react';
import Movie from '../components/Movie';

const PAGE_SIZE = 12;

const FavoritesPage = ({ favorites, toggleFavorite }) => {
  const [favPage, setFavPage] = useState(1);

  const totalFavPages = Math.max(1, Math.ceil(favorites.length / PAGE_SIZE));
  const start = (favPage - 1) * PAGE_SIZE;
  const visible = favorites.slice(start, start + PAGE_SIZE);

  // If items removed and page is out of range, snap back
  useEffect(() => {
    if (favPage > totalFavPages) {
      setFavPage(totalFavPages);
    }
  }, [favorites.length, favPage, totalFavPages]);

  return (
    <div className="movie-container">
      <h1>My Favorite Movies</h1>
      <p>Total favorites: {favorites.length}</p>

      {favorites.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '18px', marginTop: '50px' }}>
          No favorites yet. Start adding movies!
        </p>
      ) : (
        <>
          <div className="movie-list">
            {visible.map((movie) => (
              <Movie
                key={movie.id}
                movie={movie}
                isFavorite={true}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>

          <div className="pagination">
            <button disabled={favPage === 1} onClick={() => setFavPage(favPage - 1)}>
              Previous
            </button>
            <span className="page-indicator">
              Page {favPage} / {totalFavPages}
            </span>
            <button disabled={favPage === totalFavPages} onClick={() => setFavPage(favPage + 1)}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritesPage;