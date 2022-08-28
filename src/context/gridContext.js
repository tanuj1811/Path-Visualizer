import React, { useState, createContext } from 'react'

const GridContext = createContext()
const GridProvider = (props) => {
  const [grid, setGrid] = useState([])
  function initializeGrid() {
    const newGrid = []
    for (let row = 0; row < 20; row++) {
      const currRow = []
      for (let col = 0; col < 50; col++) {
        currRow.push(createNode(row, col))
      }
      newGrid.push(currRow)
    }
    return newGrid
  }

  function createNode(row, col) {
    return {
      row,
      col,
      isSource:
        row === parseInt(process.env.REACT_APP_START_NODE_ROW) &&
        col === parseInt(process.env.REACT_APP_START_NODE_COL),
      isTarget:
        row === parseInt(process.env.REACT_APP_FINISH_NODE_ROW) &&
        col === parseInt(process.env.REACT_APP_FINISH_NODE_COL),
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    }
  }

  const value = { grid, setGrid, initializeGrid }
  return (
    <GridContext.Provider value={value}>{props.children}</GridContext.Provider>
  )
}

export { GridProvider, GridContext }
