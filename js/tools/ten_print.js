/* global C2D */
window.tools.ten_print = {
  name: 'ten_print',
  icon: '/images/ten-print.png',
  All_Pos: [],
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
      const all_pos = window.tools.ten_print.All_Pos
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
