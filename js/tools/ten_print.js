/* global C2D */
window.tools.ten_print = {
  name: 'ten_print',
  icon: '/images/ten-print.png',
  currentPos: [0, 0],
  state: {
    selected: false,
    mousePressed: false
  },
  events: {
    mousedown: function () {
      const state = window.tools.ten_print.state
      state.mousePressed = true
    },
    mouseup: function () {
      const state = window.tools.ten_print.state
      state.mousePressed = false
    },
    mousemove: function (e) {
      const state = window.tools.ten_print.state
      const mouse = C2D.eventToMouse(e)
      const currentPos = window.tools.ten_print.currentPos
      let desiredWidth = 5

      try {
        desiredWidth = 5 * window.options.strokeWidth.state.width
      } catch (err) {
        desiredWidth = 5
      }

      if (state.selected && state.mousePressed &&
        (((Math.abs(mouse.x - currentPos[0]) >= desiredWidth)) ||
        (Math.abs(mouse.y - currentPos[1]) >= desiredWidth))) {
        window.tools.ten_print.currentPos = [mouse.x, mouse.y]
        let add1, add2
        if (Math.random() < 0.5) { add1 = desiredWidth } else { add1 = -desiredWidth }

        if (Math.random() < 0.5) { add2 = desiredWidth } else { add2 = -desiredWidth }

        C2D.line(mouse.x, mouse.y, (mouse.x + add1),
          (mouse.y - 2 * desiredWidth))
        C2D.line(mouse.x, mouse.y, (mouse.x + add2),
          (mouse.y + desiredWidth))
      }
    }
  }
}
