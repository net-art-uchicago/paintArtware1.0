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
       .text-options {
          display: grid;
          grid-template-columns: 450px;
          grid-template-rows: 1fr 1fr;
          grid-template-areas:
          "top"
          "bottom";
        }

        div > div {
          display: flex;
        }

        div:nthchild(1) {
          grid-area: top;
        }

        div:nchild(2) {
          grid-area: bottom;
        }
        label.input-text {
          margin-right: 50px;
        }
        label.font-sizer {
          width: 150px;
          margin-right: 0px;
        }

      </style>
      <div class="text-options">
        <div>
          <label for="input-text" class="input-text"> What to Write:  </label>
          <input value=${state.text} type="text" id="input-text" class="input-text">
        </div>
        <div>
          <label for="font-sizer" class="font-sizer"> Font Size: ${C2D.fontSize}</label>
          <input type="range" id="font-sizer" class="font-sizer" min="1" max="128" value="${C2D.fontSize}px">
        </div>
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

    return div
  }
}
