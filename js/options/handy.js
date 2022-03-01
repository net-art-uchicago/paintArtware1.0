/* global C2D Handsfree */
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
            font-size: 60px;
            font-weight: 200;
            letter-spacing: 1px;
            padding: 13px 20px 13px;
            outline: 0;
            border: 1px solid black;
            cursor: pointer;
            position: relative;
            background-color: rgba(0, 0, 0, 0);
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
        }

        .handycursor{
          background:teal;
          width:50px;
          height:50px;
          position:fixed;
          opacity: 0.5;
          border-radius:50%;
        }
        </style>
        <div class="handycursor"></div>
  
        <button class="startButton">new magic wand</button>
      `

    const button = div.querySelector('button')
    const handycursor = div.querySelector('.handycursor')

    button.addEventListener('click', (e) => {
      console.log('clicked')

      const handsfree = new Handsfree({
        hands: true,
        
        // The maximum number of hands to detect [0 - 4]
        maxNumHands: 1,

        // Minimum confidence [0 - 1] for a hand to be considered detected
        minDetectionConfidence: 0.75,

        // Minimum confidence [0 - 1] for the landmark tracker to be considered detected
        // Higher values are more robust at the expense of higher latency
        minTrackingConfidence: 0.75
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
          const x = (1- data.hands.landmarks[1][8].x) * C2D.width
          const y = data.hands.landmarks[1][8].y * C2D.height
          handycursor.style.left = `${x-25}px`
          handycursor.style.top = `${y-25}px`



          // console.log('x:', x, 'y:', y)
          //console.log(data.hands.pinchState[1][0])

          // if pinched down run mousedown
          if (data.hands.pinchState[1][0] == 'start') {
            state.tool.events.mousedown({ clientX: x, clientY: y })
          
          // if released run mouseup
          } else if (data.hands.pinchState[1][0] == 'released') {
            state.tool.events.mouseup({ clientX: x, clientY: y })

          // if released run mouse up
          } else {
            state.tool.events.mousemove({ clientX: x, clientY: y })
            console.log(x,y)
          }
        }
      })
    }
    return div
  }
}
