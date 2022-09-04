import { animatePattern, clearWalls } from './common'

export function visualizeVerticalRecMazePattern(grid) {
  clearWalls(grid)
  const wallToAnimate = verticalRecMazePattern(grid)
  animatePattern(wallToAnimate, 10)
}
function verticalRecMazePattern(grid) {
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

  recursiveVerticalRecMazePattern(
    grid,
    2,
    grid.length - 3,
    2,
    grid[0].length - 3,
    wallToAnimate,
  )

  return wallToAnimate
}

function recursiveVerticalRecMazePattern(
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
  recursiveVerticalRecMazePattern(
    grid,
    rowStart,
    rowEnd,
    colStart,
    currentCol - 2,
    wallToAnimate,
  )
  recursiveVerticalRecMazePattern(
    grid,
    rowStart,
    rowEnd,
    currentCol + 2,
    colEnd,
    wallToAnimate,
  )
}

function random(limit) {
  return Math.floor(Math.random() * limit)
}
