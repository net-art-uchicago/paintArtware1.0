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
          C2D.ctx.beginPath();
          C2D.ctx.moveTo(px, py);
          C2D.ctx.bezierCurveTo(px, py, cp1.x, cp1.y, end.x, end.y);
          C2D.ctx.stroke();
          C2D.ctx.fillStyle = 'blue';
          C2D.ctx.beginPath();
          C2D.ctx.arc(start.x, start.y, 5, 0, 2 * Math.PI);  // Start point
          C2D.ctx.arc(end.x, end.y, 5, 0, 2 * Math.PI);      // End point
          C2D.ctx.fill();
          // Control points
          C2D.ctx.fillStyle = 'red';
          C2D.ctx.beginPath();
          C2D.ctx.arc(cp1.x, cp1.y, 5, 0, 2 * Math.PI);  // Control point one
          C2D.ctx.arc(cp2.x, cp2.y, 5, 0, 2 * Math.PI);  // Control point two
          C2D.ctx.fill();
          state.prevMouse = { x: mouse.x, y: mouse.y }
        }
      }
    }
  }
  