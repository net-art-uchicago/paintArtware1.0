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
            skin = C2D.fill
            features = C2D.stroke
            //C2D.ctx.fillStyle = "red"
            //C2D.fill = "red"
            C2D.fill = features
            C2D.stroke = skin

            C2D.ellipse(mouse.x, mouse.y, 100)
            skin0 = C2D.fill
            features0 = C2D.stroke
            skin = C2D.fill
            features = C2D.stroke
            C2D.fill = features
            C2D.stroke = skin
            C2D.ellipse(mouse.x , mouse.y + (100/3), 100/1.5, 100/2.5)
            C2D.ellipse(mouse.x + (100/3), mouse.y, 100/10)
            C2D.ellipse(mouse.x - (100/3), mouse.y, 100/10)
            skin = C2D.stroke
            features = C2D.stroke
            C2D.fill = features
            C2D.stroke = skin
            C2D.ellipse(mouse.x , mouse.y + 100/4, 70, 30)
            //C2D.rect(mouse.x - 100/5, mouse.y - 100/5, mouse.x+ 100/3, mouse.y + 100/3) 
            
            C2D.fill = features0
            C2D.stroke = skin0
            
          }
        }
      }
    }
    