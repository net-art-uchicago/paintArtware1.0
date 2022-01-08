/* global app */
window.functions.addLayer = {
  name: 'add layer',
  type: 'Edit',
  run: function () {
    const name = `layer ${app.layers.length + 1}`
    const ele = app.createCanvas()
    app.createLayer({ name, ele })
  }
}
