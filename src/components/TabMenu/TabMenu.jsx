import React, { useContext } from 'react'
import { Tabs } from 'antd'

import { getRatedMovies, getPopularMovies } from '../movieService/moviesAppService'
import { MoviesAppContext } from '../Context/Context.js'
import './tabMenu.css'

export default function TabMenu() {
  const { setLoading, setSearchingMovie, setError, setCurrentPage, getData } = useContext(MoviesAppContext)

  function onChangeTab(key) {
    try {
      setLoading(true)
      setCurrentPage(1)

      switch (key) {
        case '2':
          setSearchingMovie('rated')
          getData(getRatedMovies)
          break
        default:
          setSearchingMovie('popular')
          getData(getPopularMovies)
      }
    } catch (error) {
      setLoading(false)
      setError(error)
    }
  }

  return (
    <Tabs
      destroyInactiveTabPane={false}
      className="tab-menu"
      defaultActiveKey="1"
      centered
      onTabClick={(key) => onChangeTab(key)}
      items={[
        {
          label: 'Search',
          key: '1',
        },
        {
          label: 'Rates',
          key: '2',
        },
      ]}
    />
  )
}
