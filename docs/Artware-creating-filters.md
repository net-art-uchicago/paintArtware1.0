# Creating Filters

Assuming you have an artware.js project setup, start by creating a new JavaScript file in the `/js/filters` directory which looks like this:
```js
window.filters.EXAMPLE = {
  name: 'my example filter',
  run: function () {
    // your code here
  }
}
```
Replace `EXAMPLE` with the name of your filter, your JavaScript file's name should match that of your filter. This name should be written in lower case and not contain any spaces (use [camel case](https://en.wikipedia.org/wiki/Camel_case) for names containing more than one word).

Your filter's object should contain the following properties:

| property | type | description |
|:---:|:---:|:---:|
| `name` | string | the display name as it will appear in the app's filters menu |
| `run` | function | the function to execute when the user chooses this filter from the menu |

Once you've finished creating your JavaScript file containing a filter object you can add it to the Artware app by updating the app's `/js/settings.json` file and adding your filter's name (which should also match your filename) as a string in the setting's `filters` array. Then refresh your app and you should see your new filter appear in the app's filters menu.

### the `run` function

While you can *technically* use this function to execute any arbitrary code when the user selects your filter from the menu, the purpose of these filter functions is to apply some algorithmic process to the pixels currently in the canvas, which can be done using the Canvas API directly (see MDN's docs on [Pixel manipulation with canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas)), for example:

```js
window.filters.grayscale = {
  name: 'grayscale',
  run: function () {
    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
        data[i] = avg // red
        data[i + 1] = avg // green
        data[i + 2] = avg // blue
    }
    ctx.putImageData(imageData, 0, 0)
  }
}
```

The same effect could also be accomplished with a little less code using the `C2D.getPixels()` and `C2D.setPixels()` methods in the [cavnas2d.js](https://github.com/net-art-uchicago/paintArtware1.0/blob/main/docs/C2D.md) library.

```js
window.filters.grayscale = {
  name: 'grayscale',
  run: function () {
    const pixels = C2D.getPixels()
    pixels.forEach(pxl => {
      const avg = (pxl.r + pxl.b + pxl.g) / 3
      pxl.r = pxl.g = pxl.b = avg
    })
    C2D.setPixels(pixels)
  }
}
```
