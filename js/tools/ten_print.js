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
        (((Math.abs(mouse.x - currentPos[0]) >= 3 * desiredWidth)) ||
        (Math.abs(mouse.y - currentPos[1]) >= 6 * desiredWidth))) {
        window.tools.ten_print.currentPos = [mouse.x, mouse.y]
        let add1, add2, add3
        let mouse_x = Math.floor(mouse.x / 10) * 10
        let mouse_y = Math.floor(mouse.y / 10) * 10

        if (Math.random() < 0.5) { add1 = desiredWidth } else { add1 = -desiredWidth }

        if (Math.random() < 0.5) { add2 = desiredWidth } else { add2 = -desiredWidth }

        if (Math.random() < 0.5) { add3 = desiredWidth } else { add3 = -desiredWidth }

        C2D.line(mouse_x, mouse_y, (mouse_x + add1),
          (mouse_y - 2 * desiredWidth))
        C2D.line(mouse_x, mouse_y, (mouse_x + add2),
          (mouse_y + 2 * desiredWidth))
        C2D.line((mouse_x + add2), (mouse_y + 2 * desiredWidth),
        (mouse_x + add2 + add3), (mouse_y + 4 * desiredWidth))
      }
    }
  }
}
