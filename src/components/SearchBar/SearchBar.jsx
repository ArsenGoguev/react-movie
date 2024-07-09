import React from 'react'
import { Form, Input } from 'antd'
import './searchBar.css'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'

export default function SearchBar({ getMovies, setLoading, setSearchingMovie }) {
  const getMoviesByQuery = debounce((value) => {
    setLoading(true)
    if (value && !value.startsWith(' ')) {
      setSearchingMovie(`&query=${value}`)
      getMovies(`&query=${value}`)
    }
  }, 500)

  return (
    <Form className="search-bar">
      <Input placeholder="Type to search..." onChange={(e) => getMoviesByQuery(e.target.value)} />
    </Form>
  )
}

SearchBar.propTypes = {
  getMovies: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setSearchingMovie: PropTypes.func.isRequired,
}
