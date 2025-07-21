import React, { useState, useEffect, useCallback, useMemo } from 'react';

function MovieApp() {
  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({ title: '', openingText: '', releaseDate: '' });
  
  // fetch movies
  const fetchMovies = useCallback(async () => {
    try {
      const res = await fetch('https://swapi.dev/api/films');
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error('Fetch failed:', err);
    }
  }, []);
  
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);
  
  const movieTitles = useMemo(
    () => movies.map(m => m.title),
    [movies]
  );
  
  // form handlers
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);
  
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log({ ...formData });
    setFormData({ title: '', openingText: '', releaseDate: '' });
  }, [formData]);
  
  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          style={{ marginRight: 8 }}
        />
        <input
          name="openingText"
          placeholder="Opening Text"
          value={formData.openingText}
          onChange={handleChange}
          style={{ marginRight: 8 }}
        />
        <input
          name="releaseDate"
          placeholder="Release Date"
          value={formData.releaseDate}
          onChange={handleChange}
          style={{ marginRight: 8 }}
        />
        <button type="submit">Add Movie</button>
      </form>
      
      <button onClick={fetchMovies}>Fetch Movies</button>
      
      <ul>
        {movieTitles.map(title => <li key={title}>{title}</li>)}
      </ul>
    </div>
  );
}

export default MovieApp;
