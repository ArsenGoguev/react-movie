import React, { useState, useEffect } from 'react'

import TabMenu from './TabMenu/TabMenu.jsx'
import SearchBar from './SearchBar/SearchBar.jsx'
import MovieList from './Movies/MovieList.jsx'
import Navigation from './Navigation/Navigation.jsx'
import { createGuestSession, getPopularMovies } from './movieService/movieService.js'
import './styles/app.css'

export default function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [totalPages, setTotalPages] = useState()
  const [searchingMovie, setSearchingMovie] = useState()
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    createGuestSession()
    getPopularMovies()
      .then((res) => {
        setTotalPages(res.total_pages)
        const result = res.results
        setMovies([...result])
        setLoading(false)
      })
      .catch((err) => setError(err))
  }, []) // eslint-disable-line

  return (
    <div className="movies-app">
      <TabMenu />
      <SearchBar
        setLoading={setLoading}
        setSearchingMovie={setSearchingMovie}
        setError={setError}
        setMovies={setMovies}
        setTotalPages={setTotalPages}
        setCurrentPage={setCurrentPage}
      />
      <MovieList movies={movies} loading={loading} error={error} />
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        setLoading={setLoading}
        searchingMovie={searchingMovie}
        setError={setError}
        setMovies={setMovies}
        setTotalPages={setTotalPages}
      />
    </div>
  )
}
