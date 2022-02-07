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
        const mouse = C2D.eventToMouse(e)
        C2D.ellipse(mouse.X, mouse.Y, 70)
        C2D.ellipse(mouse.X - 60, mouse.Y, 60)
        C2D.ellipse(mouse.X + 60, mouse.Y, 60)
        C2D.ellipse(mouse.X + 45, mouse.y + 45, 60)
        C2D.ellipse(mouse.X - 45, mouse.Y - 45, 60)
        C2D.ellipse(mouse.X, mouse.Y - 60, 60)
        C2D.ellipse(mouse.X - 45, mouse.Y + 45, 60)
        C2D.ellipse(mouse.X + 45, mouse.Y - 45, 60)
        C2D.ellipse(mouse.X, mouse.Y + 60, 60)
      }
    }
  }
}
