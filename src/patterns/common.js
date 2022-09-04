export function animatePattern(wallsToAnimate,timeout) {
  let index = 0
  for (let node of wallsToAnimate) {
    setTimeout(() => {
      document.getElementById(`node-${node.row}-${node.col}`).className =
        'node wall'
    }, timeout * index)
    index += 1
  }
}

export function clearWalls(grid) {
  for (const row of grid) {
    for (const node of row) {
      node.isWall=false
      node.isVisited=false;
      if (node.isSource || node.isTarget)
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-source'
      else 
        document.getElementById(`node-${node.row}-${node.col}`).className =
        'node'
      

    }
  }
}

// export function clearWalls(grid) {
//   const newGrid = grid.slice()
//   for (const row of grid) {
//     for (const node of row) {
//       if (node.isWall) {
//         newGrid[node.row][node.col] = {
//           ...node,
//           isWall: false,
//         }
//       }
//     }
//   }
//   return newGrid
// }

// export function buildWall(grid, row, col) {
//   const newGrid = grid.slice()
//   const node = grid[row][col]
//   const newNode = {
//     ...node,
//     isWall: true,
//   }
//   newGrid[row][col] = newNode

//   return newGrid
// }
