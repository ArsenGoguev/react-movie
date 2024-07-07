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

  async function getMovies() {
    const res = await fetch(
      'https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=23&api_key=8a8be1fee5490beecdd49d89d9208916'
    )
    if (!res.ok) {
      throw new Error(`Error ${res.status}`)
    }
    const body = await res.json()
    const result = await body.results
    setMovies([...result])
    setLoading(!loading)
  }

  useEffect(() => {
    getMovies().catch((err) => {
      setError(err)
    })
  }, []) // eslint-disable-line

  return (
    <div className="movies-app">
      <Tabs />
      <SearchBar />
      <MovieList movies={movies} loading={loading} error={error} />
      <Footer />
    </div>
  )
}
