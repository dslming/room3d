export default interface ICanvasDraw {
  draw(): any
  getWidthHeight(): any
  drawCircle(centerX: any, centerY: any, radius: any, fillColor: any): void
  drawLine(startX: number, startY: number, endX: number, endY: number, width: number, color: string): void
}
