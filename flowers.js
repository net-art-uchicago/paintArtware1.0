/* global C2D */
window.tools.flowers = {
  name: 'flowers',
  icon: '/images/flower-icon.png',
  state: {
    selected: false,
    mousePressed: false
  },
  events: {
    mousedown: function () {
      const state = window.tools.flowers.state
      state.mousePressed = true
    },
    mouseup: function () {
      const state = window.tools.flowers.state
      state.mousePressed = false
    },
    mousemove: function (e) {
      const state = window.tools.flowers.state
      if (state.selected && state.mousePressed) {
        const time = Date.now()
        const speed = 0.01
        const scale = 10
        const oscilation = Math.sin(time * speed) * scale
        const size = Math.abs(oscilation)
        const mouse = C2D.eventToMouse(e)

        C2D.ellipse(mouse.x, mouse.y, size)
      }
    }
  }
}

flowers() {
  C2D.ellipse(mouse.x, mouse.y, 20);
  C2D.ellipse(mouse.x, mouse.y, 20);
  C2D.ellipse(mouse.x, mouse.y, 20);
  C2D.ellipse(mouse.x, mouse.y, 20);
}
