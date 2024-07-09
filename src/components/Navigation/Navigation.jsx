import React from 'react'
import { Pagination, ConfigProvider } from 'antd'
import './navigation.css'
import PropTypes from 'prop-types'

export default function Navigation({ totalPages, getMovies, setLoading, searchingMovie }) {
  function getMoviesByPage(page) {
    setLoading(true)
    getMovies(searchingMovie + `&page=${page}`)
  }

  console.log(totalPages)
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
        className="pagination"
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
  getMovies: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
}

// сделать, чтобы при поиске по другому названию, пагинация переходила на 1
