/* global app */
window.options.lineWidth = {
  name: 'line width',
  run: function () {
    const slider = document.createElement('input')
    slider.setAttribute('type', 'range')
    slider.setAttribute('min', '0')
    slider.setAttribute('max', '10')
    slider.setAttribute('value', app.ctx.lineWidth)
    slider.addEventListener('change', (e) => {
      app.ctx.lineWidth = e.target.value
    })
    return slider
  }
}
