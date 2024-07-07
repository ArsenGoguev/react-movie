import React from 'react'
import './movie.css'
import { Flex, Typography, Card, Tag, Image, Skeleton } from 'antd'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

export default function LoadedMovie({ loading, movie }) {
  const { overview, release_date: date, poster_path: poster, title } = movie
  let description = overview

  if (overview.trim().length > 190) {
    description = overview.slice(0, 190) + '...'
  }

  return (
    <Card className="movie" size="default" loading={loading}>
      <Skeleton loading={loading} active>
        <Flex gap={20}>
          <Image
            className="movie__cover"
            alt="Movie cover"
            src={`https://image.tmdb.org/t/p/original/${poster}`}
            fallback="https://deichman.no/api/images/resize/800/cover-images/1677149663144745634a459dee9182d.jpg"
          />
          <Flex className="movie__info" vertical gap={7}>
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
        </Flex>
      </Skeleton>
    </Card>
  )
}

LoadedMovie.propTypes = {
  loading: PropTypes.bool.isRequired,
  movie: PropTypes.object.isRequired,
}
