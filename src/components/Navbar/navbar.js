import React, { useContext, useState } from 'react'
import './navbar.scss'

import { GridContext } from '../../context/gridContext'
import { visualizeDijkstra, visualizeDFS } from '../../algorithms'
import pattern1 from '../../patterns/pattern1'
import { FaAngleDown } from 'react-icons/fa'

const Navbar = () => {
  const {
    grid,
    startNodeIdx,
    finishNodeIdx,
    setGrid,
    initializeGrid,
  } = useContext(GridContext)
  const [algo, setAlgo] = useState('Random')

  function visualizeHandler() {
    switch (algo) {
      case 'dfs':
        return visualizeDFS(grid, startNodeIdx, finishNodeIdx)
      case 'dijkstra':
        return visualizeDijkstra(grid, startNodeIdx, finishNodeIdx)
      default:
        visualizeDijkstra(grid, startNodeIdx, finishNodeIdx)
    }
  }
  const patternHandler = (pattern) => {
    if (true) {
      switch (pattern) {
        case 'pattern1':
          return pattern1(grid, setGrid)
        default:
          return pattern1(grid, setGrid)
      }
    }
  }

  const clearWalls = () => {
    const newGrid = initializeGrid()
    setGrid(newGrid)
    return true
  }

  return (
    <nav className="nav">
      <h1>Algo Visualizer</h1>
      <ul>
        <li>
          <a href="#">
            Algorithm <FaAngleDown />
          </a>
          <ul className="dropdown">
            <li>
              <a href="#" onClick={() => setAlgo('dijkstra')}>
                Dijkstra{' '}
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setAlgo('dfs')}>
                DFS
              </a>
            </li>
            <li>
              <a href="#">Algo 3</a>
            </li>
            <li>
              <a href="#">Algo 4</a>
            </li>
          </ul>
        </li>
        <li>
          <button onClick={() => visualizeHandler()}>
            {`Visualize ${algo.toUpperCase()}`}{' '}
          </button>
        </li>
        <li>
          <a href="#">Patterns </a>
          <ul className="dropdown">
            <li>
              <a href="#" onClick={() => patternHandler('pattern1')}>
                Pattern 1
              </a>
            </li>
            <li>
              <a href="#">Pattern 2</a>
            </li>
            <li>
              <a href="#">Pattern 3</a>
            </li>
            <li>
              <a href="#">Pattern 4</a>
            </li>
          </ul>
        </li>
        <li>
          <a onClick={clearWalls}>Clear Board</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
