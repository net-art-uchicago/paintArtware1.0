/* global C2D */
window.options.strokeWidth = {
  name: 'stroke-width',
  state: {
    width: 1
  },
  run: function () {
    const width = window.options.strokeWidth.state.width

    const div = document.createElement('div')
    div.innerHTML = `
      <style>
        .stroke-width {
          display: flex;
          align-items: center;
          margin: 0 10px;
        }

        .stroke-width > span {
          margin-right: 10px;
          width: 38px;
        }
      </style>

      <div class="stroke-width">
        <span>${width}</span>
        <input type="range" min="1" max="100" value="${width}">
      </div>
    `

    const span = div.querySelector('span')
    const slider = div.querySelector('input')
    slider.addEventListener('input', (e) => {
      const num = Number(e.target.value)
      window.options.strokeWidth.state.width = num
      C2D.ctx.lineWidth = num
      span.textContent = num
    })

    C2D.ctx.lineJoin = 'round'

    return div
  }
}
