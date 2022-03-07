/* global C2D */
window.tools.highlighter = {
    name: 'highlighter',
    icon: '/images/highlighter-icon.png',
    state: {
      selected: false,
      mousePressed: false,
      prevMouse: { x: null, y: null }
    },
    events: {
      mousedown: function () {
        const state = window.tools.highlighter.state
        state.mousePressed = true
      },
      mouseup: function () {
        const state = window.tools.highlighter.state
        state.mousePressed = false
        state.prevMouse = { x: null, y: null }
      },
      mousemove: function (e) {
        const state = window.tools.highlighter.state
        if (state.selected && state.mousePressed) {
          const mouse = C2D.eventToMouse(e)
          const px = state.prevMouse.x || mouse.x
          const py = state.prevMouse.y || mouse.y
          const initialOpacity = C2D.ctx.globalAlpha
            C2D.ctx.globalAlpha = 0.3
            C2D.line(mouse.x, mouse.y, px, py)
          state.prevMouse = { x: mouse.x, y: mouse.y }
          C2D.ctx.globalAlpha = initialOpacity
        }
      }
    }
  }