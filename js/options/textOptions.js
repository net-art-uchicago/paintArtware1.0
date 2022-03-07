/* global C2D */
window.options.textOptions = {
  name: 'text options',
  // not sure how relevant state.text is
  // leaving it in case someone wants a "global" text variable for a tool,
  // and tentatively desiring to link the color of the overwhelm blobs to it's
  // contents
  state: {
    text: 'doop!',
    numberOfHorrors: 20 // the higher this number is, the greater the overwhelm
  },

  run: function () {
    const state = window.options.textOptions.state

    // ---------~~~~~~~~~~~~~~~~~
    // --------| Rainbow Chaos |~
    // ---------~~~~~~~~~~~~~~~~~

    // ensure that I don't have two rainbow-chaos scripts present
    if (document.querySelector('script[id="rainbow-chaos"]') === null) {
      // append rainbow-chaos to document
      const sc = document.createElement('script')
      sc.id = 'rainbow-chaos'
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
        }

        // what if text-options had a painful background
        // kudos to Bartek on stack-overflow for these colors
        const tooloptions = document.querySelector('section[id="tool-options"]')
        var colors = ['rgba(255, 0, 0, 1)',
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
        // debugging purposes / for those who hate flashing
        //setBackgroundRainbow(tooloptions, colors)
        // realsies function
        setInterval(setBackgroundRainbow, 100, tooloptions, colors)
        setInterval(function () {
          colors = scootch(colors)
        }, 100)
      `
      // everything changed when the rainbow nation attacked
      document.body.appendChild(sc)
    }

    // ----------~~~~~~~~~~~~~~~~~~~~~~~~
    // ---------| Overwhelm Rectangles |~
    // ---------| and Teleporting Text |~
    // ---------|        Options       |~
    // ----------~~~~~~~~~~~~~~~~~~~~~~~~

    let styles = '' // holds the styleing + animations for rectangles
    let divs = '' // holds the divs that i'm using to make the rectangles
    for (let i = 0; i < state.numberOfHorrors; i++) {
      styles += `
        div.floaty${i}:before, div.floaty${i}:after {
          content: "";
          position: absolute;
        }

        div.floaty${i}:before {
          animation: stutter${i}${i} ${Math.random() / 9 + 0.2}s step-start infinite alternate;
        }

        div.floaty${i}:after {
          animation: stutter${i}${i + 1} ${Math.random() / 9 + 0.2}s step-start infinite alternate;
        }

        @keyframes stutter${i}${i} {
          0% {
            background: rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255});
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            height: ${Math.random() * 160}px;
            width: ${Math.random() * 100}px;
          }
          33% {
            bottom: ${Math.random() * 100}%;
            right: ${Math.random() * 100}%;
            height: ${Math.random() * 160}px;
            width: ${Math.random() * 100}px;
          }
          66% {
            background: rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255});
            top: ${Math.random() * 100}%;
            right: ${Math.random() * 100}%;
            height: ${Math.random() * 160}px;
            width: ${Math.random() * 100}px;
          }
          100% {
            bottom: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            height: ${Math.random() * 160}px;
            width: ${Math.random() * 100}px;
          }
        }

        @keyframes stutter${i}${i + 1} {
          0% {
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            height: ${Math.random() * 80}px;
            width: ${Math.random() * 180}px;
          }
          33% {
            background: rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255});
            bottom: ${Math.random() * 100}%;
            right: ${Math.random() * 100}%;
            height: ${Math.random() * 80}px;
            width: ${Math.random() * 180}px;
          }
          66% {
            top: ${Math.random() * 100}%;
            right: ${Math.random() * 100}%;
            height: ${Math.random() * 80}px;
            width: ${Math.random() * 180}px;
          }
          100% {
            background: rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255});
            bottom: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            height: ${Math.random() * 80}px;
            width: ${Math.random() * 180}px;
          }
        }\n
        `
      divs += `<div class="floaty${i}"></div>\n`
    }

    let t1 = ''
    let t2 = ''
    for (let i = 0; i <= 50; i++) {
      t1 += `
        ${i * 10}% {
          top: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
        ${(i + 1) * 10}% {
          bottom: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
      `
      t2 += `
        ${i * 10}% {
          top: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
        ${(i + 1) * 10}$ {
          top: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
      `
    }
    // put it all together
    const div = document.createElement('div')
    div.innerHTML = `
    <style>
    label.input-text {
      margin-right: 50px;
    }

    label.font-sizer {
      width: 150px;
      margin-right: 0px;
    }

    div.text-options {
      width: 100%;
      height: 30%;
    }

    div.text-options > div > * {
      position: relative;
      animation: t1 5s step-start infinite, t2 10s step-end infinite;
    }

    div.text-options > div > label {
      animation: t2 5s step-start infinite alternate-reverse;
    }

    div.text-options > div > input {
      animation: t1 5s step-start infinite alternate;
    }

    div.text-options > div > input:hover, div.text-options > div > select:hover {
      animation-play-state: paused;
    }

    @keyframes t1 {
      ${t1}
    }

    @keyframes t2 {
      ${t2}
    }
    ${styles}
    </style>

    <div class="text-options">
      ${divs}
      <div>
        <label for="input-text" class="input-text"> What to Write:  </label>
        <input value=${state.text} type="text" id="input-text" class="input-text">
      </div>
      <div>
        <label for="font-sizer" class="font-sizer"> Font Size: ${C2D.fontSize}</label>
        <input type="range" id="font-sizer" class="font-sizer" min="1" max="128" value="${C2D.fontSize}px">
      </div>
      <div>
        <label for="font-family">Font Family:</label>
        <select id="font-family" class="font-family">
          <option value="Serif">Serif</option>
          <option value="Verdana">Verdana</option>
          <option value="Helvetica">Helvetica</option>
        </select>
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

    // event listener to control the font family of text objects
    const familySelect = div.querySelector('select[id="font-family"]')
    familySelect.addEventListener('input', (e) => {
      C2D.fontFamily = familySelect.value
    })

    return div
  }
}
