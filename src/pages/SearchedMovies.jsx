import React, {useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom'

const API_KEY = 'YOUR_TMDB_API_KEY' // Use your TMDB API Key

// 1. Declare search URL variable globally so test cases can find it
export const searchMoviesURL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US`

export default function SearchedMovies() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    if (query) {
      // Fixed: Replaced MOVIE_NAME with query, and page=1 with page=${page}
      fetch(`${searchMoviesURL}&query=${query}&page=${page}`)
        .then(res => res.json())
        .then(data => {
          setMovies(data.results || [])
          setTotalPages(data.total_pages > 500 ? 500 : data.total_pages)
        })
        .catch(err => console.error('Error fetching searched movies:', err))
    }
  }, [query, page])

  return (
    <div className="container">
      <h2>Search Results for "{query}"</h2>
      <div className="movie-grid" style={{marginTop: '1.5rem'}}>
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            {/* HTML image element with src as poster_path */}
            <img src={movie.poster_path} alt={movie.title} />

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
