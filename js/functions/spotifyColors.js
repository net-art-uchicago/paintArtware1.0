/* global app */

window.functions.spotifyColors = {
  name: 'spotify colors',
  type: 'Edit',
  run: async function () {
    const token = window.localStorage.getItem('spotifyToken')
    if (!token) {
      const answer = window.confirm('Do you want to authenticate Spotify?')
      console.log(answer)
      if (answer) {
        window.Sent.spotifyAuth('e948779f89ae493887fd4aa46fb8e8c7', 'http://localhost:8000')
      }
    } else {
      const colors = await window.Sent.getColors()
      window.options.oldSchoolColors.state.colors = colors
      app.displayOptionUI(window.options.oldSchoolColors)
    }
  }
}
