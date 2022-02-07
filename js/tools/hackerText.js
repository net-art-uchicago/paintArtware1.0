/* global C2D */
function getFilesFromIndex () {
  // extract the source js files from the html
  const scripts = document.getElementsByTagName('script')
  const sources = []
  for (const i in scripts) {
    const source = scripts[i].src // get src from script
    if (source) {
      sources.push(source)
    }
  }
  return sources
}

window.tools.hackerText = {
  name: 'hacker text',
  icon: '/images/hacker-icon.png',
  state: {
    selected: false,
    mousePressed: false,
    startTime: 0,
    codeLine: 0,
    codeSnippets: []
  },
  events: {
    mousedown: async function () {
      const state = window.tools.hackerText.state
      state.mousePressed = true
      const files = getFilesFromIndex()
      for (const i in files) {
        const file = files[i]
        // this line loads the file's raw data
        const res = await window.fetch(file)
        // this line converts it into a string
        const string = await res.text()
        // this line turns that string into an Array,
        // by splitting it at each line break "\n"
        const codeLines = string.split('\n')
        state.codeSnippets = state.codeSnippets.concat(codeLines)
      }
    },

    mouseup: function () {
      const state = window.tools.hackerText.state
      state.mousePressed = false
    },

    mousemove: function (e) {
      const state = window.tools.hackerText.state
      const mouse = C2D.eventToMouse(e)
      if (state.selected && state.mousePressed) {
        if (state.startTime + 45 < Date.now()) { // time delay for readability
          const width = C2D.ctx.lineWidth
          const code = state.codeSnippets[state.codeLine]
          // set font and size
          const fontSize = 35 * Math.log10(width + 1)
          C2D.ctx.font = fontSize + 'px math'
          C2D.ctx.fillText(code, mouse.x, mouse.y)
          state.startTime = Date.now()
          state.codeLine++
          if (state.codeLine >= state.codeSnippets.length) {
            state.codeLine = 0
          }
        }
      }
    }
  }
}
