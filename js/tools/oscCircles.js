/* global C2D */
window.tools.oscCircles = {
  name: 'oscilating circles',
  icon: '/images/osc-icon.png',
  state: {
    selected: false,
    mousePressed: false
  },
  events: {
    mousedown: function () {
      const state = window.tools.oscCircles.state
      state.mousePressed = true
    },
    mouseup: function () {
      const state = window.tools.oscCircles.state
      state.mousePressed = false
    },
    mousemove: function (e) {
      const state = window.tools.oscCircles.state
      if (state.selected && state.mousePressed) {
        const time = Date.now()
        const speed = 0.01
        const scale = 10
        const oscilation = Math.sin(time * speed) * scale
        const size = Math.abs(oscilation)
        const mouse = C2D.eventToMouse(e)

        C2D.ellipse(mouse.x, mouse.y, size)
      }
    }
  }
}
