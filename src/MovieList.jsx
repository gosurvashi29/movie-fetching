import React, { useState, useEffect, useCallback, useMemo } from 'react';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://swapi.dev/api/films');
      const json = await res.json();
      setMovies(json.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    fetchMovies(); 
  }, [fetchMovies]); 

  const movieTitles = useMemo(() =>
    movies.map((m) => m.title),
    [movies]
  ); 

  if (isLoading) return <p>Loading movies…</p>;

  return (
    <div>
      <button onClick={fetchMovies}>Refresh Movies</button>
      <ul>
        {movieTitles.map((title) => (
          <li key={title}>{title}</li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
