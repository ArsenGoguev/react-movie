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

  const imgStyle = {
    display: 'block',
    width: 183,
    height: 280,
    borderRadius: 0,
    minHeight: '100%',
  }

  const cardStyle = {
    paddingTop: 0,
    boxShadow: '0px 4px 12px 0px #00000026',
    border: 0,
    borderRadius: 0,
    display: 'flex',
    width: 450,
    height: 280,
  }

  return (
    <Card style={cardStyle} size="default" cover={<img alt="Movie cover" src={posterLink} style={imgStyle} />}>
      <Flex vertical gap={7}>
        <Typography.Title level={3} style={{ margin: 0 }}>
          {title}
        </Typography.Title>
        <span style={{ fontSize: 12, color: '#827E7E' }}>
          {date ? format(date, 'PP') : `Release date is not found`}
        </span>
        <Flex>
          <Tag>Genre</Tag>
        </Flex>

        <Typography style={{ minWidth: 'auto', fontSize: 12 }}>
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
