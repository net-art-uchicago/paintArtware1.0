window.tools.smile = {
    name: ':)',
    icon: '/images/smile-icon.png',
    state: {
        selected: false,
        mousePressed: false
      },
      events: {
        mousedown: function () {
          const state = window.tools.smile.state
          state.mousePressed = true
        },
        mouseup: function () {
          const state = window.tools.smile.state
          state.mousePressed = false
        },
        mousemove: function (e) {
          const state = window.tools.smile.state
          if (state.selected && state.mousePressed) {
            const mouse = C2D.eventToMouse(e)
            C2D.ellipse(mouse.x, mouse.y, 100)
            C2D.ellipse(mouse.x + (100/4), mouse.y + (100/4), 100)
            C2D.ellipse(mouse.x - (100/4), mouse.y + (100/4), 100/5)
            C2D.ellipse(mouse.x - (100/4), mouse.y + (100/4), 100/5)
            C2D.ellipse(mouse.x , mouse.y - (100/4), 100/2)
            C2D.rectangle(mouse.x, mouse.y - (100/6), 100/2)
          }
        }
      }
    }
    
//     state: {
//       selected: false,
//       mousePressed: false,
//       //prevMouse: { x: null, y: null}
//     },
//     events: {
//       mousedown: function () {
//           const state = windows.tools.smile.state
//           state.mousePressed = true
//       },
//       mouseup: function () {
//           const state = window.tools.smile.state
//           state.mousePressed = false
//       },
//       mousemove: function (e) {
//           const state = window.tools.smile.state
//           if (state.selected && state.mousePressed) {
//         const time = Date.now()
//         const speed = 0.01
//         const scale = 10
//         const oscilation = Math.sin(time * speed) * scale
//         const size = Math.abs(oscilation)
//         const mouse = C2D.eventToMouse(e)
//         C2D.ellipse(mouse.x, mouse.y, size)
//             

//           }
//       }
//     }
//   }
 

