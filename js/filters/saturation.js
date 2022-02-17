/* global C2D */
window.filters.saturation = {
  name: 'saturation',
  run: function () {
    const functions = window.filters.saturation.functions
    const pixels = C2D.getPixels()
    for (let i = 0; i < pixels.length; i++) {
      const saturationValue = window.options.saturationValue.state.saturation / 50.0
      let [h, s, v] = C2D.rgb2hsv(pixels[i].r, pixels[i].g, pixels[i].b)
      s *= saturationValue // saturation change
      let [r, g, b] = C2D.hsv2rgb(h, s, v)
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
    }
  }
}
