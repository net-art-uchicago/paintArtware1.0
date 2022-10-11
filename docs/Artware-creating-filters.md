# Creating Filters

Assuming you have an artware.js project setup, start by creating a new JavaScript file in the `/js/filters` directory which looks like this:
```js
window.filters.EXAMPLE = {
  name: 'my example filter',
  menu: 'Edit',
  run: function () {
    // your code here
  }
}
```
Replace `EXAMPLE` with the name of your filter, your JavaScript file's name should match that of your filter. This name should be written in lower case and not contain any spaces (use [camel case](https://en.wikipedia.org/wiki/Camel_case) for names containing more than one word).

Your filter's object should contain the following properties:

| property | type | description |
|:---:|:---:|:---:|
| `name` | string | the display name as it will appear in the app's menu |
| `menu` | string | the menu to place this function in, for example 'File' or 'Edit'  |
| `run` | function | the function to execute when the user chooses this filter from the menu |

**NOTE**: If you've chosen a `menu` name which hasn't yet been declared in the Artware framework's constructor (declared at the bottom of the app's `index.html`) you will also need to make sure to define the new menu item there.

Once you've finished creating your JavaScript file containing a filter object you can add it to the Artware app by updating the app's `/js/settings.json` file and adding your filter's name (which should also match your filename) as a string in the setting's `filters` array. Then refresh your app and you should see your new filter appear in the app's filters menu.

**NOTE**: your browser may cash the `/js/settings.json` file, if this happens you'll need to replace the cached file with the new one by requesting it directly in a separate tab in your browser, for example, by visiting: http://localhost:8000/js/settings.json (replacing '8000' with your local development server's port number, if you are running a server on the default port 80 than you can simply visit http://localhost/js/settings.json)

### the `run` function

While you can *technically* use this function to execute any arbitrary code when the user selects your filter from the menu, the purpose of these filter functions is to apply some algorithmic process to the pixels currently in the canvas, which can be done using the Canvas API directly (see MDN's docs on [Pixel manipulation with canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas)), for example:

```js
/* global app */
window.filters.grayscale = {
  name: 'grayscale',
  menu: 'Edit',
  run: function () {
    const imageData = app.ctx.getImageData(0, 0, app.canvas.width, app.canvas.height)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
      data[i] = avg // red
      data[i + 1] = avg // green
      data[i + 2] = avg // blue
    }
    app.ctx.putImageData(imageData, 0, 0)
  }
}
```
**NOTE:** the [Pixel manipulation with canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas) tutorial demonstrates how to create filters using the Canvas API "from scratch" wihch involves first creating a canvas element as well as that canvas's context object, but our Artware framework does this for us. So wherever u see `canvas` variable in that tutorial (or any other HTML5 Canvas API tutorials you find online), you should replace it with `app.canvas` and whereever you see the `ctx` variable you should replace it with `app.ctx`
