/* global C2D */
window.options.c2dFilters = {
    name: 'c2d filters',
    run: function () {
      const div = document.createElement('div')
      div.innerHTML = `
        <button id="blur">blur</button>
        <button id="bright">brighten</button>
        <button id="dark">darken</button>
        <button id="hue">hue-rotate</button>
        <button id="sepia">sepia</button>
    `
      const blur = div.querySelector('#blur')
      const bright = div.querySelector('#bright')
      const dark = div.querySelector('#dark')
      const hue = div.querySelector('#hue')
      const sepia = div.querySelector('#sepia')

      blur.addEventListener('click', () => {
        C2D.ctx.filter = 'blur(3px)'
        C2D.ctx.drawImage(C2D.canvas, 0, 0, C2D.width, C2D.height)
      })

      bright.addEventListener('click', () => {
        C2D.ctx.filter = "brightness(105%)"
        C2D.ctx.drawImage(C2D.canvas, 0, 0, C2D.width, C2D.height)
      })

      dark.addEventListener('click', () => {
        C2D.ctx.filter = "brightness(95%)"
        C2D.ctx.drawImage(C2D.canvas, 0, 0, C2D.width, C2D.height)
      })
      
      hue.addEventListener('click', () => {
        C2D.ctx.filter = "hue-rotate(90deg)"
        C2D.ctx.drawImage(C2D.canvas, 0, 0, C2D.width, C2D.height)
      })

      sepia.addEventListener('click', () => {
        console.log("sepia")
        C2D.ctx.filter = 'sepia(100%)'
        C2D.ctx.drawImage(C2D.canvas, 0, 0, C2D.width, C2D.height)
      })

      return div
    }
  }
  