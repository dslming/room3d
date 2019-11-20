// 数据访问对象
class Dao {
    constructor() {
        this.corners = [];
        this.edges = [];
        this.walls = [];
        this.rooms = [];
        this.logs = [];
    }
    getData() {
        return {
            corners: this.corners,
            edges: this.edges,
            walls: this.walls,
            rooms: this.rooms,
        };
    }
    setData(obj) {
        obj.corners && (this.corners = obj.corners);
        obj.edges && (this.edges = obj.edges);
        obj.walls && (this.walls = obj.walls);
        obj.rooms && (this.rooms = obj.rooms);
        this.logs.push(`setData, ${obj.desc}:${JSON.stringify(obj)}, ${new Date()}`);
    }
}
export const dao = new Dao();
export const simpleRoom = {
    "floorplan": {
        "corners": {
            "f90da5e3-9e0e-eba7-173d-eb0b071e838e": { "x": 204.85099999999989, "y": 289.052 }, "da026c08-d76a-a944-8e7b-096b752da9ed": { "x": 672.2109999999999, "y": 289.052 }, "4e3d65cb-54c0-0681-28bf-bddcc7bdb571": { "x": 672.2109999999999, "y": -178.308 }, "71d4f128-ae80-3d58-9bd2-711c6ce6cdf2": { "x": 204.85099999999989, "y": -178.308 }
        },
        "walls": [
            {
                "corner1Id": "71d4f128-ae80-3d58-9bd2-711c6ce6cdf2",
                "corner2Id": "f90da5e3-9e0e-eba7-173d-eb0b071e838e",
                "frontTexture": {
                    "url": "rooms/textures/wallmap.png",
                    "stretch": true,
                    "scale": 0
                },
                "backTexture": {
                    "url": "rooms/textures/wallmap.png",
                    "stretch": true,
                    "scale": 0
                }
            },
            {
                "corner1Id": "f90da5e3-9e0e-eba7-173d-eb0b071e838e",
                "corner2Id": "da026c08-d76a-a944-8e7b-096b752da9ed",
                "frontTexture": {
                    "url": "rooms/textures/wallmap.png",
                    "stretch": true,
                    "scale": 0
                },
                "backTexture": {
                    "url": "rooms/textures/wallmap.png",
                    "stretch": true,
                    "scale": 0
                }
            },
            {
                "corner1Id": "da026c08-d76a-a944-8e7b-096b752da9ed",
                "corner2Id": "4e3d65cb-54c0-0681-28bf-bddcc7bdb571",
                "frontTexture": {
                    "url": "rooms/textures/wallmap.png",
                    "stretch": true,
                    "scale": 0
                },
                "backTexture": {
                    "url": "rooms/textures/wallmap.png",
                    "stretch": true,
                    "scale": 0
                }
            },
            {
                "corner1Id": "4e3d65cb-54c0-0681-28bf-bddcc7bdb571",
                "corner2Id": "71d4f128-ae80-3d58-9bd2-711c6ce6cdf2",
                "frontTexture": {
                    "url": "rooms/textures/wallmap.png",
                    "stretch": true,
                    "scale": 0
                },
                "backTexture": {
                    "url": "rooms/textures/wallmap.png",
                    "stretch": true,
                    "scale": 0
                }
            }
        ],
        "wallTextures": [],
        "floorTextures": {},
        "newFloorTextures": {}
    },
    "items": []
};
//# sourceMappingURL=model.js.map