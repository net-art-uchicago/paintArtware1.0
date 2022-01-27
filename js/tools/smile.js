window.tools.smile = {
    name: ':)',
    icon: '/images/smile-icon.png',
    state: {
      selected: false,
      mousePressed: false,
      //prevMouse: { x: null, y: null}
    },
    events: {
      mousedown: function () {
          const state = windows.tools.smile.state
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
            const time = Date.now()
        const speed = 0.01
        const scale = 10
        const oscilation = Math.sin(time * speed) * scale
        const size = Math.abs(oscilation)
        const mouse = C2D.eventToMouse(e)

        C2D.ellipse(mouse.x, mouse.y, size)
            //C2D.ellipse(mouse.x, mouse.y, size)
            // C2D.ellipse(mouse.x + (size/4), mouse.y + (size/4), size)
            // C2D.ellipse(mouse.x - (size/4), mouse.y + (size/4), size/5)
            // C2D.ellipse(mouse.x - (size/4), mouse.y + (size/4), size/5)
            // C2D.ellipse(mouse.x , mouse.y - (size/4), size/2)
            // C2D.rectangle(mouse.x, mouse.y - (size/6), size/2)

          }
      }
    }
  }
 

