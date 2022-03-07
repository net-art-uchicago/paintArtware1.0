window.options.strokeOptions = {
  name: 'stroke-options',
  state: {
    opacity: 1,
    width: 1
  },
  run: function () {
    const opacity = window.options.strokeOptions.state.opacity
    const width = window.options.strokeOptions.state.width

    const div = document.createElement('div')
    div.innerHTML = `
      <style>
        .stroke-options {
          display: flex;
          align-items: center;
          margin: 0 10px;
        }

        .stroke-options > span {
          margin-right: 10px;
          width: 38px;
        }
        
      </style>

      <div class="stroke-options">
        <span class = "spanOpacity">${opacity}</span>
        <input type="range" class = "inputOpacity" min="0" max="100" opacity="${opacity}">

        <span class = "spanWidth>${width}</span>
        <input type="range" class = "inputWidth" min="1" max="100" value="${width}">
      </div>
    `

    const spanOpacity = div.querySelector('.spanOpacity')
    const sliderOpacity = div.querySelector('.inputOpacity')
    sliderOpacity.addEventListener('.inputOpacity', (e) => {
      const numOpacity = (Number(e.target.value))/100
      console.log(numOpacity)
      window.options.strokeOptions.state.opacity = numOpacity
      C2D.ctx.globalAlpha = numOpacity
      spanOpacity.textContent = numOpacity
    })

    // const spanWidth = div.querySelector('.spanWidth')
    // const sliderWidth = div.querySelector('.inputWidth')
    // sliderWidth.addEventListener('.inputWidth', (e) => {
    //   const numWidth = Number(e.target.value)
    //   window.options.strokeWidth.state.width = numWidth
    //   C2D.ctx.lineWidth = numWidth
    //   spanWidth.textContent = numWidth
    // })

    // C2D.ctx.lineJoin = 'round'

    return div

  }
}
