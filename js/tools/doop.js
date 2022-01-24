/* global C2D */
window.tools.doop = {
  name: 'doop tool',
  icon: '/images/app-icon.png',
  state: {
    selected: false,
    isWorking: false // sad :(
  },
  events: {
    click: function (e) {
      if (window.tools.doop.state.selected) {
        // borrowed + very mildly edited from C2D example docs
        const mouse = C2D.eventToMouse(e)
        C2D.ctx.font = '48px serif'
        C2D.ctx.stroketext('doop!', mouse.x, mouse.y)
      }
    }
  }
}
