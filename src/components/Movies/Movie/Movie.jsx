import React from 'react'
import { Flex, Typography, Card, Image, Skeleton } from 'antd'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

import './movie.css'
import MovieRate from './MovieRate/MovieRate.jsx'
import Genres from './Genres/Genres.jsx'
import Rating from './Rating/Rating.jsx'

export default function LoadedMovie({ loading, movie }) {
  const { overview, release_date: date, poster_path, title, vote_average: rating, genre_ids: genreIDs } = movie
  const notFoundOverview = 'This movie has no description.'
  const notFoundDate = 'Release date is not found'
  const notFoundImage = 'https://deichman.no/api/images/resize/800/cover-images/1677149663144745634a459dee9182d.jpg'
  const poster = `https://image.tmdb.org/t/p/original/${poster_path}`

  return (
    <Card className="movie" size="default" loading={loading}>
      <Skeleton loading={loading} active>
        <Flex className="movie__wrapper">
          <Image className="movie__cover" alt="Movie cover" src={poster} fallback={notFoundImage} />
          <Flex className="movie__info" vertical gap={7}>
            <Typography.Title className="movie__title" level={3}>
              {title}
            </Typography.Title>
            <span className="movie__release-date">{date ? format(date, 'PPP') : notFoundDate}</span>
            <Genres genreIDs={genreIDs} />
            <Typography.Text className="movie__overview">{overview ? overview : notFoundOverview}</Typography.Text>
            <MovieRate movie={movie} />
          </Flex>
          <Rating rating={rating} />
        </Flex>
      </Skeleton>
    </Card>
  )
}

LoadedMovie.propTypes = {
  loading: PropTypes.bool.isRequired,
  movie: PropTypes.object.isRequired,
}
