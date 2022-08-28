import React, { useState, useEffect } from 'react'
import './grid.scss'
import Node from '../Node/node'

const START_NODE_ROW = 10
const START_NODE_COL = 15
const FINISH_NODE_ROW = 10
const FINISH_NODE_COL = 35

const Grid = () => {
  const [grid, setGrid] = useState([])
  const [isMousePressed, setIsMousePressed] = useState(false)

  useEffect(() => {
    const newGrid = []
    for (let row = 0; row < 20; row++) {
      const currRow = []
      for (let col = 0; col < 50; col++) {
        currRow.push(createNode(row, col))
      }
      newGrid.push(currRow)
    }

    setGrid(newGrid)
  }, [])

  const mouseDownHandler = (row, col) => {
    const newGrid = toggleWalls(row, col)
    setGrid(newGrid)
    setIsMousePressed(true)
  }

  const mouseUpHandler = () => {
    setIsMousePressed(false)
  }

  const mouseEnterHandler = (row, col) => {
    if (!isMousePressed) return
    const newGrid = toggleWalls(row, col)
    setGrid(newGrid)
  }

  function createNode(row, col) {
    return {
      row,
      col,
      isSource: row === START_NODE_ROW && col === START_NODE_COL,
      isTarget: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    }
  }

  function toggleWalls(row, col) {
    const newGrid = grid.slice()
    const node = grid[row][col]
    const newNode = {
      ...node,
      isWall: !node.isWall,
    }
    newGrid[row][col] = newNode

    return newGrid
  }
  return (
    <div>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isTarget, isSource, isWall } = node
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    isTarget={isTarget}
                    isSource={isSource}
                    isWall={isWall}
                    isMousePressed={isMousePressed}
                    onMouseDown={(row, col) => mouseDownHandler(row, col)}
                    onMouseEnter={(row, col) =>
                      mouseEnterHandler(row, col)
                    }
                    onMouseUp={() => mouseUpHandler()}
                    row={row}
                  ></Node>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Grid
