import React from 'react'
import { Flex } from 'antd'
import PropTypes from 'prop-types'

import Movie from './Movie/Movie.jsx'
import './movieList.css'

export default function MovieList({ movies, loading }) {
  const movieList = movies.map((mov) => {
    return <Movie key={mov.id} movie={mov} loading={loading} />
  })

  return (
    <Flex gap={36} wrap justify="space-between">
      {movieList}
    </Flex>
  )
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
}
