//  const { cp } = require("fs")

class Sent {
  static async loadModels () {}

  static textPredict () {}

  static readFaceExpression () {}

  static generateRandomString () {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < 16; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  //  need to specify that auth is needed in documentation
  //  also need to explain parameters, explain how to get clientID
  //  need to say when developing run on port 8000
  //  for public make sure not to include my own clientID
  static spotifyAuth (clientID, redirectURI) {
    //  if in developer mode then redirect here, what is the if statement for that?
    const state = this.generateRandomString()
    //  localStorage stores the state on the person's server so can double check it
    window.localStorage.setItem('spotifyString', state)
    const scope = 'user-top-read'
    let url = 'https://accounts.spotify.com/authorize'
    url += '?response_type=token'
    url += '&client_id=' + encodeURIComponent(clientID)
    url += '&scope=' + encodeURIComponent(scope)
    url += '&redirect_uri=' + encodeURIComponent(redirectURI)
    url += '&state=' + encodeURIComponent(state)
    window.location = url
  }

  static async getTopTrack () {
    const token = window.localStorage.getItem('spotifyToken')
    if (!token) {
      return console.error('must run spotifyAuth first')
    }
    const request = 'https://api.spotify.com/v1/me/top/tracks'
    const response = await window.fetch(request, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    const data = await response.json()
    return data.items[0].id
  }

  //  need to communicate that these are async methods so need await keyword
  //  functions they are used in also need the aysnc
  static async getTempo () {
    const token = window.localStorage.getItem('spotifyToken')
    const topSongID = await this.getTopTrack()
    const request = `https://api.spotify.com/v1/audio-analysis/${topSongID}`
    const response = await window.fetch(request, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
    const songData = await response.json()
    return songData.track.tempo
  }

  static async getMood () {
    const tempo = await this.getTempo()
    if (tempo > 200) {
      const mood = 'happy'
      return mood
    } else if (tempo >= 168 && tempo < 200) {
      const mood = 'exuberant'
      return mood
    } else if (tempo >= 120 && tempo < 168) {
      const mood = 'energetic'
      return mood
    } else if (tempo >= 108 && tempo < 120) {
      const mood = 'sad'
      return mood
    } else if (tempo >= 76 && tempo < 108) {
      const mood = 'contentment'
      return mood
    } else if (tempo >= 66 && tempo < 76) {
      const mood = 'calm'
      return mood
    } else if (tempo >= 60 && tempo < 66) {
      const mood = 'chill'
      return mood
    } else if (tempo < 60) {
      const mood = 'depressive'
      return mood
    }
  }

  static getColors () {
    const mood = this.getMood()
    console.log(window.options.oldSchoolColors.state.colors)
    while (window.options.oldSchoolColors.state.colors.length > 0) {
      window.options.oldSchoolColors.state.colors.pop()
    }
    if (mood === 'happy') {
      //  lawn green, red, gold, yellow, dodger blue
      window.options.oldSchoolColors.state.colors.push('#ffff', '#ffd700', '#7cfc00', '#FFFF00', '#1e90ff')
    } else if (mood === 'exuberant') {
      //  fuschia, hot pink, aqua, orange, purple
      window.options.oldSchoolColors.state.colors.push('#FF00FF', '#00FFFF', '#ff1493', '#ffa500', '#800080')
    } else if (mood === 'energetic') {
      //  lime, firebrick, lawn green, turqoise, magenta
      window.options.oldSchoolColors.state.colors.push('#00ff00', '#b22222', '#7cfc00', '#40e0d0', '#ff00ff')
    } else if (mood === 'sad') {
      //  navy, dark gray, dark blue, dim gray, seagreen
      window.options.oldSchoolColors.state.colors.push('#000080', '#a9a9a9', '#00008b', '#696969', '#2e8b57')
    } else if (mood === 'contentment') {
      //  light pink, light sky blue, misty rose, coral, lavender
      window.options.oldSchoolColors.state.colors.push('#ffb6c1', '#87cefa', '#ffe4e1', '#ff7f50', '#e6e6fa')
    } else if (mood === 'calm') {
      //  medium turquoise, cadet blue, azure, silver, lavender
      window.options.oldSchoolColors.state.colors.push('#48d1cc', '#5f9ea0', '#f0ffff', '#C0C0C0', '#e6e6fa')
    } else if (mood === 'chill') {
      //  cornflower blue, sky blue, lavender, light steel blue, pale turquoise
      window.options.oldSchoolColors.state.colors.push('#6495ed', '#00bfff', '#e6e6fa', '#b0c4de', '#afeeee')
    } else if (mood === 'depressive') {
      //  black, gray, dark slate gray, whitesmoke, white
      window.options.oldSchoolColors.state.colors.push('#000000', '#808080', '#2f4f4f', '#f5f5f5', '#ffffff')
    }
    console.log(window.options.oldSchoolColors.state.colors)
  }
}

window.Sent = Sent
//  check if there's other hashes with access_token
if (window.location.hash.includes('access_token')) {
  const hashArray = window.location.hash.split('=')
  const token = hashArray[1].split('&')[0]
  window.localStorage.setItem('spotifyToken', token)
}
