window.tools.smile = {
    name: ':)',
    icon: '/images/smile-icon.png',
    state: {
        selected: false,
        mousePressed: false
      },
      events: {
        mousedown: function () {
          const state = window.tools.smile.state
          state.mousePressed = true
        },
        mouseup: function () {
          const state = window.tools.smile.state
          state.mousePressed = false
        },
        mousemove: function (e) {
          const state = window.tools.smile.state
          if (state.selected && state.mousePressed) {
            const mouse = C2D.eventToMouse(e)
            o_fill = C2D_fill
            o_stroke = C2D.stroke
            //switch_colors()
            C2D.ellipse(mouse.x, mouse.y, 100)
            switch_colors()
            C2D.ellipse(mouse.x , mouse.y + (100/4), 100/1.5, 100/2.5)
            C2D.ellipse(mouse.x + (100/3), mouse.y - 20, 100/9)
            C2D.ellipse(mouse.x - (100/3), mouse.y - 20, 100/9)
            one_colors(o_fill)
            C2D.ellipse(mouse.x , mouse.y + 100/5, 70, 35)
            one_color(o_stroke)
            C2D.ellipse(mouse.x + (100/3), mouse.y - 20, 100/10, 100/5)
            C2D.ellipse(mouse.x - (100/3), mouse.y - 20, 100/10, 100/5)
            original_colors()
            
          }
        }
      }
    }
    