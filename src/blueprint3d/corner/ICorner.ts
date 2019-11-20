
import { IWall } from '../wall/IWall'

export interface ICorner {
  x: number
  y: number
  id: string
  getId(): string
  snapToAxis(tolerance: number): { x: boolean, y: boolean }
  relativeMove(dx: number, dy: number): void
  getX(): number
  getY(): number
  // detachWall(wall: IWall): void
  // adjacentCorners(): ICorner[]
  // attachStart(wall: IWall): void
  // attachEnd(wall: IWall): void
}
