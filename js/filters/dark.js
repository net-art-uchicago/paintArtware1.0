/* global app */
window.filters.dark = {
    name: 'dark',
    menu: 'Edit',
    run: function () {
      const imageData = app.ctx.getImageData(0, 0, app.canvas.width, app.canvas.height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        if (data[i+4] + 20 >= 255){
            data[i+4] = 255
        }
        else {
            data[i+4] += 20
        }
        // data[i] = 255 - data[i] // red
        // data[i + 1] = 255 - data[i + 1] // green
        // data[i + 2] = 255 - data[i + 2] // blue
      }
      app.ctx.putImageData(imageData, 0, 0)
    }
  }
  