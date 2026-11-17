import {Component} from 'react'
import {useNavigate} from 'react-router-dom'
import Pagination from '../Pagination'
import Header from '../Header'
import './index.css'

const API_KEY = '4be4d60370ee40eb32a5bbe1c7b75bc3'

class PopularMovies extends Component {
  state = {
    moviesList: [],
    page: 1,
    totalPages: 1,
    isLoading: true,
    error: '',
  }

  componentDidMount() {
    this.getMovies()
  }

  getMovies = async () => {
    const {page} = this.state

    this.setState({
      isLoading: true,
      error: '',
    })

    const getPopularMoviesURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`

    try {
      const response = await fetch(getPopularMoviesURL)

      if (!response.ok) {
        throw new Error('Unable to fetch movies')
      }

      const data = await response.json()

      this.setState({
        moviesList: data.results || [],
        totalPages: data.total_pages || 1,
        isLoading: false,
        error: '',
      })
    } catch (error) {
      this.setState({
        error: error.message,
        isLoading: false,
        moviesList: [],
      })
    }
  }

  onChangePage = newPage => {
    const {page, totalPages, isLoading} = this.state

    if (newPage < 1 || newPage > totalPages || newPage === page || isLoading) {
      return
    }

    this.setState(
      {
        page: newPage,
      },
      this.getMovies,
    )
  }

  onClickViewDetails = id => {
    const {navigate} = this.props
    navigate(`/movie/${id}`)
  }

  render() {
    const {moviesList, page, totalPages, isLoading, error} = this.state

    let content = null

    if (isLoading) {
      content = <p className='status-text'>Loading...</p>
    } else if (error) {
      content = <p className='status-text'>{error}</p>
    } else if (moviesList.length === 0) {
      content = <p className='status-text'>No Movies Found</p>
    } else {
      content = (
        <ul className='movies-list'>
          {moviesList.map(movie => (
            <li className='movie-card' key={movie.id}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Image'
                }
                alt={movie.title}
              />

              <h3>{movie.title}</h3>

              <p>{movie.vote_average}</p>

              <button
                type='button'
                onClick={() => this.onClickViewDetails(movie.id)}
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
      )
    }

    return (
      <div className='movies-page'>
        <Header />

        <h1 className='movies-heading'>Popular</h1>

        {content}

        {!isLoading && !error && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onChangePage={this.onChangePage}
          />
        )}
      </div>
    )
  }
}

const PopularMoviesWithNavigate = props => {
  const navigate = useNavigate()

  return <PopularMovies {...props} navigate={navigate} />
}

export default PopularMoviesWithNavigate
