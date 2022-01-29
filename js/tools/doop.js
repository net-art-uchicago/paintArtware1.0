/* global C2D */
window.tools.doop = {
  name: 'doop tool',
  icon: '/images/app-icon.png',
  state: {
    selected: false,
    mousePressed: false
  },
  events: {
    mousedown: function () {
      const state = window.tools.doop.state
      state.mousePressed = true
    },
    mouseup: function () {
      const state = window.tools.doop.state
      state.mousePressed = false
    },
    mousemove: function (e) {
      const state = window.tools.doop.state
      if (state.selected && state.mousePressed) {
        const mouse = C2D.eventToMouse(e)
        C2D.ctx.font = '48px serif'
        C2D.ctx.textAlign = 'center'
        C2D.ctx.textBaseline = 'middle'
        C2D.ctx.fillText('doop!', mouse.x, mouse.y)
      }
    }
  }
}
