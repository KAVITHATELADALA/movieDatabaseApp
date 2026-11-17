import {Component} from 'react'
import {useParams} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const API_KEY = '4be4d60370ee40eb32a5bbe1c7b75bc'

class MovieItemDetails extends Component {
  state = {
    movieDetails: {},
    castList: [],
    isLoading: true,
    error: '',
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    const {id} = this.props

    const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    const castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`

    try {
      const [movieResponse, castResponse] = await Promise.all([
        fetch(movieUrl),
        fetch(castUrl),
      ])

      if (!movieResponse.ok || !castResponse.ok) {
        throw new Error('Unable to fetch movie details')
      }

      const movieData = await movieResponse.json()
      const castData = await castResponse.json()

      this.setState({
        movieDetails: movieData,
        castList: castData.cast,
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
    const {movieDetails, castList, isLoading, error} = this.state

    if (isLoading) {
      return <p className="details-status">Loading...</p>
    }

    if (error) {
      return <p className="details-status">{error}</p>
    }

    return (
      <div className="details-page">
        <Header />

        <div className="details-container">
          {movieDetails.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
          )}

          <div>
            <h1>{movieDetails.title}</h1>
            <p>Rating: {movieDetails.vote_average}</p>
            <p>Duration: {movieDetails.runtime} minutes</p>
            <p>Release Date: {movieDetails.release_date}</p>

            <p>
              Genre: {movieDetails.genres?.map(genre => genre.name).join(', ')}
            </p>

            <h3>Overview</h3>
            <p>{movieDetails.overview}</p>
          </div>
        </div>

        <h2 className="cast-heading">Cast</h2>

        <ul className="cast-list">
          {castList.slice(0, 10).map(cast => (
            <li key={cast.id}>
              <img
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                    : 'https://via.placeholder.com/150x200?text=No+Image'
                }
                alt={cast.name}
              />

              <h4>{cast.name}</h4>
              <p>{cast.character}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const MovieItemDetailsWithParams = () => {
  const {id} = useParams()

  return <MovieItemDetails id={id} />
}

export default MovieItemDetailsWithParams
