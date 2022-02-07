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
            fill1 = C2D.fill
            stroke1 = C2D.stroke
            width = (C2D.ctx.lineWidth)*5
            C2D.change_colors(stroke1,stroke1)
            C2D.ellipse(mouse.x, mouse.y, width) //face
            C2D.change_colors(fill1,fill1)
            C2D.ellipse(mouse.x , mouse.y + (width/5), width/1.8, width/1.9) // innermouth
            C2D.change_colors(stroke1,stroke1)
            C2D.ellipse(mouse.x , mouse.y, (width*.7), (width * 0.4)) //outer mouth
            C2D.change_colors(fill1,fill1)
            C2D.ellipse(mouse.x + (width/2.75), mouse.y - (width/5), width/13, width/7) //eyes
            C2D.ellipse(mouse.x - (width/2.75), mouse.y - (width/5), width/13, width/7)
            C2D.change_colors(stroke1,fill1)
            
          }
        }
      }
    }
    

//     mousemove: function (e) {
//       const state = window.tools.smile.state
//       if (state.selected && state.mousePressed) {
//         const mouse = C2D.eventToMouse(e)
//         skin = C2D_fill
//         // o_stroke = C2D.stroke
//        // switch_colors()
//         C2D.ellipse(mouse.x, mouse.y, 100)
//         // switch_colors()
//         // C2D.ellipse(mouse.x , mouse.y + (100/4), 100/1.5, 100/2.5)
//         // C2D.ellipse(mouse.x + (100/3), mouse.y - 20, 100/9)
//         // C2D.ellipse(mouse.x - (100/3), mouse.y - 20, 100/9)
//         // one_colors(o_fill)
//         // C2D.ellipse(mouse.x , mouse.y + 100/5, 70, 35)
//         // one_color(o_stroke)
//         // C2D.ellipse(mouse.x + (100/3), mouse.y - 20, 100/10, 100/5)
//         // C2D.ellipse(mouse.x - (100/3), mouse.y - 20, 100/10, 100/5)
//         // original_colors()
        
//       }
//     }
//   }
// }
