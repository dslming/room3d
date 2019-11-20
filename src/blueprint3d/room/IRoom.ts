
import { ICorner } from '../corner/ICorner'
export interface IRoom {
  thickness: any
  getEnd(): ICorner
  getStart(): ICorner
}
