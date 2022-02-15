/* global C2D */
window.tools.rippleCircle = {
  name: 'Ripple Circle',
  icon: '/images/circle-icon.png',
  state: {
    selected: false,
    mousePressed: false,
    prevColor: null,
    timer: null,
    radius: 0
  },
  events: {
    mousedown: function (e) {
      const state = window.tools.rippleCircle.state
      const mouse = C2D.eventToMouse(e)
      state.mousePressed = true
      state.prevColor = C2D.fill
      let interval = 0
      if (state.selected) {
        state.timer = setInterval(() => {
          interval += 2
          state.radius = state.radius + 5 * interval
          C2D.fill = 'rgba(255, 255, 255, .5)'
          C2D.ellipse(mouse.x, mouse.y, state.radius)
        }, 1000)
      }
    },
    mouseup: function () {
      const state = window.tools.rippleCircle.state
      state.mousePressed = false
      C2D.fill = state.prevColor
      clearInterval(state.timer)
      state.radius = 0
    }
  }
}
