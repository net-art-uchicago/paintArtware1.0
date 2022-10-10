/* global app */
window.options.randomDog = {
  name: 'random dog',
  run: function () {
    // to learn more about this fetchDog() funciton visit:
    // https://netnet.studio/?ex=62
    async function fetchDog () {
      const res = await window.fetch('https://dog.ceo/api/breeds/image/random')
      const json = await res.json()
      // to learn more about drawing images with the Canvas API visit:
      // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
      const img = new window.Image()
      img.crossOrigin = 'Anonymous'
      img.onload = function () {
        const x = Math.random() * app.canvas.width
        const y = Math.random() * app.canvas.height
        app.ctx.drawImage(img, x, y)
      }
      img.src = json.message
    }

    const button = document.createElement('button')
    button.addEventListener('click', fetchDog)
    button.textContent = 'add a pup'
    return button
  }
}
