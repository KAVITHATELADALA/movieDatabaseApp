import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const API_KEY = '4be4d60370ee40eb32a5bbe1c7b75bc3'

class Search extends Component {
  state = {
    searchInput: '',
    moviesList: [],
    isLoading: false,
    error: '',
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchMovies = async event => {
    event.preventDefault()

    const {searchInput} = this.state

    if (searchInput.trim() === '') {
      return
    }

    this.setState({
      isLoading: true,
      error: '',
      moviesList: [],
    })

    const searchMoviesURL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      searchInput.trim(),
    )}`

    try {
      const response = await fetch(searchMoviesURL)

      if (!response.ok) {
        throw new Error('Unable to search movies')
      }

      const data = await response.json()

      this.setState({
        moviesList: data.results,
        isLoading: false,
      })
    } catch (error) {
      this.setState({
        error: error.message,
        isLoading: false,
      })
    }
  }

  render() {
    const {searchInput, moviesList, isLoading, error} = this.state

    return (
      <div className="search-page">
        <Header />

        <h1>Search Movies</h1>

        <form onSubmit={this.onSearchMovies}>
          <input
            type="search"
            value={searchInput}
            onChange={this.onChangeSearch}
            placeholder="Search your favourite movie"
          />

          <button type="submit">Search</button>
        </form>

        {isLoading && <p>Loading...</p>}

        {error && <p>{error}</p>}

        {!isLoading && !error && moviesList.length === 0 && (
          <p>No Movies Found</p>
        )}

        <ul className="search-movies-list">
          {moviesList.map(movie => (
            <li key={movie.id}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Image'
                }
                alt={movie.title}
              />

              <h3>{movie.title}</h3>

              <p>Rating: {movie.vote_average}</p>

              <Link to={`/movie/${movie.id}`}>
                <button type="button">View Details</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Search
