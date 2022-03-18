/* global C2D */
window.options.paintData = {
  name: 'paint data',
  state: {
  },
  run: function () {
    // file upload button vanilla js
    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = e => {
      // getting a hold of the file reference
      const file = e.target.files[0]
      // setting up the reader
      const reader = new FileReader()
      reader.readAsText(file, 'UTF-8')

      // here we tell the reader what to do when it's done reading...
      reader.onload = readerEvent => {
        const content = readerEvent.target.result // this is the content!
        const asciiArr = []
        for (let i = 0; i < content.length; i++) {
          const ascii = content.charCodeAt(i)
          asciiArr.push(ascii)
        }
        const pixels = C2D.getPixels()
        // Reassigning each Pixel according to the text ASCII code
        for (let j = 0; j < pixels.length; j++) {
          pixels[j].r = asciiArr[j % asciiArr.length]
          pixels[j].g = asciiArr[(2 * j) % asciiArr.length]
          pixels[j].b = asciiArr[(3 * j) % asciiArr.length]
          pixels[j].a = 255
        }
        C2D.setPixels(pixels)
      }
    }
    return input
  }
}
