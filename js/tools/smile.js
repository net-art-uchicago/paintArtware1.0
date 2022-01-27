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
            C2D.ellipse(mouse.x, mouse.y, 100)
            C2D.ellipse(mouse.x + (100/4), mouse.y + (100/4), 100/10)
            C2D.ellipse(mouse.x - (100/4), mouse.y + (100/4), 100/10)
            C2D.ellipse(mouse.x , mouse.y - (100/3), 100/2)
            C2D.rect(mouse.x, mouse.y - (100/6), 100/2)
          }
        }
      }
    }
    