import React from 'react'
import { Form, Input } from 'antd'
import './searchBar.css'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'

export default function SearchBar({ getMovies, setLoading }) {
  const onInput = debounce((value) => {
    setLoading(true)
    getMovies(value)
  }, 500)

  return (
    <Form className="search-bar">
      <Input placeholder="Type to search..." onChange={(e) => onInput(e.target.value)} />
    </Form>
  )
}

SearchBar.propTypes = {
  getMovies: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
}
