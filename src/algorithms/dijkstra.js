import { animateShortestPath } from './animateAlgo'

export function animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder) {
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length) {
      if (nodesInShortestPathOrder.length <= 1) console.log('Err: target node not reachable')
      else {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder)
        }, 10 * i)
      }
      return
    }
    setTimeout(() => {
      const node = visitedNodesInOrder[i]
      document.getElementById(`node-${node.row}-${node.col}`).className =
        'node node-visited'
    }, 10 * i)
  }
}

export default function visualizeDijkstra(grid, startNodeIdx, finishNodeIdx) {
  if (!grid) return
  const startNode = grid[startNodeIdx[0]][startNodeIdx[1]]
  const finishNode = grid[finishNodeIdx[0]][finishNodeIdx[1]]

  const visitedNodesInOrder = dijkstra(grid, startNode, finishNode)
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode)
  animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder)
}

function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = []
  startNode.distance = 0
  const unvisitedNodes = getAllNodes(grid)
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes)
    const closestNode = unvisitedNodes.shift()
    if (closestNode.isWall) continue
    if (closestNode.distance === Infinity) return visitedNodesInOrder
    closestNode.isVisited = true
    visitedNodesInOrder.push(closestNode)
    if (closestNode === finishNode) return visitedNodesInOrder
    updateUnvisitedNeighbors(closestNode, grid)
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid)
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1
    neighbor.previousNode = node
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = []
  const { col, row } = node
  if (row > 0) neighbors.push(grid[row - 1][col])
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
  if (col > 0) neighbors.push(grid[row][col - 1])
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
  return neighbors.filter((neighbor) => !neighbor.isVisited)
}

function getAllNodes(grid) {
  const nodes = []
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node)
    }
  }
  return nodes
}

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = []
  let currentNode = finishNode
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode)
    currentNode = currentNode.previousNode
  }
  return nodesInShortestPathOrder
}
  