import React, { useContext } from 'react'
import { Alert, Spin } from 'antd'

import { MoviesAppContext } from '../Context/Context.js'

import Movies from './Movies.jsx'
import RatedMovies from './RatedMovies.jsx'
import './movieList.css'

export default function MovieList() {
  const { movies, error, searchingMovie } = useContext(MoviesAppContext)

  if (movies.length > 0) {
    if (searchingMovie === 'rated') {
      return <RatedMovies />
    } else {
      return <Movies />
    }
  } else if (movies.length === 0 && !error) {
    if (searchingMovie === 'popular') {
      return <Spin fullscreen style={{ marginTop: 34, marginBottom: 34 }} size="large" tip="Loading data" />
    } else {
      return (
        <Alert
          className="movie-list--not-found"
          type="warning"
          message={'No movies were found for your search'}
          description="You may have entered the wrong movie title. Please try to enter a different title."
        />
      )
    }
  }
}
