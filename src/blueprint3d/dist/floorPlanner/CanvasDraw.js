let that;
export class CanvasDraw {
    constructor(canvasId, mousemoveCB) {
        this.gridConfig = {
            gridSpacing: 20,
            gridWidth: 1,
            gridColor: "#e0e0e0"
        };
        this.mode = "move"; // move draw delete
        this.mousemoveCB = [];
        this.mouseState = {
            down: false,
            curentX: 0,
            curentY: 0,
            lastX: 0,
            lastY: 0
        };
        this.mousemoveCB = mousemoveCB;
        that = this;
        this.canvas = {
            id: canvasId,
            element: document.getElementById(canvasId),
            context: document.getElementById(canvasId).getContext('2d')
        };
        window.addEventListener("resize", this.handleWindowResize);
        this.handleWindowResize();
        let canvasEle = this.canvas.element;
        canvasEle.addEventListener("mousedown", that.mousedown);
        canvasEle.addEventListener("mousemove", that.mousemove);
        canvasEle.addEventListener("mouseup", that.mouseup);
        canvasEle.addEventListener("mouseleave", that.mouseleave);
    }
    mousedown() {
        that.mouseState.down = true;
        that.mouseState.lastX = that.mouseState.curentX;
        that.mouseState.lastY = that.mouseState.curentY;
    }
    mousemove(event) {
        that.mouseState.curentX = event.offsetX;
        that.mouseState.curentY = event.offsetY;
        if (that.mode == 'move') {
            that.mousemoveCB.forEach((item) => {
                item(that.mouseState);
            });
        }
        if (that.mouseState.down) {
            that.mouseState.lastX = that.mouseState.curentX;
            that.mouseState.lastY = that.mouseState.curentY;
        }
        // move
        // dragging
    }
    mouseup() {
        that.mouseState.down = false;
    }
    mouseleave() { }
    handleWindowResize() {
        var canvasSel = that.canvas.element;
        var parent = canvasSel.parentNode;
        canvasSel.height = parent.clientHeight;
        canvasSel.width = parent.clientWidth;
        that.draw();
    }
    draw() {
        var canvasElement = this.canvas.element;
        var context = this.canvas.context;
        context.clearRect(0, 0, canvasElement.width, canvasElement.height);
        this.drawGrid();
    }
    calculateGridOffset(n) {
        let gridSpacing = this.gridConfig.gridSpacing;
        if (n >= 0) {
            return (n + gridSpacing / 2.0) % gridSpacing - gridSpacing / 2.0;
        }
        else {
            return (n - gridSpacing / 2.0) % gridSpacing + gridSpacing / 2.0;
        }
    }
    drawLine(startX, startY, endX, endY, width, color) {
        let context = this.canvas.context;
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(endX, endY);
        context.lineWidth = width;
        context.strokeStyle = color;
        context.stroke();
    }
    drawGrid() {
        let gridSpacing = this.gridConfig.gridSpacing;
        let gridWidth = this.gridConfig.gridWidth;
        let gridColor = this.gridConfig.gridColor;
        let canvasElement = this.canvas.element;
        var offsetX = 0; //this.calculateGridOffset(-this.originX);
        var offsetY = 0; //this.calculateGridOffset(-this.originY);
        var width = canvasElement.width;
        var height = canvasElement.height;
        for (var x = 0; x <= (width / gridSpacing); x++) {
            this.drawLine(gridSpacing * x + offsetX, 0, gridSpacing * x + offsetX, height, gridWidth, gridColor);
        }
        for (var y = 0; y <= (height / gridSpacing); y++) {
            this.drawLine(0, gridSpacing * y + offsetY, width, gridSpacing * y + offsetY, gridWidth, gridColor);
        }
    }
    getWidthHeight() {
        return {
            w: this.canvas.element.clientWidth,
            h: this.canvas.element.clientHeight
        };
    }
    drawPolygon(xArr, yArr, fill, fillColor, stroke, strokeColor, strokeWidth) {
        let context = this.canvas.context;
        // fillColor is a hex string, i.e. #ff0000
        fill = fill || false;
        stroke = stroke || false;
        context.beginPath();
        context.moveTo(xArr[0], yArr[0]);
        for (var i = 1; i < xArr.length; i++) {
            context.lineTo(xArr[i], yArr[i]);
        }
        context.closePath();
        if (fill) {
            context.fillStyle = fillColor;
            context.fill();
        }
        if (stroke) {
            context.lineWidth = strokeWidth;
            context.strokeStyle = strokeColor;
            context.stroke();
        }
    }
    /** */
    drawCircle(centerX, centerY, radius, fillColor) {
        let context = this.canvas.context;
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = fillColor;
        context.fill();
    }
}
//# sourceMappingURL=CanvasDraw.js.map