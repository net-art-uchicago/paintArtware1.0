/* global C2D */
window.filters.rotate = {
  name: 'rotate right',
  run: function () {
    const ctx = C2D.ctx
    // copy canvas to redraw
    const canvasCopy = document.createElement('canvas')
    canvasCopy.width = C2D.width
    canvasCopy.height = C2D.height
    const ctxCopy = canvasCopy.getContext('2d')
    ctxCopy.drawImage(C2D.canvas, 0, 0)
    // clear canvas
    ctx.clearRect(0, 0, C2D.width, C2D.height)
    // rotate and redraw
    ctx.rotate(90 * Math.PI / 180)
    ctx.drawImage(canvasCopy, 0, -C2D.height)
    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }
}
