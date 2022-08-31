import React, { useState, createContext } from 'react'

const GridContext = createContext()
const GridProvider = (props) => {
  const [grid, setGrid] = useState([])
  const [startNodeIdx, setStartNodeIdx] = useState([parseInt(process.env.REACT_APP_START_NODE_ROW),parseInt(process.env.REACT_APP_START_NODE_COL)])
  const [finishNodeIdx, setFinishNodeIdx] = useState([parseInt(process.env.REACT_APP_FINISH_NODE_ROW), parseInt(process.env.REACT_APP_FINISH_NODE_COL)])

  function initializeGrid(newBoard) {
    const newGrid = []
    if(newBoard){
      setStartNodeIdx([startNodeIdx[0], startNodeIdx[1]]);
      setFinishNodeIdx([finishNodeIdx[0], finishNodeIdx[1]]);
    }
    for (let row = 0; row < 20; row++) {
      const currRow = []
      for (let col = 0; col < 50; col++) {
        const nodeEle = document.getElementById(`node-${row}-${col}`)
        if(nodeEle) {
          let classList = nodeEle.classList;
          nodeEle.classList = classList[0]
        }
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
        row ===  startNodeIdx[0]&&
        col ===  startNodeIdx[1],
      isTarget:
        row ===  finishNodeIdx[0]&&
        col === finishNodeIdx[1],
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    }
  }

  const value = { grid, startNodeIdx, finishNodeIdx, setGrid, setStartNodeIdx, setFinishNodeIdx,initializeGrid }
  return (
    <GridContext.Provider value={value}>{props.children}</GridContext.Provider>
  )
}

export { GridProvider, GridContext }
