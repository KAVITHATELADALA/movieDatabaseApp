import {Component} from 'react'
import {Link} from 'react-router-dom'
import Pagination from '../Pagination'
import Header from '../Header'
import './index.css'

const API_KEY = '4be4d60370ee40eb32a5bbe1c7b75bc3'

class TopRatedMovies extends Component {
  state = {
    moviesList: [],
    page: 1,
    isLoading: true,
    error: '',
  }

  componentDidMount() {
    this.getMovies()
  }

  getMovies = async () => {
    const {page} = this.state

    this.setState({isLoading: true, error: ''})

    const getTopRatedMoviesURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`

    try {
      const response = await fetch(getTopRatedMoviesURL)

      if (!response.ok) {
        throw new Error('Unable to fetch movies')
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

  onChangePage = newPage => {
    if (newPage < 1) {
      return
    }

    this.setState({page: newPage}, this.getMovies)
  }

  render() {
    const {moviesList, page, isLoading, error} = this.state

    let content

    if (isLoading) {
      content = <p className="status-text">Loading...</p>
    } else if (error) {
      content = <p className="status-text">{error}</p>
    } else if (moviesList.length === 0) {
      content = <p className="status-text">No Movies Found</p>
    } else {
      content = (
        <ul className="movies-list">
          {moviesList.map(movie => (
            <li className="movie-card" key={movie.id}>
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
      )
    }

    return (
      <div className="movies-page">
        <Header />
        <h1 className="movies-heading">Top Rated</h1>

        {content}

        <Pagination page={page} onChangePage={this.onChangePage} />
      </div>
    )
  }
}

export default TopRatedMovies
