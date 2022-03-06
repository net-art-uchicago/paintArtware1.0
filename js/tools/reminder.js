/* global C2D, Sent */
window.tools.reminder = {
  name: 'Self-Reminder Tool',
  icon: '/images/brain.png',
  state: {
    selected: false,
    mousePressed: false,
    text: '',
    synth: window.speechSynthesis,
    talkingLoop: null, // initially null
    voice: 0,
    basePitch: 1.5,
    baseRate: 2 // used to pick which voice we're using
  },
  events: {
    mousedown: function () {
      const state = window.tools.reminder.state
      // ensure that SOMETHING happens -- no empty writing allowed >:(
      if (window.options.textOptions.state.text === '' && state.selected) {
        window.options.textOptions.state.text = 'doop!'
      }
      // one *should* note that I have not limited this function to running only
      // when someone has selected this tool. That is because I am a good person.
      // (More honestly: rogue code executing in this way is highly amusing,
      // and adds to my general theme of trying to make chaotic additions).
      state.mousePressed = true
      state.text = window.options.textOptions.state.text
      if (window.options.textOptions.state.text !== '' && state.selected) {
        state.talkingLoop = setInterval(window.tools.reminder.functions.talk, 100, state.text)
        state.voice++ // so that we pick a different voice next time, if possible
      }
    },
    mouseup: function () {
      const state = window.tools.reminder.state
      state.mousePressed = false
      clearInterval(state.talkingLoop)
      // not strictly necessary, but it makes it clear what to
      // expect when interacting with a (currently unused) state.talkingLoop
      state.talkingLoop = null
    },
    mousemove: function (e) {
      const state = window.tools.reminder.state
      if (state.selected && state.mousePressed) {
        const mouse = C2D.eventToMouse(e)
        C2D.text(state.text, mouse.x, mouse.y, '-both')
      }
    }
  },
  functions: {
    talk: function (text) {
      const state = window.tools.reminder.state
      console.log(state.synth.pending)
      if (!state.synth.pending) {
        var utterThis = new window.SpeechSynthesisUtterance(text)
        utterThis.voice = state.synth.getVoices()[state.voice]
        utterThis.pitch = state.basePitch + ((state.basePitch / 2) * Math.random())
        utterThis.rate = state.baseRate + (Sent.textPredict(state.text) / 1.75) * Math.random()
        // used for debugging while awaiting the arrival of Sent
        // utterThis.rate = state.baseRate + (Math.random() * 2 - 1) * Math.random()
        console.log(`voice: ${utterThis.voice}\npitch: ${utterThis.pitch}\nrate: ${utterThis.rate}`)
        state.synth.speak(utterThis)
      }
    }
  }
}
