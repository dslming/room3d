import { Utils } from '../utils/utils'
import { Corner } from '../corner/Corner'
import { ICorner } from '../corner/ICorner'
import { IWall } from '../wall/IWall'
import { Wall } from '../wall/Wall'
import { dao } from '../model/model'
import { Room } from '../room/Room'
import { IFloorPlanner } from './IFloorPlanner'
import { HalfEdge } from '../edge/Edge'
import ICanvasDraw from './ICanvasDraw'
export const floorplannerModes = {
  MOVE: 0,
  DRAW: 1,
  DELETE: 2
}
const roomColor = "#f9f9f9";
// corner config
const cornerRadius = 0
const cornerRadiusHover = 7
const cornerColor = "#cccccc"
const cornerColorHover = "#008cba"

// wall config
const wallWidth = 5;
const wallWidthHover = 7;
const wallColor = "#dddddd"
const wallColorHover = "#008cba"
const edgeColor = "#888888"
const edgeColorHover = "#008cba"
const edgeWidth = 1
const deleteColor = "#ff0000";
const defaultFloorPlanTolerance = 10.0;
/** how much will we move a corner to make a wall axis aligned (cm) */
const snapTolerance = 25;

let that: any = null
export class FloorPlanner {
  private originX = 0
  private originY = 0
  private cmPerPixel: any
  private pixelsPerCm: any
  private canvasDraw!: ICanvasDraw
  private hoverActiveIndex: number = -1
  constructor() {
    var cmPerFoot = 30.48;
    var pixelsPerFoot = 15.0;
    this.cmPerPixel = cmPerFoot * (1.0 / pixelsPerFoot);
    this.pixelsPerCm = 1.0 / this.cmPerPixel;
    that = this
  }

  public setCanvasDraw(canvasDraw: ICanvasDraw) {
    this.canvasDraw = canvasDraw
  }

  /**
   * name
   */
  public moveWall(obj: any) {
    if (!obj.down) {
      return
    }
    let walls: any[] = dao.getData().walls
    for (var i = 0; i < walls.length; i++) {
      if (walls[i].getHoverState()) {
        let dx = (obj.curentX - obj.lastX) * that.cmPerPixel
        let dy = (obj.curentY - obj.lastY) * that.cmPerPixel
        walls[i].relativeMove(dx, dy)
        walls[i].snapToAxis(snapTolerance);
        that.draw()
      }
    }
  }

  // hover
  public overlappedWall(obj: any): void {
    let x = obj.curentX * that.cmPerPixel + that.originX * that.cmPerPixel;
    let y = obj.curentY * that.cmPerPixel + that.originY * that.cmPerPixel;

    let { walls } = dao.getData()
    let tolerance = defaultFloorPlanTolerance;

    for (var i = 0; i < walls.length; i++) {
      if (walls[i].distanceFrom(x, y) < tolerance) {
        walls[i].hoverActive = true
        dao.setData({
          walls,
          desc: `overlappedWall, ${walls[i].id}`
        })
        that.hoverActiveIndex = i
      } else {
        if (walls[i].hoverActive == true) {
          walls[that.hoverActiveIndex].hoverActive = false
          dao.setData({
            walls,
            desc: `overlappedWall, ${walls[i].id}`
          })
        }
      }
    }

    that.draw()
  }

  private getDimensions(center: any) {
    const THREE: any = (window as any).THREE
    center = center || false; // otherwise, get size

    var xMin = Infinity;
    var xMax = -Infinity;
    var zMin = Infinity;
    var zMax = -Infinity;
    let { corners } = dao.getData()
    corners.forEach((corner: ICorner) => {
      if (corner.x < xMin) xMin = corner.x;
      if (corner.x > xMax) xMax = corner.x;
      if (corner.y < zMin) zMin = corner.y;
      if (corner.y > zMax) zMax = corner.y;
    });
    var ret;
    if (xMin == Infinity || xMax == -Infinity || zMin == Infinity || zMax == -Infinity) {
      ret = new THREE.Vector3();
    } else {
      if (center) {
        // center
        ret = new THREE.Vector3((xMin + xMax) * 0.5, 0, (zMin + zMax) * 0.5);
      } else {
        // size
        ret = new THREE.Vector3((xMax - xMin), 0, (zMax - zMin));
      }
    }
    return ret;
  }

  /**
  * Sets the origin so that floorplan is centered
  * 设置原点，使平面图居中
  */
  public resetOrigin() {
    let { w, h } = this.canvasDraw.getWidthHeight()
    let centerX = w / 2
    let centerY = h / 2
    var centerFloorplan = this.getDimensions(true);
    this.originX = centerFloorplan.x * this.pixelsPerCm - centerX;
    this.originY = centerFloorplan.z * this.pixelsPerCm - centerY;
  }

  private convertY(y: number): number {
    return (y - this.originY * this.cmPerPixel) * this.pixelsPerCm;
  }

  private convertX(x: number): number {
    return (x - this.originX * this.cmPerPixel) * this.pixelsPerCm;
  }

  private drawWall(wall: Wall) {
    this.canvasDraw.drawLine(
      this.convertX(wall.getStartX()),
      this.convertY(wall.getStartY()),
      this.convertX(wall.getEndX()),
      this.convertY(wall.getEndY()),
      wallWidth,
      wall.getHoverState() ? wallColorHover : wallColor
    );
  }

  private newCorner(x: number, y: number, id?: string): Corner {
    let corner = new Corner(x, y, id);
    let { corners } = dao.getData()
    corners.push(corner)
    dao.setData({
      corners
    })
    return corner;

  }

  private newWall(start: ICorner, end: ICorner): IWall {
    let wall = new Wall(start, end);
    let { walls } = dao.getData()
    walls.push(wall)
    dao.setData({
      walls,
      desc: `newWall`

    })
    return wall;
  }

  public loadFloorplan(floorplan: any) {
    let corners: any = {};
    if (floorplan == null || !('corners' in floorplan) || !('walls' in floorplan)) {
      return
    }

    for (var id in floorplan.corners) {
      let corner = floorplan.corners[id];
      corners[id] = this.newCorner(corner.x, corner.y, id);
    }

    floorplan.walls.forEach((wall: any) => {
      this.newWall(corners[wall.corner1Id], corners[wall.corner2Id]);
    });
  }

  public draw() {
    let { walls, rooms, corners } = dao.getData()
    this.canvasDraw.draw()

    walls.forEach((wall: any) => {
      this.drawWall(wall);
    });
    // console.error('draw');

  }
}
