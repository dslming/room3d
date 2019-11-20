
import { ICorner } from '../corner/ICorner'
export interface IWall {
  thickness: any
  height: any
  frontEdge?: any
  backEdge?: any
  frontTexture?: any
  backTexture?: any
  getEnd(): ICorner
  getStart(): ICorner,
  getHoverState(): boolean
  relativeMove(dx: number, dy: number): any
}
