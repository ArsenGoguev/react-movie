import React from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'

import { searchMovies, getPopularMovies } from '../movieService/movieService'

export default function SearchBar({
  setLoading,
  setSearchingMovie,
  setError,
  setMovies,
  setTotalPages,
  setCurrentPage,
}) {
  const getMoviesByQuery = debounce((value) => {
    setCurrentPage(1)
    setLoading(true)
    if (value && !value.startsWith(' ')) {
      setSearchingMovie(value)
      searchMovies(value)
        .then((json) => {
          setTotalPages(json.total_pages)
          const result = json.results
          setMovies([...result])
          setLoading(false)
        })
        .catch((err) => setError(err))
    } else {
      setSearchingMovie('')
      getPopularMovies()
        .then((res) => {
          setTotalPages(res.total_pages)
          const result = res.results
          setMovies([...result])
          setLoading(false)
        })
        .catch((err) => setError(err))
    }
  }, 500)

  return (
    <Form>
      <Input placeholder="Type to search..." onChange={(e) => getMoviesByQuery(e.target.value)} />
    </Form>
  )
}

SearchBar.propTypes = {
  setLoading: PropTypes.func.isRequired,
  setSearchingMovie: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setMovies: PropTypes.func.isRequired,
  setTotalPages: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
}
