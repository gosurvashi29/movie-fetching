import React, { useState, useEffect, useCallback } from 'react';

export default function MovieManager() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({ title: '', openingText: '', releaseDate: '' });
  const [isLoading, setLoading] = useState(false);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://your-api.com/movies');
      const data = await res.json();
      setMovies(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const addMovie = async e => {
    e.preventDefault();
    try {
      const res = await fetch('https://your-api.com/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Failed to add');
      const newMovie = await res.json();
      setMovies(prev => [...prev, newMovie]);
      setForm({ title: '', openingText: '', releaseDate: '' });
    } catch (e) {
      console.error(e);
    }
  };

  const deleteMovie = async id => {
    try {
      const res = await fetch(`https://your-api.com/movies/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setMovies(prev => prev.filter(m => m.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { fetchMovies(); }, [fetchMovies]);

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h2>Movie Manager</h2>
      <form onSubmit={addMovie} style={{ marginBottom: 20 }}>
        <input name="title" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
        <input name="openingText" placeholder="Opening Text" value={form.openingText} onChange={e => setForm({...form, openingText: e.target.value})} />
        <input name="releaseDate" placeholder="Release Date" value={form.releaseDate} onChange={e => setForm({...form, releaseDate: e.target.value})} />
        <button type="submit">Add Movie</button>
      </form>

      {isLoading ? <p>Loading...</p> : (
        <ul>
          {movies.map(m => (
            <li key={m.id || m._id} style={{ marginBottom: 8 }}>
              {m.title} ({m.releaseDate})
              <button onClick={() => deleteMovie(m.id || m._id)} style={{ marginLeft: 10 }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
