class Sent {
  static async loadModels () {}

  static textPredict () {}

  static readFaceExpression () {}

  static generateRandomString () {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length;
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

  static async getTopSong () {
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
    console.log(data)
  }

  //  need to communicate that these are async methods so need await keyword
  //  functions they are used in also need the aysnc
  static async getTempo () {
    const topSong = await this.getTopSong().items[0]
  }

  static getColor () {
    const tempo = this.getTempo()
    if (tempo > 200) {}
    //  is it possible to do a range?
    else if (tempo >= 168 && tempo < 200) {
      //  red bright colors
    }
    else if (tempo >= 120 && tempo < 168) {
      //  medium colors, like orange, yellow, pink
    }
    else if (tempo >= 108 && tempo < 120) {
      //  greens
    }
    else if (tempo >= 76 && tempo < 108) {
      //  purples, pastels
    }
    else if (tempo >= 66 && tempo < 76) {
      //  blues
    }
    else if (tempo >= 60 && tempo < 66) {
      //  add opacity? 
    }
    else if (tempo >= 40 && tempo < 60) {
      //  grays
    }
    else if (tempo < 40) {
      //  black and white
    }
  }
}

window.Sent = Sent
//  check if there's other hashes with access_token
if (window.location.hash.includes('access_token')) {
  const hashArray = window.location.hash.split('=')
  const token = hashArray[1].split('&')[0]
  window.localStorage.setItem('spotifyToken', token)
}
