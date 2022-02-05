/* global C2D */
window.options.textOptions = {
  name: 'Text Options',
  state: {
    text: 'doop!'
  },

  run: function () {
    const state = window.options.textOptions.state
    const div = document.createElement('div')
    div.innerHTML = `
      <style>

       .text-options {
          display: flex;
          align-items: center;
          justify-items: center;
          margin: 0 10px;
        }

        .text-options > label {
          margin: 0px 10px;
        }

      </style>

      <div class="text-options">
        <label for="input-text"> What to Write:  </label>
        <input value=${state.text} type="text" id="input-text" name="input-text"
          minlength="4" maxlength="8" size="10">
      </div>
      <div class="text-options">
        <label for="font-sizer"> Font Size: ${C2D.fontSize}</label>
        <input type="range" name="font-sizer" min="1" max="128" value="${C2D.fontSize}px">
      </div>
      <div class="text-options">
        <label for="font-family"> Font Family: ${C2D.fontFamily}</label>
        <input type="range" name="font-family" min="1" max="128" value="${C2D.fontSize}px">
      </div>
      <div class="text-options">
        <label for="font-align"> Font Size: ${C2D.fontSize}</label>
        <input type="range" name="font-sizer" min="1" max="128" value="${C2D.fontSize}px">
      </div>
      <div class="text-options">
        <label for="font-baseline"> Font Size: ${C2D.fontSize}</label>
        <input type="range" name="font-sizer" min="1" max="128" value="${C2D.fontSize}px">
      </div>
    `

    // event listener to control the text input
    const textbox = div.querySelector('input[name="input-text"]')
    textbox.addEventListener('input', (e) => {
      const inputText = e.target.value
      state.text = inputText
    })

    // event listener to control the font size + update label
    const sizeLabel = div.querySelector('label[for="font-sizer"]')
    const slider = div.querySelector('input[name="font-sizer"]')
    slider.addEventListener('input', (e) => {
      const inputFontSize = e.target.value
      C2D.fontSize = inputFontSize
      sizeLabel.textContent = `Font Size: ${C2D.fontSize}`
    })

    return div
  }
}
