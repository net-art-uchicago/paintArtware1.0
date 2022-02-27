/* global C2D */
window.options.handy = {
  name: 'handy',
  state: { afterhand: false },
  run: function () {
    const state = window.options.handy.state

    const div = document.createElement('div')
    div.innerHTML = `
        <style>
        .startButton{
            color:red;
        }
        </style>
  
        <button class="startButton">a button</button>
      `

    const button = div.querySelector('button')

    button.addEventListener('click', (e) => {
      const handsfree = new Handsfree({
        hands: {
          enabled: true,
          // The maximum number of hands to detect [0 - 4]
          maxNumHands: 2,

          // Minimum confidence [0 - 1] for a hand to be considered detected
          minDetectionConfidence: 0.5,

          // Minimum confidence [0 - 1] for the landmark tracker to be considered detected
          // Higher values are more robust at the expense of higher latency
          minTrackingConfidence: 0.75
        }
      })

      handsfree.start()
    })

    if (!state.afterhand) {
      // From an event
      state.afterhand = true
      document.addEventListener('handsfree-data', event => {
        const data = event.detail
        if (!data.hands) return

        // Show a log of x,y coordinates or right index finger
        if (data.hands.landmarksVisible[1]) {
          const x = data.hands.landmarks[1][8].x
          const y = data.hands.landmarks[1][8].y

          console.log('x:', x, 'y:', y)
        }
      })
    }
    return div
  }
}
