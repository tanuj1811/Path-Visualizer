import React, { useState, useEffect, useContext } from 'react'
import './grid.scss'
import Node from '../Node/node'
import { GridContext } from '../../context/gridContext'
import Symbol from '../Symbol/symbol'
import {FaGithub} from 'react-icons/fa'

const FINISH_NODE_ROW = parseInt(process.env.REACT_APP_FINISH_NODE_ROW)
const FINISH_NODE_COL = parseInt(process.env.REACT_APP_FINISH_NODE_COL)
const START_NODE_ROW = parseInt(process.env.REACT_APP_START_NODE_ROW)
const START_NODE_COL = parseInt(process.env.REACT_APP_START_NODE_COL)

const Grid = () => {
  const {
    grid,
    setGrid,
    initializeGrid,
    startNodeIdx,
    finishNodeIdx,
    setStartNodeIdx,
    setFinishNodeIdx,
  } = useContext(GridContext)


  const [isMousePressed, setIsMousePressed] = useState([false, false, false])
  /*
    0 - > for toggle walls
    1 -> for moving starting Node
    2 -> for moving target node
  */

  useEffect(() => {
    setStartNodeIdx([START_NODE_ROW, START_NODE_COL])
    setFinishNodeIdx([FINISH_NODE_ROW, FINISH_NODE_COL])
    const newGrid = initializeGrid()
    setGrid(newGrid)
  }, [])

  const mouseDownHandler = (row, col) => {
    var newGrid = grid
    if (row === startNodeIdx[0] && col === startNodeIdx[1]) {
      newGrid = moveStartNodeIdxHandler(row, col)
      setIsMousePressed([true, true, false])
    } else if (row === finishNodeIdx[0] && col === finishNodeIdx[1]) {
      newGrid = moveTargetNodeHandler(row, col)
      setIsMousePressed([true, false, true])
    } else {
      newGrid = toggleWalls(row, col)
      setIsMousePressed([true, false, false])
    }
    setGrid(newGrid)
  }

  const mouseUpHandler = () => {
    setIsMousePressed([false, false, false])
  }

  const mouseEnterHandler = (row, col) => {
    if (!isMousePressed[0]) return
    var newGrid = []
    if (isMousePressed[1]) newGrid = moveStartNodeIdxHandler(row, col)
    else if (isMousePressed[2]) newGrid = moveTargetNodeHandler(row, col)
    else newGrid = toggleWalls(row, col)

    setGrid(newGrid)
  }

  function moveTargetNodeHandler(row, col) {
    if (row === startNodeIdx[0] && col === startNodeIdx[1]) return grid
    const newGrid = grid.slice()
    if(removeSpecialNode(newGrid, finishNodeIdx[0], finishNodeIdx[1])){

      const node = grid[row][col]
      const newNode = {
        ...node,
        isTarget: true,
      }
      
      newGrid[row][col] = newNode
    }

    setFinishNodeIdx([row, col])
    return newGrid
  }

  function moveStartNodeIdxHandler(row, col) {
    if (row === finishNodeIdx[0] && col === finishNodeIdx[1]) return grid
    const newGrid = grid.slice()
    if(removeSpecialNode(newGrid, startNodeIdx[0], startNodeIdx[1])){
      const node = newGrid[row][col]
      const newNode = {
        ...node,
        isSource: true,
      }
      
      newGrid[row][col] = newNode
    }

    setStartNodeIdx([row, col])
    return newGrid
  }

  const removeSpecialNode = (localGrid, row, col) => {
    const node = localGrid[row][col]
    localGrid[row][col] = {
      ...node,
      isSource: false,
      isTarget: false,
    }
    return localGrid
  }

  
  
  function toggleWalls(row, col) {
    const condition = (row === startNodeIdx[0] && col === startNodeIdx[1] ) || (row === finishNodeIdx[0] && col === finishNodeIdx[1])
    if(condition) return grid
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
      <Symbol/>
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className='row'>
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
      <a className="github" href='https://github.com/tanuj1811/Path-Visualizer' target="_blank" rel="noreferrer"><FaGithub /></a>
    </div>
  )
}

export default Grid
