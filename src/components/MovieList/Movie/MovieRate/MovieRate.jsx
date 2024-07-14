import React, { useState } from 'react'
import { ConfigProvider, Rate } from 'antd'
import './movieRate.css'
import PropTypes from 'prop-types'

import { setMovieRating, deleteMovieRate } from '../../../../services/moviesAppService.js'

export default function MovieRate({ movie }) {
  const { id: movieID, rating } = movie
  const [rate, setRate] = useState(rating || (localStorage.getItem(movieID) ? localStorage.getItem(movieID) : 0))

  function onChangeRate(value) {
    if (value) {
      setRate(value)
      setMovieRating(value, movieID)
      localStorage.setItem(movieID, value)
    } else {
      setRate(0)
      deleteMovieRate(movieID)
      localStorage.removeItem(movieID, value)
    }
  }

  return (
    <ConfigProvider theme={{ token: { marginXS: 3 } }}>
      <Rate
        value={rate}
        className="movie__stars"
        allowHalf
        allowClear
        count={10}
        onChange={(value) => onChangeRate(value, movieID)}
      />
    </ConfigProvider>
  )
}

MovieRate.propTypes = {
  movie: PropTypes.object.isRequired,
}
