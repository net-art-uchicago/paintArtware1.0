/* global C2D */

window.tools.rainbow = {
  name: 'rainbow',
  icon: '/images/rainbow.jpg',
  cursor: '/images/fill-icon.png',
  state: {
    selected: false
  },
  events: {
    click: function () {
      if (window.tools.rainbow.state.selected) {
        const pixels = C2D.getPixels()
        const screenWidth = C2D.width
        const portion = (C2D.height / 35)

        let partialRow = 1
        let accumulator = 1

        function randomizeColor () {
          const colList = [Math.random(), Math.random(), Math.random()]
          const randomVar = Math.random()

          if (randomVar < 0.33) { colList[0] += ((100 * colList[0]) + 155) } else if (randomVar < 0.66) { colList[1] += ((100 * colList[1]) + 155) } else { colList[2] += ((100 * colList[2]) + 155) }

          for (let i = 0; i < colList.length; i++) {
            if (colList[i] < 155) { colList[i] *= 255 }
          }

          return colList
        }

        let colorList = randomizeColor()

        for (let i = 0; i < pixels.length; i++) {
          if (i >= (screenWidth * partialRow)) {
            partialRow++

            if (accumulator >= portion) {
              colorList = randomizeColor()
              accumulator = 0
            }

            accumulator++
          }

          pixels[i].r = colorList[0]
          pixels[i].g = colorList[1]
          pixels[i].b = colorList[2]
        }

        C2D.setPixels(pixels)
      }
    }
  }
}
