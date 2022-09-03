export function clearWalls(grid) {
  const newGrid = grid.slice()
  for (const row of grid) {
    for (const node of row) {
      if (node.isWall) {
        newGrid[node.row][node.col] = {
          ...node,
          isWall: false,
        }
      }
    }
  }
  return newGrid
}

export function clearWalls(grid, row, col) {
  const newGrid = grid.slice()
  const node = grid[row][col]
  const newNode = {
    ...node,
    isWall: true,
  }
  newGrid[row][col] = newNode

  return newGrid
}
