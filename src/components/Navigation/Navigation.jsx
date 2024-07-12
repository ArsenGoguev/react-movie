import React from 'react'
import { Pagination, ConfigProvider } from 'antd'
import PropTypes from 'prop-types'

import { searchMovies, getPopularMovies } from '../movieService/movieService'

export default function Navigation({
  totalPages,
  setLoading,
  searchingMovie,
  setError,
  setTotalPages,
  setMovies,
  setCurrentPage,
  currentPage,
}) {
  function getMoviesByPage(page) {
    if (searchingMovie) {
      setCurrentPage(page)
      setLoading(true)
      searchMovies(searchingMovie, page)
        .then((json) => {
          setTotalPages(json.total_pages)
          setMovies([...json.results])
          setLoading(false)
        })
        .catch((err) => setError(err))
    } else {
      setCurrentPage(page)
      getPopularMovies(page)
        .then((res) => {
          setTotalPages(res.total_pages)
          const result = res.results
          setMovies([...result])
          setLoading(false)
        })
        .catch((err) => setError(err))
    }
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ffffff',
        },
        components: {
          Pagination: {
            itemActiveBg: '#1890FF',
            itemActiveColor: 'white',
          },
        },
      }}
    >
      <Pagination
        current={currentPage}
        defaultCurrent={1}
        hideOnSinglePage
        pageSize={1}
        total={totalPages}
        align="center"
        showSizeChanger={false}
        onChange={(page) => getMoviesByPage(page)}
      />
    </ConfigProvider>
  )
}

Navigation.propTypes = {
  totalPages: PropTypes.number,
  searchingMovie: PropTypes.string,
  setLoading: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setTotalPages: PropTypes.func.isRequired,
  setMovies: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
}
