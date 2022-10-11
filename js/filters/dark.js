/* global app */
window.filters.dark = {
    name: 'dark',
    menu: 'Edit',
    run: function () {
      const imageData = app.ctx.getImageData(0, 0, app.canvas.width, app.canvas.height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] - 10 <= 0){ data[i] = 0 }
        else { data[i] -= 10 }

        if (data[i+1] - 10 <= 0){ data[i+1] = 0 }
        else { data[i+1] -= 10 }

        if (data[i+2] - 10 <= 0){ data[i+2] = 0 }
        else { data[i+2] -= 10 }
      }
      app.ctx.putImageData(imageData, 0, 0)
    }
  }
  