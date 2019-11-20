import { Utils } from '../utils/utils';
const THREE = window.THREE;
/**
 * Half Edges are created by Room.
 *
 * Once rooms have been identified, Half Edges are created for each interior wall.
 *
 * A wall can have two half edges if it is visible from both sides.
 */
export class HalfEdge {
    /** */
    // public redrawCallbacks = $.Callbacks();
    /**
     * Constructs a half edge.
     * @param room The associated room.
     * @param wall The corresponding wall.
     * @param front True if front side.
     */
    constructor(wall, front) {
        this.wall = wall;
        this.front = front;
        /** transform from world coords to wall planes (z=0) */
        this.interiorTransform = new THREE.Matrix4();
        /** transform from world coords to wall planes (z=0) */
        this.invInteriorTransform = new THREE.Matrix4();
        /** transform from world coords to wall planes (z=0) */
        this.exteriorTransform = new THREE.Matrix4();
        /** transform from world coords to wall planes (z=0) */
        this.invExteriorTransform = new THREE.Matrix4();
        this.front = front || false;
        this.offset = wall.thickness / 2.0;
        this.height = wall.height;
        if (this.front) {
            this.wall.frontEdge = this;
        }
        else {
            this.wall.backEdge = this;
        }
    }
    /**
     *
     */
    getTexture() {
        if (this.front) {
            return this.wall.frontTexture;
        }
        else {
            return this.wall.backTexture;
        }
    }
    /**
     *
     */
    setTexture(textureUrl, textureStretch, textureScale) {
        var texture = {
            url: textureUrl,
            stretch: textureStretch,
            scale: textureScale
        };
        if (this.front) {
            this.wall.frontTexture = texture;
        }
        else {
            this.wall.backTexture = texture;
        }
        // this.redrawCallbacks.fire();
    }
    /**
     * this feels hacky, but need wall items
     */
    generatePlane() {
        function transformCorner(corner) {
            return new THREE.Vector3(corner.x, 0, corner.y);
        }
        var v1 = transformCorner(this.interiorStart());
        var v2 = transformCorner(this.interiorEnd());
        var v3 = v2.clone();
        v3.y = this.wall.height;
        var v4 = v1.clone();
        v4.y = this.wall.height;
        var geometry = new THREE.Geometry();
        geometry.vertices = [v1, v2, v3, v4];
        geometry.faces.push(new THREE.Face3(0, 1, 2));
        geometry.faces.push(new THREE.Face3(0, 2, 3));
        geometry.computeFaceNormals();
        geometry.computeBoundingBox();
        this.plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
        this.plane.visible = false;
        this.plane.edge = this; // js monkey patch
        this.computeTransforms(this.interiorTransform, this.invInteriorTransform, this.interiorStart(), this.interiorEnd());
        this.computeTransforms(this.exteriorTransform, this.invExteriorTransform, this.exteriorStart(), this.exteriorEnd());
    }
    interiorDistance() {
        var start = this.interiorStart();
        var end = this.interiorEnd();
        return Utils.distance(start.x, start.y, end.x, end.y);
    }
    computeTransforms(transform, invTransform, start, end) {
        var v1 = start;
        var v2 = end;
        var angle = Utils.angle(1, 0, v2.x - v1.x, v2.y - v1.y);
        var tt = new THREE.Matrix4();
        tt.makeTranslation(-v1.x, 0, -v1.y);
        var tr = new THREE.Matrix4();
        tr.makeRotationY(-angle);
        transform.multiplyMatrices(tr, tt);
        invTransform.getInverse(transform);
    }
    /** Gets the distance from specified point.
     * @param x X coordinate of the point.
     * @param y Y coordinate of the point.
     * @returns The distance.
     */
    distanceTo(x, y) {
        // x, y, x1, y1, x2, y2
        return Utils.pointDistanceFromLine(x, y, this.interiorStart().x, this.interiorStart().y, this.interiorEnd().x, this.interiorEnd().y);
    }
    getStart() {
        if (this.front) {
            return this.wall.getStart();
        }
        else {
            return this.wall.getEnd();
        }
    }
    getEnd() {
        if (this.front) {
            return this.wall.getEnd();
        }
        else {
            return this.wall.getStart();
        }
    }
    getOppositeEdge() {
        if (this.front) {
            return this.wall.backEdge;
        }
        else {
            return this.wall.frontEdge;
        }
    }
    // these return an object with attributes x, y
    interiorEnd() {
        var vec = this.halfAngleVector(this, this.next);
        return {
            x: this.getEnd().x + vec.x,
            y: this.getEnd().y + vec.y
        };
    }
    interiorStart() {
        var vec = this.halfAngleVector(this.prev, this);
        return {
            x: this.getStart().x + vec.x,
            y: this.getStart().y + vec.y
        };
    }
    interiorCenter() {
        return {
            x: (this.interiorStart().x + this.interiorEnd().x) / 2.0,
            y: (this.interiorStart().y + this.interiorEnd().y) / 2.0,
        };
    }
    exteriorEnd() {
        var vec = this.halfAngleVector(this, this.next);
        return {
            x: this.getEnd().x - vec.x,
            y: this.getEnd().y - vec.y
        };
    }
    exteriorStart() {
        var vec = this.halfAngleVector(this.prev, this);
        return {
            x: this.getStart().x - vec.x,
            y: this.getStart().y - vec.y
        };
    }
    /** Get the corners of the half edge.
     * @returns An array of x,y pairs.
     */
    corners() {
        return [this.interiorStart(), this.interiorEnd(),
            this.exteriorEnd(), this.exteriorStart()];
    }
    /**
     * Gets CCW angle from v1 to v2
     */
    halfAngleVector(v1, v2) {
        // make the best of things if we dont have prev or next
        if (!v1) {
            var v1startX = v2.getStart().x - (v2.getEnd().x - v2.getStart().x);
            var v1startY = v2.getStart().y - (v2.getEnd().y - v2.getStart().y);
            var v1endX = v2.getStart().x;
            var v1endY = v2.getStart().y;
        }
        else {
            var v1startX = v1.getStart().x;
            var v1startY = v1.getStart().y;
            var v1endX = v1.getEnd().x;
            var v1endY = v1.getEnd().y;
        }
        if (!v2) {
            var v2startX = v1.getEnd().x;
            var v2startY = v1.getEnd().y;
            var v2endX = v1.getEnd().x + (v1.getEnd().x - v1.getStart().x);
            var v2endY = v1.getEnd().y + (v1.getEnd().y - v1.getStart().y);
        }
        else {
            var v2startX = v2.getStart().x;
            var v2startY = v2.getStart().y;
            var v2endX = v2.getEnd().x;
            var v2endY = v2.getEnd().y;
        }
        // CCW angle between edges
        var theta = Utils.angle2pi(v1startX - v1endX, v1startY - v1endY, v2endX - v1endX, v2endY - v1endY);
        // cosine and sine of half angle
        var cs = Math.cos(theta / 2.0);
        var sn = Math.sin(theta / 2.0);
        // rotate v2
        var v2dx = v2endX - v2startX;
        var v2dy = v2endY - v2startY;
        var vx = v2dx * cs - v2dy * sn;
        var vy = v2dx * sn + v2dy * cs;
        // normalize
        var mag = Utils.distance(0, 0, vx, vy);
        var desiredMag = (this.offset) / sn;
        var scalar = desiredMag / mag;
        var halfAngleVector = {
            x: vx * scalar,
            y: vy * scalar
        };
        return halfAngleVector;
    }
}
//# sourceMappingURL=Edge.js.map