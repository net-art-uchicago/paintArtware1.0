/* global C2D */
window.tools.ten_print = {
  name: 'ten_print',
  icon: '/images/ten-print.png',
  AllPos: [],
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
      const allPos = window.tools.ten_print.AllPos
      let desiredWidth = 5

      try {
        desiredWidth = 5 * window.options.strokeWidth.state.width
      } catch (err) {
        desiredWidth = 5
      }

      const xVar = 2 * desiredWidth
      const yVar = 6 * desiredWidth

      const mouseX = Math.floor(mouse.x / xVar) * xVar
      const mouseY = Math.floor(mouse.y / yVar) * yVar

      let clearanceX = true
      let clearanceY = true
      let clearance = true

      for (let i = 0; i < allPos.length; i++) {
        clearanceX = true
        clearanceY = true
        if ((Math.abs(mouseX - allPos[i][0]) < xVar)) { clearanceX = false }
        if ((Math.abs(mouseY - allPos[i][1]) < yVar)) { clearanceY = false }

        if (!clearanceX && !clearanceY) { clearance = false }
      }

      if (state.selected && state.mousePressed && clearance) {
        window.tools.ten_print.AllPos.push([mouseX, mouseY])
        let add1, add2, add3

        if (Math.random() < 0.5) { add1 = desiredWidth } else { add1 = -desiredWidth }

        if (Math.random() < 0.5) { add2 = desiredWidth } else { add2 = -desiredWidth }

        if (Math.random() < 0.5) { add3 = desiredWidth } else { add3 = -desiredWidth }

        C2D.line(mouseX, mouseY, (mouseX + add1),
          (mouseY - 2 * desiredWidth))
        C2D.line(mouseX, mouseY, (mouseX + add2),
          (mouseY + 2 * desiredWidth))
        C2D.line((mouseX + add2), (mouseY + 2 * desiredWidth),
          (mouseX + add2 + add3), (mouseY + 4 * desiredWidth))
      }
    }
  }
}
