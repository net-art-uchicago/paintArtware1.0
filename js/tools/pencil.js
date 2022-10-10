/* global app */
window.tools.pencil = {
  name: 'pencil',
  icon: '/images/pencil-icon.png',
  state: {
    selected: false,
    mousePressed: false,
    prevMouse: { x: null, y: null }
  },
  events: {
    mousedown: function () {
      this.state.mousePressed = true
    },
    mouseup: function () {
      this.state.mousePressed = false
      this.state.prevMouse = { x: null, y: null }
    },
    mousemove: function (e) {
      // if this tool is selected AND the mouse is pressed
      if (this.state.selected && this.state.mousePressed) {
        const mouse = app.eventToMouse(e)
        const px = this.state.prevMouse.x || mouse.x
        const py = this.state.prevMouse.y || mouse.y
        // draw a line
        app.ctx.beginPath()
        app.ctx.moveTo(mouse.x, mouse.y)
        app.ctx.lineTo(px, py)
        app.ctx.closePath()
        app.ctx.stroke()
        // update prevMouse coordinates
        this.state.prevMouse = { x: mouse.x, y: mouse.y }
      }
    }
  }
}
