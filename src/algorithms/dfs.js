import {animateAlgo, getNodesInShortestPathOrder} from './dijkstra'


export default function visualizeDFS(grid, startNodeIdx, finishNodeIdx) {
  const startNode = grid[startNodeIdx[0]][startNodeIdx[1]]
  const finishNode = grid[finishNodeIdx[0]][finishNodeIdx[1]]

  const visitedNodeInOrder = dfs(grid, startNode, finishNode)
  const nodeInShortestPathOrder = getNodesInShortestPathOrder(finishNode)
  animateAlgo(visitedNodeInOrder, nodeInShortestPathOrder)

}


function dfs(grid, startNode, finishNode) {
  const visitedNodeInOrder = []
  startNode.distance = 0
  dfsRecFunc(grid, startNode, finishNode, visitedNodeInOrder)
  return visitedNodeInOrder
}

function dfsRecFunc(grid, node, finishNode, visitedNodeInOrder) {
  if (node === finishNode) return true
  node.isVisited = true
  const unvisitedNeighbors = updateUnvisitedNeighbors(node, grid)

  for (let unvisitedNeighbor of unvisitedNeighbors) {
    if (unvisitedNeighbor.isWall || unvisitedNeighbor.isVisited) continue
    visitedNodeInOrder.push(unvisitedNeighbor)
    if (dfsRecFunc(grid, unvisitedNeighbor, finishNode, visitedNodeInOrder))
      return true
  }
  return false
}



function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid)
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1
    neighbor.previousNode = node
  }
  return unvisitedNeighbors
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = []
  const { col, row } = node
  if (row > 0) neighbors.push(grid[row - 1][col])
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
  if (col > 0) neighbors.push(grid[row][col - 1])
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
  return neighbors.filter((neighbor) => !neighbor.isVisited)
}

