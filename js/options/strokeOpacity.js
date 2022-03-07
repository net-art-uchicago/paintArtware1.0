/* global C2D */
window.options.strokeOpacity = {
  name: 'stroke-opacity',
  state: {
    opacity: 1
  },
  run: function () {
    const opacity = window.options.strokeOpacity.state.opacity

    const div = document.createElement('div')
    div.innerHTML = `
      <style>
        .stroke-opacity {
          display: flex;
          align-items: center;
          margin: 0 10px;
        }
        .stroke-opacity > span {
          margin-right: 10px;
          width: 38px;
        }
      </style>
      <div class="stroke-opacity">
        <span>${opacity}</span>
        <input type="range" min="0" max="100" opacity="${opacity}">
      </div>
    `

    const span = div.querySelector('span')
    const slider = div.querySelector('input')
    slider.addEventListener('input', (e) => {
      const num = (Number(e.target.value))/100
      window.options.strokeOpacity.state.opacity = num
      C2D.ctx.globalAlpha = num
      span.textContent = num
    })

    return div
  }
}