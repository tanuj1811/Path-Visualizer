import { animatePattern, clearWalls } from './common'

export function visualizeMazePattern(grid) {
  clearWalls(grid)
  const wallToAnimate = divisionMaze(grid)
  animatePattern(wallToAnimate, 10)
}
function divisionMaze(grid) {
  const wallToAnimate = []
  for (let col = 0; col < 50; col++) {
    const node = grid[0][col]
    if (node.isSource || node.isTarget) continue
    node.isWall = true
    wallToAnimate.push(node)
    const node2 = grid[19][col]
    if (node2.isSource || node2.isTarget) continue
    node2.isWall = true
    wallToAnimate.push(node2)
  }
  for (let row = 0; row < 20; row++) {
    const node = grid[row][0]
    if (node.isSource || node.isTarget) continue
    node.isWall = true
    wallToAnimate.push(node)
    const node2 = grid[row][49]
    if (node2.isSource || node2.isTarget) continue
    node2.isWall = true
    wallToAnimate.push(node2)
  }

  recursiveDivisionMaze(
    grid,
    2,
    grid.length - 3,
    2,
    grid[0].length - 3,
    wallToAnimate,
    true,
  )

  return wallToAnimate
}

function recursiveDivisionMaze(
  grid,
  rowStart,
  rowEnd,
  colStart,
  colEnd,
  wallToAnimate,
  isVerticalOrientation,
) {
  if (rowEnd < rowStart || colEnd < colStart) {
    return
  }
  if (isVerticalOrientation) {
    let possibleRows = []
    for (let number = rowStart; number <= rowEnd; number += 2) {
      possibleRows.push(number)
    }
    let possibleCols = []
    for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
      possibleCols.push(number)
    }
    let randomRowIndex = random(possibleRows.length)
    let randomColIndex = random(possibleCols.length)
    let currentRow = possibleRows[randomRowIndex]
    let colRandom = possibleCols[randomColIndex]

    for (let row of grid) {
      for (let node of row) {
        if (
          node.row === currentRow &&
          node.col !== colRandom &&
          node.col >= colStart - 1 &&
          node.col <= colEnd + 1
        ) {
          if (!node.isSource && !node.isTarget) {
            node.isWall = true
            wallToAnimate.push(node)
          }
        }
      }
    }
    if (currentRow - 2 - rowStart > colEnd - colStart) {
      recursiveDivisionMaze(
        grid,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        wallToAnimate,
        isVerticalOrientation,
      )
    } else {
      recursiveDivisionMaze(
        grid,
        rowStart,
        currentRow - 2,
        colStart,
        colEnd,
        wallToAnimate,
        false,
      )
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      recursiveDivisionMaze(
        grid,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        wallToAnimate,
        isVerticalOrientation,
      )
    } else {
      recursiveDivisionMaze(
        grid,
        currentRow + 2,
        rowEnd,
        colStart,
        colEnd,
        wallToAnimate,
        false,
      )
    }
  } else {
    let possibleRows = []
    for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
      possibleRows.push(number)
    }
    let possibleCols = []
    for (let number = colStart; number <= colEnd; number += 2) {
      possibleCols.push(number)
    }
    let randomRowIndex = random(possibleRows.length)
    let randomColIndex = random(possibleCols.length)
    let currentCol = possibleCols[randomColIndex]
    let rowRandom = possibleRows[randomRowIndex]

    for (let row of grid) {
      for (let node of row) {
        if (
          node.col === currentCol &&
          node.row !== rowRandom &&
          node.row >= rowStart - 1 &&
          node.row <= rowEnd + 1
        ) {
          if (!node.isSource && !node.isTarget) {
            node.isWall = true
            wallToAnimate.push(node)
          }
        }
      }
    }
    if (rowEnd - rowStart > currentCol - 2 - colStart) {
      recursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        wallToAnimate,
        false,
      )
    } else {
      recursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        colStart,
        currentCol - 2,
        wallToAnimate,
        isVerticalOrientation,
      )
    }
    if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
      recursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        wallToAnimate,
        false,
      )
    } else {
      recursiveDivisionMaze(
        grid,
        rowStart,
        rowEnd,
        currentCol + 2,
        colEnd,
        wallToAnimate,
        isVerticalOrientation,
      )
    }
  }
}

function random(limit) {
  return Math.floor(Math.random() * limit)
}
