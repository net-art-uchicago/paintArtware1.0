/*
  canvas2d.js

  this is a helper library for doing things with the HTML5 canvas element
  and the corresponding JavaScript Canvas API. It borrows many of the
  naming conventions from the popular/fantastic p5.js library. This
  library isn't meant to replace p5/processing, but is intead a "toy"
  library aimed at learning the native Canvas API as well as how
  JavaScript libraries are built.
*/

class C2D {
  static createCanvas (width, height) {
    const canvas = document.createElement('canvas')
    canvas.width = width || window.innerWidth
    canvas.height = height || window.innerHeight
    document.body.appendChild(canvas)

    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#fff'
    ctx.strokeStyle = '#000'
    /////
    ctx.newFillStyle = '#000'

    if (!this.canvas) {
      this.canvas = canvas
      this.ctx = ctx
    }

    return { canvas, ctx }
  }

  static get width () {
    return this.canvas.width
  }

  static set width (v) {
    this.canvas.width = v
  }

  static get height () {
    return this.canvas.height
  }

  static set height (v) {
    this.canvas.height = v
  }

  static get fill () {
    return this.ctx.fillStyle
  }

  static set fill (v) {
    this.ctx.fillStyle = v
  }
//////
  static get newFill () {
    return this.ctx.newFillStyle
  }

  static set newFill (v) {
    this.ctx.newFillStyle = v
  }
///////
  static get stroke () {
    return this.ctx.strokeStyle
  }

  static set stroke (v) {
    this.ctx.strokeStyle = v
  }


  static eventToMouse (e) {
    const offset = this.canvas.getBoundingClientRect()
    return {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y
    }
  }

  static getPixelData () {
    const imageData = this.ctx.getImageData(0, 0, this.width, this.height)
    return imageData.data
  }

  static getPixels () {
    const data = this.getPixelData()
    const pixels = []
    for (let i = 0; i < data.length; i += 4) {
      const pixel = {
        r: data[i],
        g: data[i + 1],
        b: data[i + 2],
        a: data[i + 3]
      }
      pixels.push(pixel)
    }
    return pixels
  }

  static setPixels (pixels) {
    const imageData = this.ctx.getImageData(0, 0, this.width, this.height)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      const idx = Math.floor(i / 4)
      data[i] = pixels[idx].r
      data[i + 1] = pixels[idx].g
      data[i + 2] = pixels[idx].b
      data[i + 3] = pixels[idx].a
    }
    this.ctx.putImageData(imageData, 0, 0)
  }

  static ellipse (x, y, w, h) {
    this.ctx.beginPath()
    this.ctx.ellipse(x, y, w, h || w, 0, 2 * Math.PI, false)
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.stroke()
  }

  static ellipse_full (x, y, w, h) {
    this.ctx.beginPath()
    this.ctx.ellipse(x, y, w, h || w, 0, 2 * Math.PI, false)
    this.ctx.closePath()
    this.ctx.fill()
    //t
  }

  static rect_full (x, y, w, h) {
    this.ctx.beginPath()
    this.ctx.rect(x, y, w, h)
    this.ctx.closePath()
    this.ctx.fill()
  }
  //////

  static rect (x, y, w, h) {
    this.ctx.beginPath()
    this.ctx.rect(x, y, w, h)
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.stroke()
  }

  static line (x1, y1, x2, y2) {
    this.ctx.beginPath()
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.closePath()
    this.ctx.stroke()
  }
}

window.C2D = C2D
