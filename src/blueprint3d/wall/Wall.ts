import { Utils } from '../utils/utils'
import { IWall } from './IWall'
import { ICorner } from '../corner/ICorner'
import { HalfEdge } from '../edge/Edge'
import { Configuration, configWallThickness, configWallHeight } from '../utils/configuration'

/** The default wall texture. */
const defaultWallTexture = {
  url: "rooms/textures/wallmap.png",
  stretch: true,
  scale: 0
}

export class Wall implements IWall {
  /** The unique id of each wall. */
  private id: string;
  /** Front is the plane from start to end. */
  public frontEdge!: HalfEdge | any;
  /** Back is the plane from end to start. */
  public backEdge!: HalfEdge | any;
  /** */
  public orphan = false;

  /** The front-side texture. */
  public frontTexture = defaultWallTexture;

  /** The back-side texture. */
  public backTexture = defaultWallTexture;

  /** Wall thickness. */
  public thickness = Configuration.getNumericValue(configWallThickness);

  /** Wall height. */
  public height = Configuration.getNumericValue(configWallHeight);
  private hoverActive = false
  /**
   * Constructs a new wall.
   * @param start Start corner.
   * @param end End corner.
   */
  constructor(private start: ICorner, private end: ICorner) {
    this.id = this.getUuid();
    // this.start.attachStart(this)
    // this.end.attachEnd(this);
  }

  private getUuid(): string {
    return [this.start.getId(), this.end.getId()].join();
  }

  public getHoverState(): boolean {
    return this.hoverActive
  }

  public resetFrontBack() {
    this.frontEdge = null;
    this.backEdge = null;
    this.orphan = false;
  }

  private snapToAxis(tolerance: number) {
    // order here is important, but unfortunately arbitrary
    this.start.snapToAxis(tolerance);
    this.end.snapToAxis(tolerance);
  }

  // public fireOnMove(func) {
  //   this.moved_callbacks.add(func);
  // }

  // public fireOnDelete(func) {
  //   this.deleted_callbacks.add(func);
  // }

  // public dontFireOnDelete(func) {
  //   this.deleted_callbacks.remove(func);
  // }

  // public fireOnAction(func) {
  //   this.action_callbacks.add(func)
  // }

  // public fireAction(action) {
  //   this.action_callbacks.fire(action)
  // }

  public relativeMove(dx: number, dy: number) {
    this.start.relativeMove(dx, dy);
    this.end.relativeMove(dx, dy);
    // console.error(this.id);
    // console.error(this.end.getId());


  }

  public fireMoved() {
    // this.moved_callbacks.fire();
  }

  public fireRedraw() {
    // if (this.frontEdge) {
    //   this.frontEdge.redrawCallbacks.fire();
    // }
    // if (this.backEdge) {
    //   this.backEdge.redrawCallbacks.fire();
    // }
  }

  public getStart(): ICorner {
    return this.start;
  }

  public getEnd(): ICorner {
    return this.end;
  }

  public getStartX(): number {
    return this.start.getX();
  }

  public getEndX(): number {
    return this.end.getX();
  }

  public getStartY(): number {
    return this.start.getY();
  }

  public getEndY(): number {
    return this.end.getY();
  }

  public remove() {
    // this.start.detachWall(this);
    // this.end.detachWall(this);
    // this.deleted_callbacks.fire(this);
  }

  // public setStart(corner: Corner) {
  public setStart(corner: any) {
    // this.start.detachWall(this);
    // corner.attachStart(this);
    // this.start = corner;
    // this.fireMoved();
  }

  // public setEnd(corner: Corner) {
  public setEnd(corner: any) {
    // this.end.detachWall(this);
    // corner.attachEnd(this);
    // this.end = corner;
    // this.fireMoved();
  }

  public distanceFrom(x: number, y: number): number {
    // console.error(this.getStartX(), this.getStartY(),
    //   this.getEndX(), this.getEndY(), 'distanceFrom');
    let a = Utils.pointDistanceFromLine(x, y,
      this.getStartX(), this.getStartY(),
      this.getEndX(), this.getEndY());
    // console.error(x, y, 12345);

    // console.error(this, 1234);

    return a
  }

  /** Return the corner opposite of the one provided.
   * @param corner The given corner.
   * @returns The opposite corner.
   */
  // private oppositeCorner(corner: Corner): Corner {
  private oppositeCorner(corner: any): any {
    if (this.start === corner) {
      return this.end;
    } else if (this.end === corner) {
      return this.start;
    } else {
      console.log('Wall does not connect to corner');
    }
  }
}
