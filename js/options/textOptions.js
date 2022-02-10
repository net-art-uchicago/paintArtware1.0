/* global C2D */
window.options.textOptions = {
  name: 'text option',
  state: {
    text: 'doop!'
  },

  run: function () {
    const state = window.options.textOptions.state
    const sc = document.createElement('script')
    sc.innerHTML = `
      // takes a list and "scootches" the elements
      function scootch (c) {
        const r = []
        c.forEach(col => {
          r.push(col)
        })
        return r
      }

      // takes an element e and list of colors c and makes the background cursed
      function setBackgroundRainbow (e, c) {
        var b = \`linear-gradient(\${Math.random() * 360}deg,\`
        for (let i = 0; i < c.length; i++) {
          if (i + 1 !== c.length) b = b + c[i] + \` \${i * 10}%,\`
          else b = b + c[i] + \` \${i * 10}%\`
        }
        b = b + ')'
        e.style.background = b
        console.log(b)
      }

      // what if text-options had a painful background
      // kudos to Bartek on stack-overflow for these colors
      const textoption = document.querySelector('section[id="tool-options"]')
      let colors = ['rgba(255, 0, 0, 1)',
        'rgba(255, 154, 0, 1)',
        'rgba(208, 222, 33, 1)',
        'rgba(79, 220, 74, 1)',
        'rgba(63, 218, 216, 1)',
        'rgba(47, 201, 226, 1)',
        'rgba(28, 127, 238, 1)',
        'rgba(95, 21, 242, 1)',
        'rgba(186, 12, 248, 1)',
        'rgba(251, 7, 217, 1)',
        'rgba(255, 0, 0, 1)']
      // only once, for debugging purposes
      setBackgroundRainbow(textoption, colors)
      //setInterval(setBackgroundRainbow, 100, textoption, colors)
      setInterval(function () {
        colors = scootch(colors)
      }, 100)
    `
    document.body.appendChild(sc)
    const div = document.createElement('div')
    div.innerHTML = `
      <style>

       .text-options {
          display: grid;
          grid-template-columns: repeat(50, 1fr);
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
