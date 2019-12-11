import { FloorPlanner } from './floorPlanner/FloorPlanner';
import { simpleRoom, dao } from './model/model';
import { CanvasDraw } from './floorPlanner/CanvasDraw';
let that = null;
export default class Blueprint3d {
    constructor(canvasId) {
        // 只是为了控制台调试
        this.dao = dao;
        that = this;
        this.floorPlanner = new FloorPlanner();
        this.floorPlanner.setCanvasDraw(new CanvasDraw(canvasId, [
            // hover
            this.floorPlanner.overlappedWall,
            this.floorPlanner.moveWall,
        ]));
        this.floorPlanner.loadFloorplan(simpleRoom.floorplan);
        this.floorPlanner.resetOrigin();
        this.floorPlanner.draw();
        window.addEventListener("resize", this.handleWindowResize);
        this.handleWindowResize();
    }
    handleWindowResize() {
        that.floorPlanner.draw();
    }
}
//# sourceMappingURL=Blueprint3d.js.map