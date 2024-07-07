import React, { useState, useEffect } from 'react'

import './app.css'

import Tabs from './Header/Tabs.jsx'
import MovieList from './Main/MovieList.jsx'
import Footer from './Footer/Footer.jsx'

export default function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  async function getMovies() {
    const res = await fetch(
      'https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1&api_key=8a8be1fee5490beecdd49d89d9208916'
    )
    const body = await res.json()
    const result = await body.results
    setMovies([...result])
    setLoading(!loading)
  }

  useEffect(() => {
    getMovies()
  }, []) // eslint-disable-line

  return (
    <div className="movies-app">
      <Tabs />
      <MovieList movies={movies} loading={loading} />
      <Footer />
    </div>
  )
}
