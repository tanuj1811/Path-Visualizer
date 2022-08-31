import React,{useContext} from 'react'
import './navbar.scss';

import { GridContext } from '../../context/gridContext';
import { visualizeDijkstra } from '../../algorithms/dijkstra';
import {FaAngleDown} from 'react-icons/fa';

const Navbar = () => {
  const {grid, startNodeIdx, finishNodeIdx, setGrid,initializeGrid} = useContext(GridContext);
  
  function pattern1() {
    console.log('pattern 1 initiated');

    for(let row = 0;row < 20;row++) {

      for(let col=0;col<50;col++) {
        const condition = (row !== startNodeIdx[0] && col !== startNodeIdx[1] ) || (row !== finishNodeIdx[0] && col !== finishNodeIdx[1])
        if(row === col && condition) {
          const newGrid = buildWall(row,col);
          setGrid(newGrid);
        }
      }
    }
    
  }

  function buildWall(row, col) {
    const newGrid = grid.slice()
    const node = grid[row][col]
    const newNode = {
      ...node,
      isWall: true,
    }
    newGrid[row][col] = newNode

    return newGrid
  }
  
  const clearWalls = () => {
    const newGrid = initializeGrid();
    setGrid(newGrid)
  }
  return (
    <nav className="nav">
      <h1>Algo Visualizer</h1>
      <ul>
        <li>
          <a href="#">Algorithm <FaAngleDown /></a>
          <ul className="dropdown">
            <li>
              <a href="#">Dijkstra </a>
            </li>
            <li>
              <a href="#">Algo 2</a>
            </li>
            <li>
              <a href="#">Algo 3</a>
            </li>
            <li>
              <a href="#">Algo 4</a>
            </li>
          </ul>
        </li>
        <li><button onClick={() => 
        visualizeDijkstra(grid.slice(), startNodeIdx, finishNodeIdx)}>Visualize [Random]</button></li>
        <li>
          <a href="#">Patterns </a>
          <ul className="dropdown">
            <li>
              <a href="#" onClick={() => pattern1()}>Pattern 1</a>
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
        <li><a onClick={clearWalls}>Clear Board</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
