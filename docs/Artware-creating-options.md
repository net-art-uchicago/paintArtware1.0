# Creating Options

Assuming you have an artware.js project setup, start by creating a new JavaScript file in the `/js/options` directory which looks like this:
```js
/* global C2D */
window.options.EXAMPLE = {
  name: 'EXAMPLE',
  state: {
    // optional state properties go here
  },
  run: function () {
    // create and return a valid HTML element here
  }
}
```
Replace `EXAMPLE` with the name of your option, your JavaScript file's name should match that of your filter. This name should be written in lower case and not contain any spaces (use [camel case](https://en.wikipedia.org/wiki/Camel_case) for names containing more than one word).

Your option's object should contain the following properties:

| property | type | description |
|:---:|:---:|:---:|
| `name` | string | the display name as it will appear in the app's menu |
| `state` | object | your option's internal state (optional) |
| `run` | function | the code to execute when the user chooses this option from the menu |

Once you've finished creating your JavaScript file containing a option object you can add it to the Artware app by updating the app's `/js/settings.json` file and adding your option's name (which should also match your filename) as a string in the setting's `options` array. Then refresh your app and you should see your new filter appear in the app's filters menu.

**NOTE**: your browser may cash the `/js/settings.json` file, if this happens you'll need to replace the cached file with the new one by requesting it directly in a separate tab in your browser, for example, by visiting: http://localhost:8000/js/settings.json (replacing '8000' with your local development server's port number)

### the `run` function

The primary purpose of option modules is to create custom UI (user interface) elements the user can use to adjust the app's internal state. These UI elements can be created from any HTML/CSS code. The run function is where you create the UI elements, it should create and return a valid *HTMLElement*. You can use the Web's [DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) to create your HTML/CSS UI via JavaScript.

You could use a more *declarative* approach like this:
```js
/* global app */
window.options.textField = {
  name: 'text options',
  state: {
    text: ''
  },
  run: function () {
    const ele = document.createElement('div')
    ele.innerHTML = `
      <style>
        .text-field {
          padding: 10px;
          border-radius: 15px;
        }
      </style>

      <input
        type="text"
        placeholder="type your text"
        class="text-field"
        oninput="window.options.textField.state.text = this.value">
    `
    return ele
  }
}
```

Or a more *imperative* approach like this:
```js
/* global app */
window.options.textField = {
  name: 'text options',
  state: {
    text: ''
  },
  run: function () {
    const ele = document.createElement('input')
    ele.setAttribute('type', 'text')
    ele.setAttribute('placeholder', 'type your text')
    ele.style.padding = '10px'
    ele.style.borderRadius = '15px'
    ele.addEventListener('input', function () {
      window.options.textField.state.text = this.value
    })
    return ele
  }
}
```
