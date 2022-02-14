window.tools.concentricCircle = {
    name: 'Concentric Circle',
    icon: '/images/circle-icon.png',
    state: {
        selected: false,
        mousePressed: false,
        prevMouse: { x: null, y: null },
        prevColor: null
    },
    events: {
        mousedown: function (e) {
            const state = window.tools.concentricCircle.state
            const mouse = C2D.eventToMouse(e)
            state.mousePressed = true
            state.prevMouse = { x: mouse.x, y: mouse.y}
            state.prevColor = C2D.fill
        },
        mouseup: function () {
            const state = window.tools.concentricCircle.state
            state.mousePressed = false
            state.prevMouse = { x: null, y: null }
            C2D.fill = state.prevColor
        },
        mousemove: function (e) {
            const state = window.tools.concentricCircle.state
            if (state.selected && state.mousePressed)
            {
                const mouse = C2D.eventToMouse(e)
                let X = state.prevMouse.x
                let Y = state.prevMouse.y
                let R = Math.abs(X - mouse.x)
                C2D.fill = "rgba(255, 255, 255, 0.1)"
                C2D.ellipse(X, Y, R)
            }
        },
    }
}