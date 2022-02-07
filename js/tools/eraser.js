/* global C2D */
window.tools.eraser = {
  name: 'eraser',
  icon: '/images/EXAMPLE.png',
  state: {
    selected: false,
    mousePressed: false
  },
  events: {
    mousedown: function () {
      const state = window.tools.eraser.state
      state.mousePressed = true
    },
    mouseup: function () {
      const state = window.tools.eraser.state
      state.mousePressed = false
    },
    mousemove: function (e) {
      const state = window.tools.eraser.state
      if (state.selected && state.mousePressed) {
        const mouse = C2D.eventToMouse(e)
        const ctx = C2D.ctx
        const width = window.options.strokeWidth.state.width
        ctx.clearRect(mouse.x, mouse.y, width, width)
      }
    }
  }
}
