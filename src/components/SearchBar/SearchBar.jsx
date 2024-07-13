import React, { useContext } from 'react'
import { Form, Input } from 'antd'
import { debounce } from 'lodash'

import { searchMovies, getPopularMovies } from '../movieService/moviesAppService'
import { MoviesAppContext } from '../Context/Context.js'

export default function SearchBar() {
  const { setLoading, setSearchingMovie, setCurrentPage, searchingMovie, getData } = useContext(MoviesAppContext)

  const getMoviesByQuery = debounce((value) => {
    setCurrentPage(1)
    setLoading(true)

    if (value && !value.startsWith(' ')) {
      setSearchingMovie(value)
      getData(searchMovies, value)
    } else {
      setSearchingMovie('popular')
      getData(getPopularMovies)
    }
  }, 500)

  if (searchingMovie === 'rated') {
    return null
  } else {
    return (
      <Form>
        <Input placeholder="Type to search..." onChange={(e) => getMoviesByQuery(e.target.value)} />
      </Form>
    )
  }
}
