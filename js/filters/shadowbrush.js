window.filters.shadowBrush = {
  name: 'shadow brush',
  menu: 'Options',
  run: function (e) {
    const newColor = () => {
      const r = Math.random() * 255
      const g = Math.random() * 255
      const b = Math.random() * 255
      app.ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
      app.ctx.shadowBlur = 4;
      app.ctx.shadowOffsetX = 5;
      app.ctx.shadowOffsetY = 5;
    }

    const button = document.createElement('button')
    button.addEventListener('click', newColor)
    button.textContent = 'add random colored shadow'
    return button
  }
}