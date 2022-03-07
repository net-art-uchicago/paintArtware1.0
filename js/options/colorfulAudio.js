/* global C2D */
window.options.colorfulAudio = {
  name: 'colorful audio',
  state: {
    selected: false
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

    function subColToHex(c) {
      let hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
      return "#" + subColToHex(r) + subColToHex(g) + subColToHex(b)
    }

    function soundtoColor(){
      const savedSound = document.getElementById('savedAudio')

      //For some reason, the initial duration is always 'Infinity', so
      // I added this exception handling

      let intensities;
      try{
        intensities = UserMedia.getAudioIntensity()
      }
      catch{
        intensities = UserMedia.getAudioIntensity()
      }

      let total = 0
      let parameters = 0
      for(let i = 0; i < intensities.length; i++){
        parameters++
        total += intensities[i]
      }

      let screenColor = parseInt(2.2 * total / parameters)
      if (screenColor > 255)
        screenColor = 255
      
      console.log(screenColor)

      const grd = C2D.ctx.createRadialGradient((C2D.width / 2), (C2D.height / 2), 
          50, (C2D.width / 2), (C2D.height / 2), (C2D.width / 2))
      

      grd.addColorStop(0, rgbToHex(screenColor, 
          parseInt((255 - screenColor) / 2), 255 - screenColor));
      grd.addColorStop(1, "black");

      C2D.ctx.fillStyle = grd
      C2D.rect(0,0, C2D.width, C2D.height)

      if(!savedSound.paused){
        setTimeout(soundtoColor, 100)
      }
    }

    function colorSounds () {

      const savedSound = document.getElementById('savedAudio')
      if(!UserMedia.analyser)
        UserMedia.createContext('savedAudio')

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
        UserMedia.recordAudio(null, null, false, "c")
        colorSounds()
      } else {
        btn.innerHTML = state2
        window.options.colorfulAudio.state.selected = true
        UserMedia.recordAudio('inputAudio', 'savedAudio', true, "c")
      }
    })

    return div
  }
}
