/* global C2D */
window.options.textOptions = {
  name: 'text option',
  state: {
    text: 'doop!'
  },

  run: function () {
    const state = window.options.textOptions.state
    // used to make things very wrong
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
      }

      // what if text-options had a painful background
      // kudos to Bartek on stack-overflow for these colors
      const textoption = document.querySelector('section[id="tool-options"]')
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
      // debugging purposes
      setBackgroundRainbow(textoption, colors)
      // realsies function
      //setInterval(setBackgroundRainbow, 100, textoption, colors)
      setInterval(function () {
        colors = scootch(colors)
      }, 100)
    `
    document.body.appendChild(sc)
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

      div.floaty1:before, div.floaty1:after, div.floaty2:before, div.floaty2:after, div.floaty3:before, div.floaty3:after, div.floaty4:before, div.floaty4:after {
        content: "";
        position: absolute;
      }

      div.floaty1  {
        background-color: rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255});
        height: ${Math.random() * 80}px;
        width: ${Math.random() * 100}px;
        animation: stutter1 1s step-start infinite alternate;
      }

      div.floaty1:before  {
        animation: stutter11 1s step-start infinite alternate;
      }

      div.floaty1:after  {
        animation: stutter12 1s step-start infinite alternate;
      }

      div.floaty2  {
        background-color: rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255});
        height: ${Math.random() * 80}px;
        width: ${Math.random() * 100}px;
        animation: stutter2 1s step-start infinite alternate;
      }

      div.floaty2:before  {
        animation: stutter21 1s step-start infinite alternate;
      }

      div.floaty2:after  {
        animation: stutter22 1s step-start infinite alternate;
      }

      div.floaty3  {
        background-color: rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255});
        height: ${Math.random() * 80}px;
        width: ${Math.random() * 100}px;
        animation: stutter3 1s step-start infinite alternate;
      }

      div.floaty3:before  {
        animation: stutter31 1s step-start infinite alternate;
      }

      div.floaty3:after  {
        animation: stutter32 1s step-start infinite alternate;
      }

      div.floaty4  {
        background-color: rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255});
        height: ${Math.random() * 80}px;
        width: ${Math.random() * 100}px;
        animation: stutter4 1s step-start infinite alternate;
      }

      div.floaty4:before  {
        animation: stutter41 1s step-start infinite alternate;
      }

      div.floaty4:after  {
        animation: stutter 42 1s step-start infinite alternate;
      }
      @keyframes t1 {
        0% {
          top: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
        10% {
          bottom: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
        20% {
          top: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
        30% {
          bottom: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
        40% {
          top: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
        50% {
          bottom: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
        60% {
          top: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
        70% {
          bottom: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
        80% {
          top: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
        90% {
          bottom: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
        100% {
          top: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
      }

      @keyframes t2 {
        0% {
          top: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
        10% {
          top: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
        20% {
          top: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
        30% {
          top: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
        40% {
          top: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
        50% {
          top: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
        60% {
          top: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
        70% {
          top: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
        80% {
          top: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
        90% {
          top: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
        100% {
          top: ${Math.random() * 10}%;
          left: ${Math.random() * 50}%;
        }
      }

      @keyframes stutter1 {
        0% {
          top: ${Math.random() * 200 - 100}%;
          left: ${Math.random() * 200 - 100}%
        }
        50% {
          top: ${Math.random() * 200 - 100}%;
          left: ${Math.random() * 200 - 100}%
        }
        100% {
          top: ${Math.random() * 200 - 100}%;
          left: ${Math.random() * 200 - 100}%
        }
      }

      @keyframes stutter11 {
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

      @keyframes stutter12 {
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
      }

      @keyframes stutter2 {
        0% {
          top: ${Math.random() * 200 - 100}%;
          left: ${Math.random() * 200 - 100}%
        }
        50% {
          top: ${Math.random() * 200 - 100}%;
          left: ${Math.random() * 200 - 100}%
        }
        100% {
          top: ${Math.random() * 200 - 100}%;
          left: ${Math.random() * 200 - 100}%
        }
      }

      @keyframes stutter21 {
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

      @keyframes stutter22 {
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
      }

      @keyframes stutter3 {
        0% {
          top: ${Math.random() * 200 - 100}%;
          left: ${Math.random() * 200 - 100}%
        }
        50% {
          top: ${Math.random() * 200 - 100}%;
          left: ${Math.random() * 200 - 100}%
        }
        100% {
          top: ${Math.random() * 200 - 100}%;
          left: ${Math.random() * 200 - 100}%
        }
      }

      @keyframes stutter31 {
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

      @keyframes stutter32 {
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
      }

      @keyframes stutter4 {
        0% {
          top: ${Math.random() * 200 - 100}%;
          left: ${Math.random() * 200 - 100}%
        }
        50% {
          top: ${Math.random() * 200 - 100}%;
          left: ${Math.random() * 200 - 100}%
        }
        100% {
          top: ${Math.random() * 200 - 100}%;
          left: ${Math.random() * 200 - 100}%
        }
      }

      @keyframes stutter41 {
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

      @keyframes stutter42 {
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
      }

      </style>
      <div class="text-options">
        <div style="left:${Math.random() * 50}%">
          <div class="floaty1"></div>
        </div>
        <div>
          <div class="floaty2"></div>
        </div>
        <div>
          <div class="floaty3"></div>
        </div>
        <div>
          <div class="floaty4"></div>
        </div>
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
