/* global C2D */
window.tools.glitch = {
  name: 'glitch',
  icon: '/images/glitch.jpg',
  cursor: '/images/fill-icon.png',
  state: {
    selected: false
  },
  events: {
    click: function () {
      if (window.tools.glitch.state.selected) {
        const pixels = C2D.getPixels()
        let partial = 0
        let red = (Math.random() + 0.1) * 200
        let green = (Math.random() + 0.1) * 200
        let blue = (Math.random() + 0.1) * 200
        pixels.forEach(pxl => {
          if (partial >= 30) {
            red = (Math.random() + 0.1) * 200
            green = (Math.random() + 0.1) * 200
            blue = (Math.random() + 0.1) * 200
            partial = 0
          }

          pxl.r = red
          pxl.g = green
          pxl.b = blue

          partial++
        })

        C2D.setPixels(pixels)
      }
    }
  }
}
