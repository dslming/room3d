import { Utils } from '../utils/utils';
import { Configuration, configWallThickness, configWallHeight } from '../utils/configuration';
/** The default wall texture. */
const defaultWallTexture = {
    url: "rooms/textures/wallmap.png",
    stretch: true,
    scale: 0
};
export class Wall {
    /**
     * Constructs a new wall.
     * @param start Start corner.
     * @param end End corner.
     */
    constructor(start, end) {
        this.start = start;
        this.end = end;
        /** */
        this.orphan = false;
        /** The front-side texture. */
        this.frontTexture = defaultWallTexture;
        /** The back-side texture. */
        this.backTexture = defaultWallTexture;
        /** Wall thickness. */
        this.thickness = Configuration.getNumericValue(configWallThickness);
        /** Wall height. */
        this.height = Configuration.getNumericValue(configWallHeight);
        this.hoverActive = false;
        this.id = this.getUuid();
        // this.start.attachStart(this)
        // this.end.attachEnd(this);
    }
    getUuid() {
        return [this.start.getId(), this.end.getId()].join();
    }
    getHoverState() {
        return this.hoverActive;
    }
    resetFrontBack() {
        this.frontEdge = null;
        this.backEdge = null;
        this.orphan = false;
    }
    snapToAxis(tolerance) {
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
    relativeMove(dx, dy) {
        this.start.relativeMove(dx, dy);
        this.end.relativeMove(dx, dy);
        // console.error(this.id);
        // console.error(this.end.getId());
    }
    fireMoved() {
        // this.moved_callbacks.fire();
    }
    fireRedraw() {
        // if (this.frontEdge) {
        //   this.frontEdge.redrawCallbacks.fire();
        // }
        // if (this.backEdge) {
        //   this.backEdge.redrawCallbacks.fire();
        // }
    }
    getStart() {
        return this.start;
    }
    getEnd() {
        return this.end;
    }
    getStartX() {
        return this.start.getX();
    }
    getEndX() {
        return this.end.getX();
    }
    getStartY() {
        return this.start.getY();
    }
    getEndY() {
        return this.end.getY();
    }
    remove() {
        // this.start.detachWall(this);
        // this.end.detachWall(this);
        // this.deleted_callbacks.fire(this);
    }
    // public setStart(corner: Corner) {
    setStart(corner) {
        // this.start.detachWall(this);
        // corner.attachStart(this);
        // this.start = corner;
        // this.fireMoved();
    }
    // public setEnd(corner: Corner) {
    setEnd(corner) {
        // this.end.detachWall(this);
        // corner.attachEnd(this);
        // this.end = corner;
        // this.fireMoved();
    }
    distanceFrom(x, y) {
        // console.error(this.getStartX(), this.getStartY(),
        //   this.getEndX(), this.getEndY(), 'distanceFrom');
        let a = Utils.pointDistanceFromLine(x, y, this.getStartX(), this.getStartY(), this.getEndX(), this.getEndY());
        // console.error(x, y, 12345);
        // console.error(this, 1234);
        return a;
    }
    /** Return the corner opposite of the one provided.
     * @param corner The given corner.
     * @returns The opposite corner.
     */
    // private oppositeCorner(corner: Corner): Corner {
    oppositeCorner(corner) {
        if (this.start === corner) {
            return this.end;
        }
        else if (this.end === corner) {
            return this.start;
        }
        else {
            console.log('Wall does not connect to corner');
        }
    }
}
//# sourceMappingURL=Wall.js.map