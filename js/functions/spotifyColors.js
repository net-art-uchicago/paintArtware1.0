window.functions.spotifyColors = {
  name: 'spotify colors',
  type: 'Edit',
  run: function () {
    const spotifyAuth = window.Sent.getSpotifyAuth('d41b83c2f2224356bd94fbf83924e6d4', 'https://artware.app')
    if (spotifyAuth) {
      const colors = window.Sent.getColors()
      while (window.options.oldSchoolColors.state.colors.length > 0) {
        window.options.oldSchoolColors.state.colors.pop()
      }
      window.options.oldSchoolColors.state.colors.push(colors)
    } else {
      return console.error('Spotify auth failed')
    }
  }
}
