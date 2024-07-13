import React, { useContext } from 'react'
import { Pagination, ConfigProvider } from 'antd'

import { searchMovies, getPopularMovies, getRatedMovies } from '../movieService/moviesAppService'
import { MoviesAppContext } from '../Context/Context.js'

export default function Navigation() {
  const { totalPages, setLoading, searchingMovie, setCurrentPage, currentPage, error, getData } =
    useContext(MoviesAppContext)

  function getMoviesByPage(page) {
    setLoading(true)
    setCurrentPage(page)

    switch (searchMovies) {
      case 'rated':
        getData(getRatedMovies, page)
        break
      case 'popular':
        getData(getPopularMovies, page)
        break
      default:
        getData(searchMovies, searchingMovie, page)
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
        total={error ? 1 : totalPages}
        align="center"
        showSizeChanger={false}
        onChange={(page) => getMoviesByPage(page)}
      />
    </ConfigProvider>
  )
}
