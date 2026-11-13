import React from 'react'
import {Link} from 'react-router-dom'

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500'

export default function MovieCard({movie}) {
  return 
    <div className="movie-card">
      <img
        src={
          movie.poster_path
            ? `${IMG_BASE_URL}${movie.poster_path}`
            : 'https://placehold.co/500x750?text=No+Image'
        }
        alt={movie.title}
      />

      <div className="movie-info">
        <h3>{movie.title}</h3>

        <p>Rating: ⭐ {movie.vote_average}</p>

        <Link to={`/movie/${movie.id}`}>
          <button>View Details</button>
        </Link>
      </div>
    </div>
  )
}
