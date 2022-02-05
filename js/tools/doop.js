/* global C2D */
window.tools.doop = {
  name: 'doop tool',
  icon: '/images/app-icon.png',
  state: {
    selected: false,
    mousePressed: false,
    text: 'doop'
  },
  events: {
    mousedown: function () {
      const state = window.tools.doop.state
      state.mousePressed = true
      state.text = window.options.textOptions.state.text
    },
    mouseup: function () {
      const state = window.tools.doop.state
      state.mousePressed = false
    },
    mousemove: function (e) {
      const state = window.tools.doop.state
      if (state.selected && state.mousePressed) {
        const mouse = C2D.eventToMouse(e)
        C2D.text(state.text, mouse.x, mouse.y)
      }
    }
  }
}
