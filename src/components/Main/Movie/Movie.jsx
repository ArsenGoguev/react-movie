import React from 'react'
import './movie.css'
import { Flex, Typography, Card, Tag } from 'antd'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

export default function Movie({ overview, date, poster, title }) {
  let description = overview
  let posterLink = `https://image.tmdb.org/t/p/original`

  if (poster) {
    posterLink += `/${poster}`
  } else {
    posterLink = 'https://media.moddb.com/images/articles/1/73/72743/image_error_full.png'
  }

  if (overview.trim().length > 190) {
    description = overview.slice(0, 190) + '...'
  }

  return (
    <Card className="movie" size="default" cover={<img className="movie__cover" alt="Movie cover" src={posterLink} />}>
      <Flex vertical gap={7}>
        <Typography.Title className="movie__title" level={3}>
          {title}
        </Typography.Title>
        <span className="movie__release-date">{date ? format(date, 'PP') : `Release date is not found`}</span>
        <Flex>
          <Tag>Genre</Tag>
        </Flex>

        <Typography className="movie__overview">
          {description ? description : 'This movie has no description'}
        </Typography>
      </Flex>
    </Card>
  )
}

Movie.propTypes = {
  overview: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  poster: PropTypes.string,
  title: PropTypes.string.isRequired,
}
