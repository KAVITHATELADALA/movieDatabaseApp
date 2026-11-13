import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const API_KEY = 'YOUR_TMDB_API_KEY' // Replace with your TMDB API Key

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({type, page = 1}) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}&language=en-US&page=${page}`,
    )
    const data = await res.json()
    return {
      results: data.results || [],
      totalPages: data.total_pages > 500 ? 500 : data.total_pages,
    }
  },
)

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async ({query, page = 1}) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
        query,
      )}&page=${page}`,
    )
    const data = await res.json()
    return {
      results: data.results || [],
      totalPages: data.total_pages > 500 ? 500 : data.total_pages,
    }
  },
)

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async arg => {
    const id = typeof arg === 'object' ? arg.id : arg
    const resMovie = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
    )
    const movie = await resMovie.json()
    const resCredits = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
    )
    const credits = await resCredits.json()
    return {movie, cast: credits.cast || []}
  },
)

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    searchResults: [],
    movieDetails: null,
    cast: [],
    status: 'idle',
    page: 1,
    totalPages: 1,
    searchPage: 1,
    searchTotalPages: 1,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, state => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchMovies.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        list: action.payload.results,
        totalPages: action.payload.totalPages,
      }))
      .addCase(searchMovies.pending, state => ({
        ...state,
        status: 'loading',
      }))
      .addCase(searchMovies.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        searchResults: action.payload.results,
        searchTotalPages: action.payload.totalPages,
      }))
      .addCase(fetchMovieDetails.pending, state => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchMovieDetails.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        movieDetails: action.payload.movie,
        cast: action.payload.cast,
      }))
  },
})

export default movieSlice.reducer
