import Movie from '../components/Movie';

const FavoritesPage = ({ favorites, toggleFavorite }) => {
  return (
    <div className="movie-container">
      <h1>My Favorite Movies</h1>
      <p>Total favorites: {favorites.length}</p>

      {favorites.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '18px', marginTop: '50px' }}>No favorites yet. Start adding movies!</p>
      ) : (
        <div className="movie-list">
          {favorites.map((movie) => (
            <Movie key={movie.id} movie={movie} isFavorite={true} onToggleFavorite={toggleFavorite} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
