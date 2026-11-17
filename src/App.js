import {Routes, Route, Navigate} from 'react-router-dom'
import PopularMovies from './components/PopularMovies'
import TopRatedMovies from './components/TopRatedMovies'
import UpcomingMovies from './components/UpcomingMovies'
import Search from './components/Search'
import MovieItemDetails from './components/MovieItemDetails'

const App = () => (
  <Routes>
    <Route path="/" element={<PopularMovies />} />
    <Route path="/top-rated" element={<TopRatedMovies />} />
    <Route path="/upcoming" element={<UpcomingMovies />} />
    <Route path="/search" element={<Search />} />
    <Route path="/movie/:id" element={<MovieItemDetails />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
)

export default App
