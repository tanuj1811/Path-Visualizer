import React, { useContext, useState } from 'react'
import './navbar.scss'

import { GridContext } from '../../context/gridContext'
import { visualizeDijkstra, visualizeDFS } from '../../algorithms'
import { visualizeRandomPattern,visualizeBasic,visualizeMazePattern,visualizeVerticalRecMazePattern, visualizeHorizontalMazePattern } from '../../patterns'
import { FaAngleDown } from 'react-icons/fa'

const Navbar = () => {
  const {
    grid,
    startNodeIdx,
    finishNodeIdx,
    setGrid,
    initializeGrid,
  } = useContext(GridContext)
  const [algo, setAlgo] = useState('Dijkstra')

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
              <a href="#" onClick={() => visualizeBasic(grid)}>
                Basic Pattern
              </a>
            </li>
            <li>
              <a href="#" onClick={() => visualizeRandomPattern(grid)}>Random Walls</a>
            </li>
            <li>
              <a href="#" onClick={() => visualizeMazePattern(grid)}>Pattern 3</a>
            </li>
            <li>
              <a href="#" onClick={() => visualizeVerticalRecMazePattern(grid)}>Pattern V--4</a>
            </li>
            <li>
              <a href="#" onClick={() => visualizeHorizontalMazePattern(grid)}>Pattern H--4</a>
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
