/* global C2D */
window.options.textOptions = {
  name: 'text option',
  state: {
    text: 'doop!'
  },

  run: function () {
    const state = window.options.textOptions.state
    const div = document.createElement('div')
    div.innerHTML = `
      <style>

        input {
          maxlegth: 30;
          size: 15;
        }

        input, select {
          width: 125px;
        }

       .text-options {
          display: grid;
          grid-template-columns: 200px 200px 200 px 200px;
          grid-template-rows: auto;
          grid-template-areas:
           "wordlab word fontSizeLab fontSize"
           "fontFamilyLab fontFamily fontAlignLab fontAlign"
           ". fontBaselineLab fontBaseline .";
        }

        label.input-text { grid-area: wordlab; }
        input.input-text { grid-area: word; }
        label.font-sizer { grid-area: fontSizeLab; }
        input.font-sizer { grid-area: fontSize; }

      </style>

      <div class="text-options">
        <label for="input-text" class="input-text"> What to Write:  </label>
        <input value=${state.text} type="text" id="input-text" class="input-text">
      </div>
      <div class="text-options">
        <label for="font-sizer" class="font-sizer"> Font Size: ${C2D.fontSize}</label>
        <input type="range" id="font-sizer" class="font-sizer" min="1" max="128" value="${C2D.fontSize}px">
      </div>
      <div class="text-options">
        <label for="font-family" class="font-family">Font Family</label>
        <select id="font-family" class="font-family">
          <option value="Serif">Serif</option>
          <option value="Verdana">Verdana</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Georgia">Georgia</option>
          <option value="Garamond">Garamond</option>
          <option value="Courier New">Courier New</option>
          <option value="Brush Script MT">Brush Script MT</option>
        </select>
      </div>
      <div class="text-options">
        <label for="font-align" class="font-align">Font Align</label>
        <select id="font-align" class="font-align">
          <option value="center">center</option>
          <option value="start">start</option>
          <option value="left">left</option>
          <option value="right">right</option>
          <option value="end">end</option>
        </select>
      </div>
      <div class="text-options">
        <label for="font-baseline" class="font-baseline">Font Baseline</label>
        <select id="font-baseline" class="font-baseline">
          <option value="middle">Middle</option>
          <option value="alphabetic">Alphabetic</option>
          <option value="top">Top</option>
          <option value="hanging">Hanging</option>
          <option value="bottom">Bottom</option>
          <option value="ideographic">Ideographic</option>
        </select>
      </div>
    `

    // event listener to control the text input
    const textbox = div.querySelector('input[id="input-text"]')
    textbox.addEventListener('input', (e) => {
      const inputText = e.target.value
      state.text = inputText
    })

    // event listener to control the font size + update label
    const sizeLabel = div.querySelector('label[for="font-sizer"]')
    const slider = div.querySelector('input[id="font-sizer"]')
    slider.addEventListener('input', (e) => {
      const inputFontSize = e.target.value
      C2D.fontSize = inputFontSize
      sizeLabel.textContent = `Font Size: ${C2D.fontSize}`
    })

    const familySelect = div.querySelector('select[id="font-family"]')
    familySelect.addEventListener('input', (e) => {
      C2D.fontFamily = familySelect.value
    })

    const fontAlign = div.querySelector('select[id="font-align"]')
    fontAlign.addEventListener('input', (e) => {
      C2D.fontAlign = fontAlign.value
    })

    const fontBaseline = div.querySelector('select[id="font-baseline"]')
    fontBaseline.addEventListener('input', (e) => {
      C2D.fontBaseline = fontBaseline.value
    })

    return div
  }
}
