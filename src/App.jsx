import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import PopularMovies from './pages/PopularMovies'
import TopRatedMovies from './pages/TopRatedMovies'
import UpcomingMovies from './pages/UpcomingMovies'
import MovieDetails from './pages/MovieDetails'
import SearchedMovies from './pages/SearchedMovies'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PopularMovies />} />
        <Route path="/top-rated" element={<TopRatedMovies />} />
        <Route path="/upcoming" element={<UpcomingMovies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search" element={<SearchedMovies />} />
      </Routes>
    </>
  )
}
