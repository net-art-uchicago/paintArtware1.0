/* global C2D */
window.tools.sonicText = {
  name: 'Text(2Speech)',
  icon: '/images/EXAMPLE.png',
  state: {
    selected: false,
    mousePressed: false,
    text: '',
    synth: window.speechSynthesis,
    talkingLoop: null, // initially null
    voice: 0,
    pitch: 1000,
    rate: 2 // used to pick which voice we're using
  },
  events: {
    mousedown: function () {
      const state = window.tools.sonicText.state
      state.mousePressed = true
      state.text = window.options.textOptions.state.text
      // instantiate talking here
      console.log('boop')
      state.talkingLoop = setInterval(window.tools.sonicText.functions.talk, 100, state.text)
      state.voice++ // so that we pick a different voice next time, if possible
    },
    mouseup: function () {
      const state = window.tools.sonicText.state
      state.mousePressed = false
      clearInterval(state.talkingLoop)
      // not strictly necessary, but it makes it clear what to
      // expect when interacting with a (currently unused) state.talkingLoop
      state.talkingLoop = null
    },
    mousemove: function (e) {
      const state = window.tools.sonicText.state
      if (state.selected && state.mousePressed) {
        const mouse = C2D.eventToMouse(e)
        C2D.text(state.text, mouse.x, mouse.y, '-both')
      }
    }
  },
  functions: {
    talk: function (text) {
      const state = window.tools.sonicText.state
      if (!state.synth.speaking) {
        console.log('running') // debug
        var utterThis = new window.SpeechSynthesisUtterance(text)
        utterThis.voice = state.synth.getVoices()[state.voice]
        utterThis.pitch = state.pitch
        utterThis.rate = state.rate
        state.synth.speak(utterThis)
      }
    }
  }
}
