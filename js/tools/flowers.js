/* global C2D */
window.tools.flowers = {
  name: 'flowers',
  icon: '/images/new-flower-icon.png',
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
        const mouse = C2D.eventToMouse(e)
        const scale = 3
        //  center of flower
        C2D.fill = 'rgba(235, 219, 52)'
        C2D.ellipse(mouse.x, mouse.y, 10 * scale + 3)
        //  flower petals
        C2D.fill = 'rgba(208, 85, 230)'
        C2D.ellipse(mouse.x - 60, mouse.y, 10 * scale)
        C2D.ellipse(mouse.x + 60, mouse.y, 10 * scale)
        C2D.ellipse(mouse.x + 45, mouse.y + 45, 10 * scale)
        C2D.ellipse(mouse.x - 45, mouse.y - 45, 10 * scale)
        C2D.ellipse(mouse.x, mouse.y - 60, 10 * scale)
        C2D.ellipse(mouse.x - 45, mouse.y + 45, 10 * scale)
        C2D.ellipse(mouse.x + 45, mouse.y - 45, 10 * scale)
        C2D.ellipse(mouse.x, mouse.y + 60, 10 * scale)
      }
    }
  }
}
