import React, { useContext } from 'react'
import { Flex, Tag } from 'antd'
import PropTypes from 'prop-types'
import './genres.css'

import { MoviesAppContext } from '../../../Context/Context.js'

export default function Genres({ genreIDs }) {
  const { genres } = useContext(MoviesAppContext)

  const elements = genreIDs.map((id) => {
    const genre = genres.find((genre) => genre.id === id)

    return (
      <Tag key={id} className="movie__genre">
        {genre ? genre.name : 'Unknown'}
      </Tag>
    )
  })

  return (
    <Flex gap={3} wrap>
      {elements}
    </Flex>
  )
}

Genres.propTypes = {
  genreIDs: PropTypes.array.isRequired,
}
