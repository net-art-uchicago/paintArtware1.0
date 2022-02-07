/* global C2D */
window.tools.airBrush = {
  name: 'airbrush',
  icon: '/images/airbrush',
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
    },
    mousemove: function (e) {
      const state = window.tools.airBrush.state
      if (state.selected && state.mousePressed) {
        C2D.ctx.lineCap = 'butt'
        C2D.ctx.shadowOffsetX = 10
        C2D.ctx.shadowOffsetY = 10
        C2D.ctx.shadowBlur = 10
        C2D.ctx.shadowColor = C2D.fill
        const mouse = C2D.eventToMouse(e)
        const px = state.prevMouse.x || mouse.x
        const py = state.prevMouse.y || mouse.y
        C2D.line(mouse.x, mouse.y, px, py)
        state.prevMouse = { x: mouse.x, y: mouse.y }
      }
    }
  }
}
