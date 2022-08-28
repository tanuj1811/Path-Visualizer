import React from 'react'
import './symbol.scss'
import { FaAngleRight } from 'react-icons/fa'
import { GiTargeted } from 'react-icons/gi'


const Symbol = () => {
  return (
    <div >
      <ul>
        <li>
          <div className="symbol">
            <div className="icon">{getIcon(0)}</div>
            <span> Source Point </span>
          </div>
        </li>
        <li>
          <div className="symbol">
            <div className="icon">{getIcon(1 )}</div>
            <span> Target Point </span>
          </div>
        </li>
        <li>
          <div className="symbol">
            <div className="icon shortestPath"></div>
            <span> Shortest Path Node </span>
          </div>
        </li>
        <li>
          <div className="symbol">
            <div className="icon visited"></div>
            <span> Visited Node </span>
          </div>
        </li>
        <li>
          <div className="symbol">
            <div className="icon unvisited"></div>
            <span> unvisited Node </span>
          </div>
        </li>
        <li>
          <div className="symbol">
            <div className="icon wall"></div>
            <span> Walls </span>
          </div>
        </li>
      </ul>
    </div>
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

export default Symbol
