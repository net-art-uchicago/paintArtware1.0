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

      let x_var = 2 * desiredWidth;
      let y_var = 6 * desiredWidth;

      let mouse_x = Math.floor(mouse.x / x_var) * x_var
      let mouse_y = Math.floor(mouse.y / y_var) * y_var

      if (state.selected && state.mousePressed &&
        (((Math.abs(mouse_x - currentPos[0]) >= 0)) ||
        (Math.abs(mouse_y - currentPos[1]) >= 0))) {
        window.tools.ten_print.currentPos = [mouse_x, mouse_y]
        let add1, add2, add3

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
