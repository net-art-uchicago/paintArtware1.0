/* global C2D */
window.filters.waves = {
  name: 'waves',
  run: function () {
    const pixels = C2D.getPixels()
    for (let i = 0; i < pixels.length; i++) {
      const s = Math.abs(Math.sin(i * 0.0001) * 255)
      pixels[i].r = s - pixels[i].r
      pixels[i].g = s - pixels[i].g
      pixels[i].b = s - pixels[i].b
    }
    C2D.setPixels(pixels)
  }
}
