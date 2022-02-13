/* global C2D */
window.tools.airBrush = {
  name: 'airbrush',
  icon: '/images/airbrush.png',
  state: {
    selected: false,
    mousePressed: false,
    prevMouse: { x: null, y: null }
  },

  events: {
    mousedown: function () {
      const state = window.tools.airBrush.state
      state.mousePressed = true
    },
    mouseup: function () {
      const state = window.tools.airBrush.state
      state.mousePressed = false
      state.prevMouse = { x: null, y: null }
      C2D.ctx.shadowOffsetX = 0
      C2D.ctx.shadowOffsetY = 0
      C2D.ctx.shadowBlur = 0
      C2D.ctx.shadowColor = C2D.fill
    },
    mousemove: function (e) {
      const state = window.tools.airBrush.state
      if (state.selected && state.mousePressed) {
        C2D.ctx.shadowOffsetX = 2
        C2D.ctx.shadowOffsetY = 2
        C2D.ctx.shadowBlur = 20
        C2D.ctx.shadowColor = C2D.stroke
        const mouse = C2D.eventToMouse(e)
        const px = state.prevMouse.x || mouse.x
        const py = state.prevMouse.y || mouse.y
        C2D.line(mouse.x, mouse.y, px, py)
        state.prevMouse = { x: mouse.x, y: mouse.y }
      }
    }
  }
}
