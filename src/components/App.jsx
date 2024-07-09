import React, { useState, useEffect } from 'react'

import './styles/app.css'

import Tabs from './Tabs/Tabs.jsx'
import SearchBar from './SearchBar/SearchBar.jsx'
import MovieList from './Movies/MovieList.jsx'
import Navigation from './Navigation/Navigation.jsx'

export default function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [totalPages, setTotalPages] = useState()
  const [searchingMovie, setSearchingMovie] = useState()
  const _apiLink =
    'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-EN&api_key=8a8be1fee5490beecdd49d89d9208916'

  async function getMovies(url) {
    let res
    if (!url) {
      setSearchingMovie('&query=return')
      res = await fetch(_apiLink + '&query=return')
    } else {
      res = await fetch(_apiLink + url)
    }
    if (!res.ok) throw new Error(`Error ${res.status}`)
    const body = await res.json()
    setTotalPages(body.total_pages)
    const result = await body.results
    setMovies([...result])
    setLoading(false)
  }

  useEffect(() => {
    getMovies().catch((err) => {
      setError(err)
    })
  }, []) // eslint-disable-line

  return (
    <div className="movies-app">
      <Tabs />
      <SearchBar getMovies={getMovies} setLoading={setLoading} setSearchingMovie={setSearchingMovie} />
      <MovieList movies={movies} loading={loading} error={error} />
      <Navigation
        totalPages={totalPages}
        getMovies={getMovies}
        setLoading={setLoading}
        searchingMovie={searchingMovie}
      />
    </div>
  )
}
