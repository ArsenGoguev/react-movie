import React, { useEffect, useState } from 'react'

import './app.css'

import Tabs from './Header/Tabs.jsx'
import MovieList from './Main/MovieList.jsx'
import Footer from './Footer/Footer.jsx'

export default function App() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1&api_key=8a8be1fee5490beecdd49d89d9208916'
    )
      .then((res) => {
        return res.json()
      })
      .then((json) => {
        const body = json.results
        return body
      })
      .then((body) => setMovies([...body]))
  }, [])

  return (
    <div className="movies-app">
      <Tabs />
      <MovieList movies={movies} />
      <Footer />
    </div>
  )
}
