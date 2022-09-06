import React, { useState, createContext } from 'react'

const GridContext = createContext()
const INITIAL_START_IDX = [
  parseInt(process.env.REACT_APP_START_NODE_ROW),
  parseInt(process.env.REACT_APP_START_NODE_COL),
]
const INITIAL_FINISH_IDX = [
  parseInt(process.env.REACT_APP_FINISH_NODE_ROW),
  parseInt(process.env.REACT_APP_FINISH_NODE_COL),
]

const GridProvider = (props) => {
  const [grid, setGrid] = useState([])
  const [startNodeIdx, setStartNodeIdx] = useState(INITIAL_START_IDX)
  const [finishNodeIdx, setFinishNodeIdx] = useState(INITIAL_FINISH_IDX)

  function initializeGrid(newBoard) {
    const newGrid = []
    if (newBoard) {
      setStartNodeIdx([startNodeIdx[0], startNodeIdx[1]])
      setFinishNodeIdx([finishNodeIdx[0], finishNodeIdx[1]])
    }
    for (let row = 0; row < 20; row++) {
      const currRow = []
      for (let col = 0; col < 50; col++) {
        currRow.push(createNode(row, col))
      }
      newGrid.push(currRow)
    }
    return newGrid
  }

  function resetBoard() {
    if (!grid) return
    setStartNodeIdx(INITIAL_START_IDX)
    setFinishNodeIdx(INITIAL_FINISH_IDX)
    for (const row of grid) {
      for (const node of row) {
        node.isWall = false
        node.isVisited = false
        node.isSource = false
        node.isTarget = false
        const sourceCheck =
          node.row === INITIAL_START_IDX[0] && node.col === INITIAL_START_IDX[1]
        const targetCheck =
          node.row === INITIAL_FINISH_IDX[0] &&
          node.col === INITIAL_FINISH_IDX[1]
        if (sourceCheck || targetCheck) {
          node.isSource = sourceCheck
          node.isTarget = targetCheck
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-source'
        } else
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node'
      }
    }
  }

  function createNode(row, col) {
    return {
      row,
      col,
      isSource: row === startNodeIdx[0] && col === startNodeIdx[1],
      isTarget: row === finishNodeIdx[0] && col === finishNodeIdx[1],
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    }
  }

  const value = {
    grid,
    startNodeIdx,
    finishNodeIdx,
    setGrid,
    setStartNodeIdx,
    setFinishNodeIdx,
    initializeGrid,
    resetBoard,
  }
  return (
    <GridContext.Provider value={value}>{props.children}</GridContext.Provider>
  )
}

export { GridProvider, GridContext }
