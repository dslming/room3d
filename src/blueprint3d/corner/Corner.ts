import { Utils } from '../utils/utils'
import { ICorner } from './ICorner'
import { IWall } from '../wall/IWall'
/** */
const cornerTolerance: number = 20;

/**
 * Corners are used to define Walls.
 */
export class Corner implements ICorner {
  public x: number
  public y: number
  public id: string
  /** Array of start walls. */
  private wallStarts: IWall[] = [];

  /** Array of end walls. */
  private wallEnds: IWall[] = [];

  constructor(x: number, y: number, id?: string) {
    this.id = id || Utils.guid()
    this.x = x
    this.y = y
  }

  public getId(): string {
    return this.id
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  /** Moves corner relatively to new position.
     * @param dx The delta x.
     * @param dy The delta y.
     */
  public relativeMove(dx: number, dy: number) {
    // console.error(this.x, dx, this.y, dy);

    // console.error(0, dy);

    this.move(this.x + dx, this.y + dy);
  }

  /** Moves corner to new position.
     * @param newX The new x position.
     * @param newY The new y position.
     */
  private move(newX: number, newY: number) {
    this.x = newX;
    this.y = newY;
    // this.mergeWithIntersected();
    // this.moved_callbacks.fire(this.x, this.y);

    // this.wallStarts.forEach((wall) => {
    //   wall.fireMoved();
    // });

    // this.wallEnds.forEach((wall) => {
    //   wall.fireMoved();
    // });
  }

  // public mergeWithIntersected(): boolean {
  //   //console.log('mergeWithIntersected for object: ' + this.type);
  //   // check corners
  //   for (var i = 0; i < this.floorplan.getCorners().length; i++) {
  //     var corner = this.floorplan.getCorners()[i];
  //     if (this.distanceFromCorner(corner) < cornerTolerance && corner != this) {
  //       this.combineWithCorner(corner);
  //       return true;
  //     }
  //   }
  //   // check walls
  //   for (var i = 0; i < this.floorplan.getWalls().length; i++) {
  //     var wall = this.floorplan.getWalls()[i];
  //     if (this.distanceFromWall(wall) < cornerTolerance && !this.isWallConnected(wall)) {
  //       // update position to be on wall
  //       var intersection = Core.Utils.closestPointOnLine(this.x, this.y,
  //         wall.getStart().x, wall.getStart().y,
  //         wall.getEnd().x, wall.getEnd().y);
  //       this.x = intersection.x;
  //       this.y = intersection.y;
  //       // merge this corner into wall by breaking wall into two parts
  //       this.floorplan.newWall(this, wall.getEnd());
  //       wall.setEnd(this);
  //       this.floorplan.update();
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  /** Gets the distance from a corner.
     * @param corner A corner.
     * @returns The distance.
     */
  public distanceFromCorner(corner: Corner): number {
    return this.distanceFrom(corner.x, corner.y);
  }

  public distanceFrom(x: number, y: number): number {
    var distance = Utils.distance(x, y, this.x, this.y);
    return distance;
  }

  public snapToAxis(tolerance: number): { x: boolean, y: boolean } {
    // try to snap this corner to an axis
    var snapped = {
      x: false,
      y: false
    };

    var scope = this;

    this.adjacentCorners().forEach((corner: ICorner) => {
      if (Math.abs(corner.x - scope.x) < tolerance) {
        scope.x = corner.x;
        snapped.x = true;
      }
      if (Math.abs(corner.y - scope.y) < tolerance) {
        scope.y = corner.y;
        snapped.y = true;
      }
    });
    return snapped;
  }

  /** Attaches a start wall.
     * @param wall A wall.
     */
  public attachStart(wall: IWall) {
    this.wallStarts.push(wall)
  }

  /** Attaches an end wall.
   * @param wall A wall.
   */
  public attachEnd(wall: IWall) {
    this.wallEnds.push(wall)
  }

  /** Gets the adjacent corners.
     * @returns Array of corners.
     */
  public adjacentCorners(): ICorner[] {
    var retArray = [];
    for (var i = 0; i < this.wallStarts.length; i++) {
      retArray.push(this.wallStarts[i].getEnd());
    }
    for (var i = 0; i < this.wallEnds.length; i++) {
      retArray.push(this.wallEnds[i].getStart());
    }
    return retArray;
  }
}
