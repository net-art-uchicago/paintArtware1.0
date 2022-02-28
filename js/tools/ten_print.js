/* global C2D */
window.tools.ten_print = {
  name: 'ten_print',
  icon: '/images/ten-print.png',
<<<<<<< HEAD
  All_Pos: [],
=======
  AllPos: [],
>>>>>>> 7fcfa251f1163ae443ae6bbd5cf34e281ba32ebc
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
<<<<<<< HEAD
      const all_pos = window.tools.ten_print.All_Pos
=======
      const allPos = window.tools.ten_print.AllPos
>>>>>>> 7fcfa251f1163ae443ae6bbd5cf34e281ba32ebc
      let desiredWidth = 5

      try {
        desiredWidth = 5 * window.options.strokeWidth.state.width
      } catch (err) {
        desiredWidth = 5
      }

      const x_var = 2 * desiredWidth
      const y_var = 6 * desiredWidth

      const mouse_x = Math.floor(mouse.x / x_var) * x_var
      const mouse_y = Math.floor(mouse.y / y_var) * y_var

<<<<<<< HEAD
      let clearance_x = true;
      let clearance_y = true;
      let clearance  = true;

      for(i = 0; i < all_pos.length; i++){
        clearance_x = true;
        clearance_y = true;
        if ((Math.abs(mouse_x - all_pos[i][0]) < x_var))
          clearance_x = false;
        if ((Math.abs(mouse_y - all_pos[i][1]) < y_var))
          clearance_y = false;
        
          if(!clearance_x && !clearance_y)
            clearance = false;
      }

      if (state.selected && state.mousePressed && clearance) {
        window.tools.ten_print.All_Pos.push([mouse_x, mouse_y])
=======
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
>>>>>>> 7fcfa251f1163ae443ae6bbd5cf34e281ba32ebc
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
