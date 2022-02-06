// function rgb2hsv (r, g, b) {
//   let H = 0
//   let S = 0
//   let V = 0

//   r /= 255; g /= 255; b /= 255
//   const minRGB = Math.min(r, Math.min(g, b))
//   const maxRGB = Math.max(r, Math.max(g, b))
//   // Black-gray-white
//   if (minRGB === maxRGB) {
//     V = minRGB
//     return [0, 0, V]
//   }
//   // Colors other than black-gray-white:
//   const d = (r === minRGB) ? g - b : ((b === minRGB) ? r - g : b - r)
//   const h = (r === minRGB) ? 3 : ((b === minRGB) ? 1 : 5)
//   H = 60 * (h - d / (maxRGB - minRGB))
//   S = (maxRGB - minRGB) / maxRGB
//   V = maxRGB
//   return [H, S, V]
// }

function truncate (colorValue) {
  if (colorValue > 255) {
    return 255
  }
  if (colorValue < 0) {
    return 0
  }
  return colorValue
}

function adjustContrast (r, g, b, contrastChange) {
  const factor = (259 * (255 + contrastChange)) / (255 * (259 - contrastChange))
  if (contrastChange !== 0) {
    r = truncate(factor * (r - 128) + 128)
    g = truncate(factor * (g - 128) + 128)
    b = truncate(factor * (b - 128) + 128)
  }
  return [r, g, b]
}

function rgb2hsv (r, g, b) {
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
}

function hsv2rgb (h, s, v) {
  let r, g, b, i, f, p, q, t
  i = Math.floor(h * 6)
  f = h * 6 - i
  p = v * (1 - s)
  q = v * (1 - f * s)
  t = v * (1 - (1 - f) * s)
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

/* global C2D */
window.filters.saturation = {
  name: 'saturation',
  run: function () {
    // const ctx = C2D.ctx
    // ctx.globalCompositeOperation = 'saturation'
    // ctx.fillStyle = 'red'
    // ctx.globalAlpha = 1 // alpha 0 = no effect 1 = full effect
    // ctx.fillRect(0, 0, C2D.width, C2D.height)
    const pixels = C2D.getPixels()
    for (let i = 0; i < pixels.length; i++) {
      const saturationValue = window.options.saturationValue.state.saturation / 50.0
      let [h, s, v] = rgb2hsv(pixels[i].r, pixels[i].g, pixels[i].b)
      s *= saturationValue
      let [r, g, b] = hsv2rgb(h, s, v)
      const colors = adjustContrast(r, g, b, (saturationValue - 1) * Math.pow(saturationValue, 7))
      r = colors[0]
      g = colors[1]
      b = colors[2]
      pixels[i].r = r
      pixels[i].g = g
      pixels[i].b = b
    }
    C2D.setPixels(pixels)
  }
}
