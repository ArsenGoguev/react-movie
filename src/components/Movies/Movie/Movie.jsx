import React from 'react'
import { Flex, Typography, Card, Tag, Image, Skeleton } from 'antd'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

import './movie.css'
import MovieRate from './MovieRate/MovieRate.jsx'

export default function LoadedMovie({ loading, movie }) {
  const { overview, release_date: date, poster_path, title, id: movieID } = movie
  let description = overview
  const notFoundImage = 'https://deichman.no/api/images/resize/800/cover-images/1677149663144745634a459dee9182d.jpg'
  const poster = `https://image.tmdb.org/t/p/original/${poster_path}`

  return (
    <Card className="movie" size="default" loading={loading}>
      <Skeleton loading={loading} active>
        <Flex gap={20}>
          <Image className="movie__cover" alt="Movie cover" src={poster} fallback={notFoundImage} />
          <Flex className="movie__info" vertical gap={7}>
            <Typography.Title className="movie__title" level={3}>
              {title}
            </Typography.Title>
            <span className="movie__release-date">{date ? format(date, 'PPP') : `Release date is not found`}</span>

            <Flex wrap>
              <Tag className="movie__genre">Genre</Tag>
            </Flex>

            <Typography.Text className="movie__overview">
              {description ? description : 'This movie has no description'}
            </Typography.Text>
            <MovieRate movieID={movieID} />
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
