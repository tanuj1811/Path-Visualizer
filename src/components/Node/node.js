import React from 'react'
import './node.scss'

import { FaAngleRight } from 'react-icons/fa'
import { GiTargeted } from 'react-icons/gi'

const Node = (props) => {
  const {
    col,
    isTarget,
    isSource,
    isWall,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    row,
  } = props

  const classes = isTarget
    ? 'node-target'
    : isSource
    ? 'node-source'
    : isWall
    ? 'wall'
    : ''
    return (
        <div
          id={`node-${row}-${col}`}
          className={`node ${classes}`}
          onMouseDown={() => onMouseDown(row, col)}
          onMouseEnter={() => onMouseEnter(row, col)}
          onMouseUp={() => onMouseUp()}>{isSource? getIcon(0) : isTarget ? getIcon(1) : ''}</div>
      )
}

function getIcon(x) {
  switch (x) {
    case 0:
      return <FaAngleRight />
    case 1:
      return <GiTargeted />
    default:
      return ''
  }
}

export default Node
