import { ICorner } from '../corner/ICorner'
import { IWall } from '../wall/IWall'
import { IFloorPlanner } from '../floorPlanner/IFloorPlanner'
import { Utils } from '../utils/utils'
import { HalfEdge } from '../edge/Edge'
const THREE = (window as any).THREE

// / <reference path="../core/utils.ts" />
// / <reference path="corner.ts" />
// / <reference path="floorplan.ts" />
// / <reference path="half_edge.ts" />

/*
TODO
var Vec2 = require('vec2')
var segseg = require('segseg')
var Polygon = require('polygon')
*/


/** Default texture to be used if nothing is provided. */
const defaultRoomTexture = {
  url: "rooms/textures/hardwood.png",
  scale: 400
}

/**
 * A Room is the combination of a Floorplan with a floor plane.
 */
export class Room {

  /** */
  public interiorCorners: ICorner[] = [];

  /** */
  private edgePointer = null;

  /** floor plane for intersection testing */
  public floorPlane!: any;

  /** */
  private customTexture = false;

  /** */
  // private floorChangeCallbacks = $.Callbacks();

  /**
   *  ordered CCW
   */
  constructor(private floorplan: IFloorPlanner, public corners: ICorner[]) {
    this.updateWalls();
    this.updateInteriorCorners();
    this.generatePlane();
  }

  private getUuid(): string {
    var cornerUuids = Utils.map(this.corners, function (c: { id: any; }) {
      return c.id;
    });
    cornerUuids.sort();
    return cornerUuids.join();
  }

  // public fireOnFloorChange(callback) {
  //   this.floorChangeCallbacks.add(callback);
  // }

  private getTexture() {
    var uuid = this.getUuid();
    var tex = this.floorplan.getFloorTexture(uuid);
    return tex || defaultRoomTexture;
  }

  /**
   * textureStretch always true, just an argument for consistency with walls
   */
  private setTexture(textureUrl: string, textureStretch: any, textureScale: number) {
    var uuid = this.getUuid();
    this.floorplan.setFloorTexture(uuid, textureUrl, textureScale);
    // this.floorChangeCallbacks.fire();
  }

  private generatePlane() {
    var points: any = [];
    this.interiorCorners.forEach((corner) => {
      points.push(new THREE.Vector2(
        corner.x,
        corner.y));
    });
    var shape = new THREE.Shape(points);
    var geometry = new THREE.ShapeGeometry(shape);
    this.floorPlane = new THREE.Mesh(geometry,
      new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide
      }));
    this.floorPlane.visible = false;
    this.floorPlane.rotation.set(Math.PI / 2, 0, 0);
    (<any>this.floorPlane).room = this; // js monkey patch
  }

  private cycleIndex(index: number) {
    if (index < 0) {
      return index += this.corners.length;
    } else {
      return index % this.corners.length;
    }
  }

  private updateInteriorCorners() {
    var edge: any = this.edgePointer;
    while (true) {
      this.interiorCorners.push(edge.interiorStart());
      edge.generatePlane();
      if (edge.next === this.edgePointer) {
        break;
      } else {
        edge = edge.next;
      }
    }
  }

  /**
   * Populates each wall's half edge relating to this room
   * this creates a fancy doubly connected edge list (DCEL)
   */
  private updateWalls() {

    var prevEdge = null;
    var firstEdge = null;

    for (var i = 0; i < this.corners.length; i++) {
      var firstCorner: any = this.corners[i];
      var secondCorner: any = this.corners[(i + 1) % this.corners.length];

      // find if wall is heading in that direction
      var wallTo = firstCorner.wallTo(secondCorner);
      var wallFrom = firstCorner.wallFrom(secondCorner);
      var edge: any
      if (wallTo) {
        edge = new HalfEdge(wallTo, true);
      } else if (wallFrom) {
        edge = new HalfEdge(wallFrom, false);
      } else {
        // something horrible has happened
        console.log("corners arent connected by a wall, uh oh");
      }

      if (i == 0) {
        firstEdge = edge;
      } else {
        edge.prev = prevEdge;
        prevEdge.next = edge;
        if (i + 1 == this.corners.length) {
          firstEdge.prev = edge;
          edge.next = firstEdge;
        }
      }
      prevEdge = edge;
    }

    // hold on to an edge reference
    this.edgePointer = firstEdge;
  }
}
