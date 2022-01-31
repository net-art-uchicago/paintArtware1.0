/* global C2D */
window.tools.hackerText = {
  name: 'hacker text',
  icon: '/images/hacker-icon.png',
  state: {
    selected: false,
    mousePressed: false,
    startTime: 0,
    codeLine: 0
  },
  events: {
    mousedown: function () {
      const state = window.tools.hackerText.state
      state.mousePressed = true
    },

    mouseup: function () {
      const state = window.tools.hackerText.state
      state.mousePressed = false
    },
    mousemove: function (e) {
      const state = window.tools.hackerText.state
      const mouse = C2D.eventToMouse(e)
      const width = window.options.strokeWidth.state.width
      const codeSnippets =
        ['/* global C2D */',
          'window.tools.hackerText = {',
          '  name: \'hacker text\',',
          '  icon: \'/images/hacker-icon.png\',',
          '  state: {',
          '    selected: false,',
          '    mousePressed: false,',
          '    startTime: 0',
          '  },',
          '  events: {',
          '    mousedown: function (e) {',
          '      const state = window.tools.hackerText.state',
          '      state.mousePressed = true},',
          '    mousemove: function (e) {',
          '      const state = window.tools.hackerText.state',
          '      const mouse = C2D.eventToMouse(e)',
          '      const width = window.options.strokeWidth.state.width',
          '      const codeSnippets = [Snippet too meta to compute. Removed.]',
          '      if (state.selected && state.mousePressed) {',
          '        if (state.startTime + 45 < Date.now()) { // time delay for readability',
          '          const randomCode = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]',
          '          const fontSize = 35 * Math.log10(width + 1)',
          '          C2D.ctx.font = fontSize + \' px math\'',
          '          C2D.ctx.fillText(randomCode, mouse.x, mouse.y)',
          '          state.startTime = Date.now()',
          '}}}}}'
        ]

      if (state.selected && state.mousePressed) {
        if (state.startTime + 45 < Date.now()) { // time delay for readability
          const randomCode = codeSnippets[state.codeLine]
          const fontSize = 35 * Math.log10(width + 1)
          C2D.ctx.font = fontSize + ' px math'
          C2D.ctx.fillText(randomCode, mouse.x, mouse.y)
          state.startTime = Date.now()
          state.codeLine++
          if (state.codeLine >= codeSnippets.length) {
            state.codeLine = 0
          }
        }
      }
    }
  }
}
