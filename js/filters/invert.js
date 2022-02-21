/* global C2D */
window.filters.invert = {
  name: 'invert',
  run: function () {
    const pixels = C2D.getPixels()
    for (let i = 0; i < pixels.length; i++) {
      pixels[i].r = 255 - pixels[i].r
      pixels[i].g = 255 - pixels[i].g
      pixels[i].b = 255 - pixels[i].b
    }
    C2D.setPixels(pixels)
  }
}
