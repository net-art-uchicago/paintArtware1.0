/* global app */
window.options.randomColor = {
  name: 'random color',
  run: function () {
    const newColor = () => {
      const r = Math.random() * 255
      const g = Math.random() * 255
      const b = Math.random() * 255
      app.ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`
    }

    const button = document.createElement('button')
    button.addEventListener('click', newColor)
    button.textContent = 'new random color'
    return button
  }
}
