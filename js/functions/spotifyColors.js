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
        window.SpotifyMoodColors.spotifyAuth('d41b83c2f2224356bd94fbf83924e6d4', 'https://artware.app')
      }
    } else {
      const colors = await window.SpotifyMoodColors.getColors()
      const mood = await window.SpotifyMoodColors.getMood()
      window.alert('this is the mood of your top song in the last 6 weeks' + mood + 'check your color palette!')
      window.options.oldSchoolColors.state.colors = colors
      app.displayOptionUI(window.options.oldSchoolColors)
    }
  }
}
