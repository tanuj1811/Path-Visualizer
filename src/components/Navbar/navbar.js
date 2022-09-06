import React, { useContext, useState } from 'react'
import './navbar.scss'

import { GridContext } from '../../context/gridContext'
import { visualizeDijkstra, visualizeDFS } from '../../algorithms'
import {
  visualizeRandomPattern,
  visualizeBasic,
  visualizeMazePattern,
  visualizeVerticalRecMazePattern,
  visualizeHorizontalMazePattern,
} from '../../patterns'
import { FaAngleDown } from 'react-icons/fa'
import logo from '../../logo.jpeg'

const Navbar = () => {
  const { grid, startNodeIdx, finishNodeIdx, resetBoard } = useContext(
    GridContext,
  )
  const [algo, setAlgo] = useState('Dijkstra')

  function visualizeHandler() {
    switch (algo) {
      case 'dfs':
        visualizeDFS(grid, startNodeIdx, finishNodeIdx)
        break
      case 'dijkstra':
        visualizeDijkstra(grid, startNodeIdx, finishNodeIdx)
        break;
      default:
        visualizeDijkstra(grid, startNodeIdx, finishNodeIdx)

      }
  }

  function clearWalls() {
    for (const row of grid) {
      for (const node of row) {
        node.isWall = false
        node.isVisited = false
        if (node.isSource || node.isTarget)
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-source'
        else
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node'
      }
    }
  }

  function clearPath() {
    for (const row of grid) {
      for (const node of row) {
        node.isVisited = false
        if (node.isSource || node.isTarget) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-source'
        }
        else if(node.isWall) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
          'node wall'
        }
        else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node'
        }
      }
    }
  }

  return (
    <nav className="nav">
      <img src={logo} alt="logo" />
      <ul>
        <li>
          <a onClick={() => resetBoard()}>Reset Board</a>
        </li>
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
          </ul>
        </li>
        <li>
          <button onClick={() => visualizeHandler()}>
            {`Visualize ${algo.toUpperCase()}`}
          </button>
        </li>
        <li>
          <a href="#">
            Patterns <FaAngleDown />
          </a>
          <ul className="dropdown">
            <li>
              <a href="#" onClick={() => visualizeBasic(grid)}>
                Basic Stair Pattern
              </a>
            </li>
            <li>
              <a href="#" onClick={() => visualizeMazePattern(grid)}>
                Maze Pattern
              </a>
            </li>
            <li>
              <a href="#" onClick={() => visualizeVerticalRecMazePattern(grid)}>
                Vertical Maze Pattern
              </a>
            </li>
            <li>
              <a href="#" onClick={() => visualizeHorizontalMazePattern(grid)}>
                Horizontal Maze Pattern
              </a>
            </li>
            <li>
              <a href="#" onClick={() => visualizeRandomPattern(grid)}>
                Random Walls
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a onClick={clearWalls}>Clear Board</a>
        </li>
        <li>
          <a onClick={clearPath}>Clear Path</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
