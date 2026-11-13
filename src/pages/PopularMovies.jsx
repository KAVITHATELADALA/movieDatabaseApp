import React, {useEffect, useState} from 'react'
import MovieCard from '../components/MovieCard'

const API_KEY = 'YOUR_TMDB_API_KEY'

export default function PopularMovies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
        )

        const data = await response.json()

        console.log('Popular movies:', data)

        setMovies(data.results || [])
      } catch (error) {
        console.error('Error fetching movies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  if (loading) return <h2>Loading movies...</h2>

  return (
    <div className="movies-container">
      <h2>Popular</h2>

      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
