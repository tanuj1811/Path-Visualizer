import React,{useContext} from 'react'
import './navbar.scss';

import { GridContext } from '../../context/gridContext';
import {FaAngleDown} from 'react-icons/fa'


const Navbar = () => {
  const {setGrid,initializeGrid} = useContext(GridContext);
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
              <a href="#">Algo 1</a>
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
        <li><button>Visualize [Random]</button></li>
        <li>
          <a href="#">Patterns </a>
          <ul className="dropdown">
            <li>
              <a href="#">Pattern 1</a>
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
