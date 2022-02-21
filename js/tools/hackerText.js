/* global C2D */
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
      if (!state.codeSnippets.length) {
        const files = window.tools.hackerText.functions.getFilesFromIndex()
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
          const code = state.codeSnippets[state.codeLine]
          // set font and size
          const oldFontSize = C2D.fontSize
          C2D.fontSize /= 4
          C2D.text(code, mouse.x, mouse.y)
          C2D.fontSize = oldFontSize
          state.startTime = Date.now()
          state.codeLine++
          if (state.codeLine >= state.codeSnippets.length) {
            state.codeLine = 0
          }
        }
      }
    }
  },
  functions: {
    getFilesFromIndex: function () {
      // extract the source js files from the html
      const scripts = document.getElementsByTagName('script')
      const sources = []
      sources.push('/index.html')
      for (const i in scripts) {
        const source = scripts[i].src // get src from script
        if (source) {
          sources.push(source)
        }
      }
      return sources
    }
  }
}
