import { clearWalls,animatePattern } from "./common";

export function visualizeBasic(grid) {
  clearWalls(grid)
  const wallsToAnimate = pattern1(grid);
  animatePattern(wallsToAnimate,50)

}
export default function pattern1(grid) {
  const wallToAnimate = []
  for(let idx=0;idx<20;idx++) {
    const node = grid[idx][idx];
    if(idx===random(20) || idx === random(49) || node.isSource || node.isTarget) continue;
    node.isWall = true
    wallToAnimate.push(node)
  }
  let col =20;
  for(let row=19;row>=0;row--,col++) {
    const node = grid[row][col];
    if(row===random(20) || col === random(49) || node.isSource || node.isTarget) continue;
    node.isWall = true
    wallToAnimate.push(node)
  }
  
  for(let row=0;row<20&& col<50;row++,col++) {
    const node = grid[row][col];
    if(row===random(20) || col === random(49) || node.isSource || node.isTarget) continue;
    node.isWall = true
    wallToAnimate.push(node)
  }
  console.log("hlo from pattern1");
  return wallToAnimate
}

function random(limit) {
  return parseInt(Math.random() * limit)
}





