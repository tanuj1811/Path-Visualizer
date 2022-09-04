import { animatePattern, clearWalls } from './common'

export function visualizeHorizontalMazePattern(grid) {
  clearWalls(grid)
  const wallToAnimate = horizontalMazePattern(grid)
  animatePattern(wallToAnimate, 10)
}
function horizontalMazePattern(grid) {
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

  recursiveHorizontalMazePattern(
    grid,
    2,
    grid.length - 3,
    2,
    grid[0].length - 3,
    wallToAnimate,
  )

  return wallToAnimate
}

function recursiveHorizontalMazePattern(
  grid,
  rowStart,
  rowEnd,
  colStart,
  colEnd,
  wallToAnimate,
) {
  if (rowEnd < rowStart || colEnd < colStart) {
    return
  }
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
  recursiveHorizontalMazePattern(
    grid,
    rowStart,
    currentRow - 2,
    colStart,
    colEnd,
    wallToAnimate,
  )

  recursiveHorizontalMazePattern(
    grid,
    currentRow + 2,
    rowEnd,
    colStart,
    colEnd,
    wallToAnimate,
  )
}

function random(limit) {
  return Math.floor(Math.random() * limit)
}
