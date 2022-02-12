/* global C2D */
window.filters.saturation = {
  name: 'saturation',
  run: function () {
    const functions = window.filters.saturation.functions
    const pixels = C2D.getPixels()
    for (let i = 0; i < pixels.length; i++) {
      const saturationValue = window.options.saturationValue.state.saturation / 50.0
      let [h, s, v] = functions.rgb2hsv(pixels[i].r, pixels[i].g, pixels[i].b)
      s *= saturationValue // saturation change
      let [r, g, b] = functions.hsv2rgb(h, s, v)
      // increase contrast at high saturation
      const colors = functions.adjustContrast(r, g, b, (saturationValue - 1) * Math.pow(saturationValue, 7))
      r = colors[0]
      g = colors[1]
      b = colors[2]
      pixels[i].r = r
      pixels[i].g = g
      pixels[i].b = b
    }
    C2D.setPixels(pixels)
  },
  functions: {
    truncate: function (colorValue) {
      // keep color values in [0,255]
      if (colorValue > 255) {
        return 255
      }
      if (colorValue < 0) {
        return 0
      }
      return colorValue
    },

    adjustContrast: function (r, g, b, contrastChange) {
      // increase contrast
      const functions = window.filters.saturation.functions
      const factor = (259 * (255 + contrastChange)) / (255 * (259 - contrastChange))
      if (contrastChange !== 0) {
        r = functions.truncate(factor * (r - 128) + 128)
        g = functions.truncate(factor * (g - 128) + 128)
        b = functions.truncate(factor * (b - 128) + 128)
      }
      return [r, g, b]
    },

    rgb2hsv: function (r, g, b) {
      // conver rgb value to hsv
      r /= 255
      g /= 255
      b /= 255

      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      let h = max
      let s = max
      const v = max
      const d = max - min
      s = max === 0 ? 0 : d / max

      if (max === min) {
        h = 0 // achromatic
      } else {
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0)
            break
          case g:
            h = (b - r) / d + 2
            break
          case b:
            h = (r - g) / d + 4
            break
        }
        h /= 6
      }
      return [h, s, v]
    },
    hsv2rgb: function (h, s, v) {
      // convert hsv value to rgb
      let r, g, b
      const i = Math.floor(h * 6)
      const f = h * 6 - i
      const p = v * (1 - s)
      const q = v * (1 - f * s)
      const t = v * (1 - (1 - f) * s)
      switch (i % 6) {
        case 0:
          r = v
          g = t
          b = p
          break
        case 1:
          r = q
          g = v
          b = p
          break
        case 2:
          r = p
          g = v
          b = t
          break
        case 3:
          r = p
          g = q
          b = v
          break
        case 4:
          r = t
          g = p
          b = v
          break
        case 5:
          r = v
          g = p
          b = q
          break
      }
      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
    }
  }
}
