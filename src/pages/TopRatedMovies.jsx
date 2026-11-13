import React, {useEffect, useState} from 'react'

const API_KEY = 'YOUR_TMDB_API_KEY'
// Global variable required by test cases
export const topRatedMoviesURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`

export default function TopRatedMovies() {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetch(topRatedMoviesURL)
      .then(res => res.json())
      .then(data => {
        setMovies(data.results || [])
        setTotalPages(data.total_pages > 500 ? 500 : data.total_pages)
      })
      .catch(err => console.error('Error fetching top rated movies:', err))
  }, [page])

  return (
    <div className="container">
      <h2>Top Rated</h2>
      <div className="movie-grid" style={{marginTop: '1.5rem'}}>
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            {/* HTML image element with src as poster_path */}
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            {/* Element with text content as title */}
            <h3>{movie.title}</h3>

            {/* Element with text content as vote_average */}
            <p>{movie.vote_average}</p>

            {/* HTML button element with text content as "View Details" */}
            <button type="button">View Details</button>
          </div>
        ))}
      </div>
    </div>
  )
}
