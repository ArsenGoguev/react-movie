import React, { useContext } from 'react'
import { Flex } from 'antd'
import { Alert } from 'antd'

import { MoviesAppContext } from '../Context/Context.js'

import Movie from './Movie/Movie.jsx'

export default function MovieList() {
  const { movies, loading, error } = useContext(MoviesAppContext)

  const movieList = movies.map((mov) => {
    return <Movie key={mov.id} movie={mov} loading={loading} />
  })

  if (error)
    return (
      <Alert
        style={{ marginTop: 34, marginBottom: 34 }}
        type="error"
        message={error.message}
        description="Error! Something is wrong."
      />
    )

  return (
    <Flex style={{ marginTop: 34, marginBottom: 34 }} gap={36} wrap justify="space-between">
      {movieList}
    </Flex>
  )
}
