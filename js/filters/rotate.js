/* global C2D */
// rotate(i,j) = (j, w-1-i)
// index(i,j) = i*w + j
// index_inverse(x) = (floor(x/w), x mod w)
window.filters.rotate = {
  name: 'rotate right',
  run: function () {
    const pixels = C2D.getPixels()
    const pixels2 = C2D.getPixels()
    const w = C2D.width
    for (let x = 0; x < pixels.length; x++) {
      // calculate (i,j) value for index x
      const i = Math.floor(x / w)
      const j = x % w
      // calculate index value for (j, w-1-i)
      const y = (j * w) + w - 1 - i
      pixels2[y] = pixels[x]
    }
    C2D.setPixels(pixels2)
  }
}
