window.tools.multiplePen = {
    name: 'Layered Pen Tool',
    icon: 'images/multiplePen2.png',
    state: {
      selected: false,
      mousePressed: false,
      prevMouse: { x: null, y: null }
    },
    events: {
      mousedown: function () {
        const state = window.tools.multiplePen.state
        state.mousePressed = true
      },
      mouseup: function () {
        const state = window.tools.multiplePen.state
        state.mousePressed = false
        state.prevMouse = { x: null, y: null }
      },
      mousemove: function (e) {
        const state = window.tools.multiplePen.state
        if (state.selected && state.mousePressed) {
          const mouse = C2D.eventToMouse(e)
          const px = state.prevMouse.x || mouse.x
          const py = state.prevMouse.y || mouse.y
          //console.log("no")
          C2D.line(mouse.x, mouse.y, px, py)
          C2D.line(mouse.x+4, mouse.y, px+4, py)
          C2D.line(mouse.x+8, mouse.y, px+8, py)
          C2D.line(mouse.x+12, mouse.y, px+12, py)
          C2D.line(mouse.x+16, mouse.y, px+16, py)
          state.prevMouse = { x: mouse.x, y: mouse.y }
        }
      }
    }
  } 