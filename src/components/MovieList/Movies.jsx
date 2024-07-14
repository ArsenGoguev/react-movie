import React, { useContext, useEffect } from 'react'
import { Alert, Flex } from 'antd'

import { getPopularMovies } from '../../services/moviesAppService.js'
import { MoviesAppContext } from '../Context/Context.js'

import Movie from './Movie/Movie.jsx'

export default function Movies() {
  const { movies, loading, setError, getData } = useContext(MoviesAppContext)
  let movieList

  try {
    useEffect(() => {
      getData(getPopularMovies)
    }, []) // eslint-disable-line

    movieList = movies.map((mov) => {
      return <Movie key={mov.id} movie={mov} loading={loading} />
    })
  } catch (error) {
    setError(true)

    return (
      <Alert
        className="movie-list--error"
        type="error"
        message={error.message}
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
