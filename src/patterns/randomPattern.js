import {animatePattern, clearWalls} from './common'

export function visualizeRandomPattern(grid) {
  clearWalls(grid)
  const wallToAnimate = randomPattern(grid)
  animatePattern(wallToAnimate,25)
}
export function randomPattern(grid) {
  const wallToAnimate = []
  for (let row of grid) {
    for (let node of row) {
      if (
        node.isSource ||
        node.isTarget ||
        random(100) % 2 === 0 ||
        random(999) % 3 === 0 ||
        random(50)%3 === 0
      )
        continue
      node.isWall = true
      wallToAnimate.push(node)
    }
  }
  return wallToAnimate
}

function random(limit) {
  return parseInt(Math.random() * limit)
}

