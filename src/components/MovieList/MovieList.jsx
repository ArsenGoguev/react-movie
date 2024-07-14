import React, { useContext } from 'react'
import { Alert, Spin, Flex } from 'antd'

import { MoviesAppContext } from '../Context/Context.js'

import Movie from './Movie/Movie.jsx'
import './movieList.css'

export default function MovieList() {
  const { movies, error, searchingMovie, loading } = useContext(MoviesAppContext)

  const movieList = movies.map((mov) => <Movie key={mov.id} movie={mov} loading={loading} />)

  if (movies.length === 0 && !error) {
    if (searchingMovie === 'popular') {
      return <Spin fullscreen style={{ marginTop: 34, marginBottom: 34 }} size="large" tip="Loading data" />
    }
    return (
      <Alert
        className="movie-list--not-found"
        type="warning"
        message="No movies were found for your search"
        description="You may have entered the wrong movie title. Please try to enter a different title."
      />
    )
  }
  if (error) {
    return (
      <Alert
        className="movie-list--error"
        type="error"
        message={error.message ? error.message : 'Oops!'}
        description="Error! Something is wrong."
      />
    )
  }

  return (
    <Flex className="movie-list" wrap justify="space-between">
      {movieList}
    </Flex>
  )
}
