import {Link} from 'react-router-dom'
import Header from '../Header'
import PopularMovies from '../PopularMovies'

import './index.css'

const Home = () => (
  <div className="home-container">
    <Header />

    <div className="home-content">
      <h1>Welcome to Movie Database</h1>
      <p>Discover your favourite movies</p>

      <div className="home-links">
        <Link to="/popular">Popular Movies</Link>
        <Link to="/top-rated">Top Rated Movies</Link>
        <Link to="/upcoming">Upcoming Movies</Link>
        <Link to="/search">Search Movies</Link>
      </div>
    </div>
    <PopularMovies />
  </div>
)

export default Home
