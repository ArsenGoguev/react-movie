import React from 'react'
import PropTypes from 'prop-types'
import './rating.css'

export default function Rating({ rating }) {
  let rateColor

  if (rating <= 3.0) {
    rateColor = '#E90000'
    // eslint-disable-next-line no-dupe-else-if
  } else if (rating <= 3.1 && rating >= 5.0) {
    rateColor = '#E97E00'
  } else if (rating <= 5.1 && rating >= 7.5) {
    rateColor = '#E9D100'
  } else if (rating > 7.5) {
    rateColor = '#66E900'
  }

  return (
    <div style={{ borderColor: rateColor }} className="movie__rating">
      <div className="movie__rating-num">{rating.toFixed(1)}</div>
    </div>
  )
}

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
}
