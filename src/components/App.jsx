import React, { useState, useEffect } from 'react'

import './app.css'

import Tabs from './Header/Tabs.jsx'
import SearchBar from './Header/SearchBar.jsx'
import MovieList from './Main/MovieList.jsx'
import Footer from './Footer/Footer.jsx'

export default function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [totalMovies, setTotalMovies] = useState()

  async function getMovies(query) {
    let res
    if (query && !query.startsWith(' ')) {
      res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1&api_key=8a8be1fee5490beecdd49d89d9208916`
      )
    } else {
      res = await fetch(
        'https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1&api_key=8a8be1fee5490beecdd49d89d9208916'
      )
    }
    if (!res.ok) {
      throw new Error(`Error ${res.status}`)
    }
    const body = await res.json()
    setTotalMovies(body.total_results)
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
      <SearchBar getMovies={getMovies} setLoading={setLoading} />
      <MovieList movies={movies} loading={loading} error={error} />
      <Footer totalMovies={totalMovies} />
    </div>
  )
}
