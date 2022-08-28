import React, { useState, useEffect, useContext } from 'react'
import './grid.scss'
import Node from '../Node/node'
import { GridContext } from '../../context/gridContext'

const FINISH_NODE_ROW = parseInt(process.env.REACT_APP_FINISH_NODE_ROW)
const FINISH_NODE_COL = parseInt(process.env.REACT_APP_FINISH_NODE_COL)
const START_NODE_ROW = parseInt(process.env.REACT_APP_START_NODE_ROW)
const START_NODE_COL = parseInt(process.env.REACT_APP_START_NODE_COL)

const Grid = () => {
  const { grid, setGrid, initializeGrid } = useContext(GridContext)

  const [startNode, setStartNode] = useState([START_NODE_ROW, START_NODE_COL])
  const [finishNode, setFinishNode] = useState([
    FINISH_NODE_ROW,
    FINISH_NODE_COL,
  ])

  const [isMousePressed, setIsMousePressed] = useState([false,false,false]);
  /*
    0 - > for toggle walls
    1 -> for moving starting Node
    2 -> for moving target node
  */

  useEffect(() => {
    const newGrid = initializeGrid()
    setGrid(newGrid)
  }, [])

  const mouseDownHandler = (row, col) => {
    var newGrid = grid
    if (row === startNode[0] && col === startNode[1]) {
      newGrid = moveStartNodeHandler(row, col)
      setIsMousePressed([true,true,false])
    } else if(row === finishNode[0] && col === finishNode[1]) {
      newGrid = moveTargetNodeHandler(row, col)
      setIsMousePressed([true, false, true]);
    } else {
      newGrid = toggleWalls(row, col)
      setIsMousePressed([true,false,false])
    }
    setGrid(newGrid)
  }

  const mouseUpHandler = () => {
    setIsMousePressed([false,false,false])
  }

  const mouseEnterHandler = (row, col) => {
    console.log(isMousePressed)
    if (!isMousePressed[0]) return
    var newGrid = []
    if (isMousePressed[1]) newGrid = moveStartNodeHandler(row, col)
    else if(isMousePressed[2]) newGrid = moveTargetNodeHandler(row,col)
    else newGrid = toggleWalls(row, col)
    setGrid(newGrid)
  }

  function moveTargetNodeHandler(row, col) {
    if(row == startNode[0] && col == startNode[1]) return grid;
    const newGrid = grid.slice()
    const oldStart = grid[finishNode[0]][finishNode[1]]
    newGrid[finishNode[0]][finishNode[1]] = {
      ...oldStart,
      isTarget: false,
    }
    const node = grid[row][col]
    const newNode = {
      ...node,
      isTarget: true,
    }

    newGrid[row][col] = newNode

    setFinishNode([row, col])
    return newGrid
  }

  function moveStartNodeHandler(row, col) {
    if(row ===finishNode[0] && col === finishNode[1]) return grid
    const newGrid = grid.slice()
    const oldStart = grid[startNode[0]][startNode[1]]
    newGrid[startNode[0]][startNode[1]] = {
      ...oldStart,
      isSource: false,
    }
    const node = grid[row][col]
    const newNode = {
      ...node,
      isSource: true,
    }

    newGrid[row][col] = newNode

    setStartNode([row, col])
    return newGrid
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
                    row={row}
                    col={col}
                    isTarget={isTarget}
                    isSource={isSource}
                    isWall={isWall}
                    onMouseDown={(row, col) => mouseDownHandler(row, col)}
                    onMouseEnter={(row, col) => mouseEnterHandler(row, col)}
                    onMouseUp={() => mouseUpHandler()}
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
