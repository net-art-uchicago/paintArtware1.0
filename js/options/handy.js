/* global Handsfree */
window.options.handy = {
  name: 'handy',
  state: {
    afterhand: false,
    tool: null
  },

  run: function () {
    const state = window.options.handy.state

    const div = document.createElement('div')
    div.innerHTML = `
        <style>
        .startButton{
            color:blue;
        }
        </style>
  
        <button class="startButton">a button</button>
      `

    const button = div.querySelector('button')

    button.addEventListener('click', (e) => {
      console.log('clicked')

      const handsfree = new Handsfree({
        hands: true
      })
      handsfree.start()

      // Scroll a little slower
      handsfree.plugin.pinchScroll.enable()
      handsfree.plugin.pinchScroll.config.speed = 2
    })

    if (!state.afterhand) {
      // From an event
      state.afterhand = true
      app.on('tools-select', tool => {
        console.log(tool)
        state.tool = tool
      })
      document.addEventListener('handsfree-data', event => {
        const data = event.detail
        if (!data.hands) return

        // Show a log of x,y coordinates or right index finger
        if (data.hands.landmarksVisible[1]) {
          const x = data.hands.landmarks[1][8].x
          const y = data.hands.landmarks[1][8].y

          // console.log('x:', x, 'y:', y)
          //console.log(data.hands.pinchState[1][0])

          // if pinched down run mousedown
          if (data.hands.pinchState[1][0] == 'start') {
            state.tool.events.mousedown({ clientX: x, clientY: y })
          }
          // if held run mousemove
          if (data.hands.pinchState[1][0] == 'held') {
            // console.log('mf hold on')
            state.tool.events.mousemove({ clientX: x, clientY: y })
          }
          // if released run mouse up
          if (data.hands.pinchState[1][0] == 'released') {
            state.tool.events.mouseup({ clientX: x, clientY: y })
          }
        }
      })
    }
    return div
  }
}
