window.tools.circle = {
    name: 'circle',
    icon: '/images/circle-icon.png',
    state: {
      selected: false,
      mousePressed: false,
      prevMouse: { x: null, y: null }
    },
    events: {
        mousedown: function () {
            const state = window.tools.circle.state
            state.mousePressed = true
          },
        mouseup: function () {
            const state = window.tools.circle.state
            state.mousePressed = false
            state.prevMouse = { x: null, y: null }
          },
        mousemove: function (e) {
            var canvas = document.getElementById('circle');
            const state = window.tools.circle.state;
            if (state.selected && state.mousePressed)
            {
              if (canvas.getContext) {
                const ctx = canvas.getContext('2d');
                const mouse = C2D.eventToMouse(e);
                var cavnas = document.getElementById('circle');
                let X = state.prevMouse.x;
                let Y = state.prevMouse.y;
                let R = Math.abs(mouse.x - state.prevMouse.x);
                ctx.beginPath();
                ctx.arc(X, Y, R, 0, 2 * Math.PI);
                ctx.lineWidth = 3;
                ctx.strokeStyle = '#FF0000';
                ctx.stroke();
              }
            }
        },
    }
}