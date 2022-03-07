/* global C2D */
window.tools.bezier = {
    name: 'bezier',
    icon: '/images/bezier.png',
    state: {
      selected: false,
      mousePressed: false,
      prevMouse: { x: null, y: null }
    },
  
    events: {
      mousedown: function () {
        const state = window.tools.bezier.state
        state.mousePressed = true
      },
      mouseup: function () {
        const state = window.tools.bezier.state
        state.mousePressed = false
        state.prevMouse = { x: null, y: null }

      },
      mousemove: function (e) {
        const state = window.tools.bezier.state
        if (state.selected && state.mousePressed) {
          const mouse = C2D.eventToMouse(e)
          const px = state.prevMouse.x || mouse.x
          const py = state.prevMouse.y || mouse.y
          const ctx = C2D.ctx
          const cc = document.createElement('canvas')
          cc.width = C2D.width/2
          cc.height = C2D.height/2
            
          // Define the points as {x, y}
          let start = { x: cc.width,    y: cc.height };
          let cp1 =   { x: cc.width + 50,   y: cc.height + 100  };
          let cp2 =   { x: cc.width + 200,   y: cc.height +100  };
          let end =   { x: cc.width + 200,   y: cc.height + 50 };

        // Cubic Bézier curve
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.bezierCurveTo(px, py, cp1.x, cp1.y, end.x, end.y);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(start.x, start.y, 5, 0, 2 * Math.PI);  // Start point
          ctx.arc(end.x, end.y, 5, 0, 2 * Math.PI);      // End point
          // Control points
          ctx.beginPath();
          ctx.arc(cp1.x, cp1.y, 5, 0, 2 * Math.PI*50*Math.random*.07);  // Control point one
          ctx.arc(cp2.x, cp2.y, 5, 0, 2 * Math.PI*50*Math.random*.03);  // Control point two
          state.prevMouse = { x: mouse.x, y: mouse.y }
        }
      }
    }
  }
  