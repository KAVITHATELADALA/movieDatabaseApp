import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

const API_KEY = 'YOUR_TMDB_API_KEY'
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export default function MovieDetails() {
  const {id} = useParams()
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])

  useEffect(() => {
    // Fetch Movie Details
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
    )
      .then(res => res.json())
      .then(data => setMovie(data))

    // Fetch Cast Details
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
    )
      .then(res => res.json())
      .then(data => setCast(data.cast || []))
  }, [id])

  if (!movie) return <div className="container">Loading...</div>

  return (
    <div className="container">
      {/* Movie Details Section */}
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          marginBottom: '3rem',
        }}
      >
        <img
          src={`${IMG_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          style={{width: '300px', borderRadius: '8px'}}
        />
        <div>
          <h1>{movie.title}</h1>
          <p>
            <strong>Rating:</strong> ⭐ {movie.vote_average}
          </p>
          <p>
            <strong>Duration:</strong> {movie.runtime} mins
          </p>
          <p>
            <strong>Genres:</strong> {movie.genres?.map(g => g.name).join(', ')}
          </p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
        </div>
      </div>

      {/* Cast Details Section */}
      <h2>Cast Details</h2>
      <div className="movie-grid" style={{marginTop: '1rem'}}>
        {cast.slice(0, 12).map(person => (
          <div key={person.cast_id || person.credit_id} className="movie-card">
            <img
              src={
                person.profile_path
                  ? `${IMG_BASE_URL}${person.profile_path}`
                  : 'https://via.placeholder.com/200x300?text=No+Image'
              }
              alt={person.name}
              style={{height: '250px'}}
            />
            <div className="movie-info">
              <h3>{person.name}</h3>
              <p>Character: {person.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
