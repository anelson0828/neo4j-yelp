import axios from 'axios'
require('../../secrets')

export const SET_MOVIES = 'SET_MOVIES'

export const setMovies = movies => {
  return {type: SET_MOVIES, movies}
}

export const fetchMoviesThunk = () => {
  return async dispatch => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${
        process.env.TMDB_APIKEY
      }&language=en-US&page=1`
    )
    const movies = response.data.results
    dispatch(setMovies(movies))
  }
}

export default (movies = [], action) => {
  switch (action.type) {
    case SET_MOVIES:
      return action.movies
    default:
      return movies
  }
}
