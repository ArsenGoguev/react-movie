import React, { useState, useEffect } from 'react'

import { MoviesAppContext } from './Context/Context.js'
import TabMenu from './TabMenu/TabMenu.jsx'
import SearchBar from './SearchBar/SearchBar.jsx'
import MovieList from './Movies/MovieList.jsx'
import Navigation from './Navigation/Navigation.jsx'
import { createGuestSession, getGenres, getPopularMovies } from './movieService/moviesAppService.js'
import './styles/app.css'

export default function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [totalPages, setTotalPages] = useState()
  const [searchingMovie, setSearchingMovie] = useState('popular')
  const [currentPage, setCurrentPage] = useState(1)
  const [genres, setGenres] = useState()

  function getData(func, ...args) {
    func(...args)
      .then((json) => {
        setTotalPages(json.total_pages)
        setMovies([...json.results])
        setLoading(false)
      })
      .catch((err) => setError(err))
  }

  const contextValue = {
    genres,
    movies,
    loading,
    error,
    totalPages,
    searchingMovie,
    currentPage,
    setMovies,
    setLoading,
    setError,
    setTotalPages,
    setSearchingMovie,
    setCurrentPage,
    getData,
  }

  useEffect(() => {
    if (!localStorage.getItem('guestSessionID')) {
      localStorage.clear()
      createGuestSession().catch((err) => setError(err))
    }
    getGenres()
      .then((json) => setGenres([...json.genres]))
      .catch((err) => setError(err))
    getData(getPopularMovies)
  }, []) // eslint-disable-line

  return (
    <MoviesAppContext.Provider value={contextValue}>
      <div className="movies-app">
        <TabMenu />
        <SearchBar />
        <MovieList />
        <Navigation />
      </div>
    </MoviesAppContext.Provider>
  )
}
