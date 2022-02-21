/* global C2D */
window.tools.rippleCircle = {
  name: 'Ripple Circle',
  icon: '/images/circle-icon.png',
  state: {
    selected: false,
    mousePressed: false,
    prevColor: null,
    timer: null,
    radius: 0,
    rippleEffect: true
  },
  events: {
    mousedown: function () {
      const state = window.tools.rippleCircle.state
      state.mousePressed = true
      state.prevColor = C2D.fill
      state.radius = 0
      state.rippleEffect = true
      clearInterval(state.timer)
    },
    mouseup: function (e) {
      const state = window.tools.rippleCircle.state
      const mouse = C2D.eventToMouse(e)
      let interval = 0;
      if (state.selected && state.rippleEffect) {
        state.timer = setInterval(() => {
          interval += 2
          state.radius = state.radius + 5 * interval
          C2D.fill = 'rgba(255, 255, 255, .5)'
          C2D.ellipse(mouse.x, mouse.y, state.radius)
          if (interval == 30) {
            state.rippleEffect = false
            clearInterval(state.timer)
          }
          console.log(interval)
        }, 250)
      }
      state.mousePressed = false
      C2D.fill = state.prevColor
    }
  }
}
