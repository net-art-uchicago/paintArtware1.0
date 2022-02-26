/* global C2D */
window.options.colorfulAudio = {
  name: 'colorful audio',
  state: {
    selected: false,
    randomNum: 0
  },
  run: function () {
    const div = document.createElement('div')
    const btnColor = C2D.stroke
    div.innerHTML = `
      <style>
        div{
          display:flex;
          align-items:center;
          justify-content:center;
          flex-direction:row;
        }
        button{
          width:500px;
          height:90px;
          margin-right: 40px;
          background-color:${btnColor};
          color:white;
          font-size:200%;
          font-family:"Monaco", monospace;
          border-radius:10%;
        }
      </style>

      <audio id="inputAudio"></audio>

      <div>
        <button> Record Audio </button>
        <audio id="savedAudio" controls></audio>
      </div>
    `

    function soundtoColor(){
      const savedSound = document.getElementById('savedAudio')
      const randomNum = window.options.colorfulAudio.state.randomNum
      let time = savedSound.currentTime
      const duration = savedSound.duration
      const pixels = C2D.getPixels()
      const screenWidth = C2D.width
      const portion = (C2D.height / 100)

      let partialRow = 1
      let accumulator = 1
      let currentColor = 3

      if (time > 0 < 1) { time = 1 }

      const soundMultiplier = (savedSound.volume *
        time / duration)

      for (let i = 0; i < pixels.length; i++) {
        if (i >= (screenWidth * partialRow)) {
          partialRow++
          if (accumulator >= portion) {
            currentColor += 4
            accumulator = 0
          }
          accumulator++
        }

        const colorList = [parseInt(currentColor * soundMultiplier),
          parseInt(randomNum * currentColor * soundMultiplier),
          parseInt((1 - randomNum) * currentColor * soundMultiplier)]

        for (let i = 0; i < colorList.length; i++) {
          if (colorList[i] > 255) { 
            colorList[i] = 255 
            window.options.colorfulAudio.state.randomNum = Math.random()
          } 
          else if (colorList[i] < 0) { 
            colorList[i] = 0
            window.options.colorfulAudio.state.randomNum = Math.random()
          }
        }

        pixels[i].r = colorList[0]
        pixels[i].g = colorList[1]
        pixels[i].b = colorList[2]
        pixels[i].a = 255
      }

      C2D.setPixels(pixels)

      if(!savedSound.paused){
        setTimeout(soundtoColor, 400)
      }
    }

    function colorSounds () {
      const savedSound = document.getElementById('savedAudio')
      savedSound.onplaying = () => {
        soundtoColor()
      }
    }

    const btn = div.querySelector('button')
    const state1 = 'Record Audio'
    const state2 = 'Stop Recording'

    btn.addEventListener('click', () => {
      if (window.options.colorfulAudio.state.selected) {
        btn.innerHTML = state1
        window.options.colorfulAudio.state.selected = false
        UserMedia.recordAudio(null, null, false)
        colorSounds()
      } else {
        btn.innerHTML = state2
        window.options.colorfulAudio.state.selected = true
        window.options.colorfulAudio.state.randomNum = Math.random()
        UserMedia.recordAudio('inputAudio', 'savedAudio', true)
      }
    })

    return div
  }
}
