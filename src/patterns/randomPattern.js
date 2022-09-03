import {clearWalls,buildWall} from './common'

export function randomPattern(grid,setGrid) {
    setGrid(clearWalls(grid));
    
}