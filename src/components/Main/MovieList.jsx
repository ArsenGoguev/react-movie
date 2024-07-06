import React from 'react'
import { Flex } from 'antd'
import PropTypes from 'prop-types'

import Movie from './Movie/Movie.jsx'
import './movieList.css'

export default function MovieList({ movies }) {
  const movieList = movies.map((mov) => {
    return (
      <Movie key={mov.id} overview={mov.overview} date={mov.release_date} poster={mov.poster_path} title={mov.title} />
    )
  })

  return (
    <Flex gap={36} wrap justify="space-between">
      {movieList}
    </Flex>
  )
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
}
