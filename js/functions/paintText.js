/* global C2D */
window.functions.paintText = {
  name: 'paint text',
  type: 'Edit',
  run: function () {
    // Thought of this option/function when thinking about how to go from MIDI to image.
    // Prompt a string from the user.
    const s = window.prompt('Enter a string: ')
    // Convert string into ascii characters
    const asciiArr = []
    for (let i = 0; i < s.length; i++) {
      const ascii = s.charCodeAt(i)
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
