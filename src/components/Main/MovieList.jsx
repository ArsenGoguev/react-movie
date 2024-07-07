import React from 'react'
import { Flex } from 'antd'
import PropTypes from 'prop-types'
import { Alert } from 'antd'

import Movie from './Movie/Movie.jsx'
import './movieList.css'

export default function MovieList({ movies, loading, error }) {
  const movieList = movies.map((mov) => {
    return <Movie key={mov.id} movie={mov} loading={loading} />
  })

  if (error) return <Alert type="error" message={error.message} description="Error! Something is wrong." />
  return (
    <Flex gap={36} wrap justify="space-between">
      {movieList}
    </Flex>
  )
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.any,
}
