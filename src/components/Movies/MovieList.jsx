import React, { useContext } from 'react'
import { Flex } from 'antd'
import { Alert, Spin } from 'antd'

import { MoviesAppContext } from '../Context/Context.js'

import Movie from './Movie/Movie.jsx'
import './movieList.css'

export default function MovieList() {
  const { movies, loading, error, searchingMovie } = useContext(MoviesAppContext)

  const movieList = movies.map((mov) => {
    return <Movie key={mov.id} movie={mov} loading={loading} />
  })

  if (error) {
    return (
      <Alert
        className="movie-list--error"
        type="error"
        message={error.message}
        description="Error! Something is wrong."
      />
    )
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
  } else {
    return (
      <Flex className="movie-list" wrap justify="space-between">
        {movieList}
      </Flex>
    )
  }
}
