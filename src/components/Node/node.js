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
  let extraClasses = isWall ? 'wall' : ''
  extraClasses += isSource || isTarget ? 'source-node': ''

    return (
        <span
          id={`node-${row}-${col}`}
          className={`node ${extraClasses}`}
          onMouseDown={() => onMouseDown(row, col)}
          onMouseEnter={() => onMouseEnter(row, col)}
          onMouseUp={() => onMouseUp()}>
          {isSource? getIcon(0) :''}
          {isTarget ? getIcon(1) : ''}
        </span>
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
