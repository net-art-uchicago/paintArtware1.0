/* global C2D, Maths */
window.tools.vignette = {
  name: 'vignette',
  icon: '/images/vignette-icon.png',
  cursor: '/images/fill-icon.png',
  state: {
    selected: false
  },
  events: {
    click: function () {
      if (window.tools.vignette.state.selected) {
        const cx = C2D.width / 2
        const cy = C2D.height / 2
        const r0 = 10
        const r1 = cx
        const prevColor = C2D.ctx.fillStyle // store previous color
        const grd = C2D.ctx.createRadialGradient(cx, cy, r0, cx, cy, r1)
        const r = Maths.randomInt(0, 255)
        const g = Maths.randomInt(0, 255)
        const b = Maths.randomInt(0, 255)
        grd.addColorStop(0, `rgb(${r}, ${g}, ${b})`)
        grd.addColorStop(1, `rgb(${r / 2}, ${g / 2}, ${b / 2})`)
        C2D.fill = grd
        C2D.rect(0, 0, C2D.width, C2D.height)
        C2D.ctx.fillStyle = prevColor
      }
    }
  }
}
