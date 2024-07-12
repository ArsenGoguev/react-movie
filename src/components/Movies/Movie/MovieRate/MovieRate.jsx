import React from 'react'
import { ConfigProvider, Rate } from 'antd'
import './movieRate.css'
import PropTypes from 'prop-types'

import { setMovieRating } from '../../../movieService/movieService'

export default function MovieRate({ movieID }) {
  return (
    <ConfigProvider theme={{ token: { marginXS: 3 } }}>
      <Rate className="movie__stars" allowHalf count={10} onChange={(value) => setMovieRating(value, movieID)} />
    </ConfigProvider>
  )
}

MovieRate.propTypes = {
  movieID: PropTypes.any,
}
