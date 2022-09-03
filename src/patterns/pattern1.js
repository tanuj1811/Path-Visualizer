import {clearWalls,buildWall} from './common'

export default function pattern1(grid, setGrid) {
  setGrid(clearWalls(grid))

  for(let idx=0;idx<20;idx++) {
    const node = grid[idx][idx];
    if(idx===random(20) || idx === random(50) || node.isSource || node.isTarget) continue;
    setGrid(buildWall(grid,idx,idx))
  }
  let col =20;
  for(let row=19;row>=0;row--,col++) {
    const node = grid[row][col];
    if(row===random(20) || col === random(50) || node.isSource || node.isTarget) continue;
    setGrid(buildWall(grid,row,col))
  }
  
  for(let row=0;row<20&& col<50;row++,col++) {
    const node = grid[row][col];
    if(row===random(20) || col === random(50) || node.isSource || node.isTarget) continue;
    setGrid(buildWall(grid,row,col))
  }

}

function random(limit) {
  return parseInt(Math.random() * limit)
}


