# Creating Functions

Assuming you have an artware.js project setup, start by creating a new JavaScript file in the `/js/functions` directory which looks like this:
```js
window.functions.EXAMPLE = {
  name: 'EXAMPLE',
  type: 'File', // either 'File' or 'Edit'
  run: function () {
    // code to execute when function is run
  }
}
```
Replace `EXAMPLE` with the name of your function, your JavaScript file's name should match that of your filter. This name should be written in lower case and not contain any spaces (use [camel case](https://en.wikipedia.org/wiki/Camel_case) for names containing more than one word).

Your function's object should contain the following properties:

| property | type | description |
|:---:|:---:|:---:|
| `name` | string | the display name as it will appear in the app's menu |
| `menu` | string | the menu to place this function in, for example 'File' or 'Edit' |
| `run` | function | the function to execute when the user chooses this function from the menu |

**NOTE**: If you chosen a `menu` name which hasn't yet been declared in the Artware framework's constructor (declared at the bottom of the app's `index.html`) you will also need to make sure to define the new menu item there.

Once you've finished creating your JavaScript file containing a function object you can add it to the Artware app by updating the app's `/js/settings.json` file and adding your function's name (which should also match your filename) as a string in the setting's `functions` array. Then refresh your app and you should see your new filter appear in the app's filters menu.

**NOTE**: your browser may cash the `/js/settings.json` file, if this happens you'll need to replace the cached file with the new one by requesting it directly in a separate tab in your browser, for example, by visiting: http://localhost:8000/js/settings.json (replacing '8000' with your local development server's port number)

### the `run` function

This is a place to run any arbitrary code with a purpose outside that of the other modules (like a tool or filter). For example, we might create a function for exporting the app's current content to a PNG file like this:
```js
/* global app */
window.functions.export = {
  name: 'export',
  type: 'File',
  run: function () {
    // encodes the canva's image data into a URL
    const url = app.canvas.toDataURL()
    // creates an <a> element (used to create clickable links)
    const a = document.createElement('a')
    // changes the element to: <a download="artware.png">
    a.setAttribute('download', 'artware.png')
    // changes the element to: <a download="artware.png" href="[IMAGE_DATA_URL]">
    a.setAttribute('href', url)
    // clicks the link to auto-trigger the image download
    a.click()
    // removes the link from memory
    a.remove()
  }
}
```
