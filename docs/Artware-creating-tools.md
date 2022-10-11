# Creating Tools

Assuming you have an artware.js project setup, start by creating a new JavaScript file in the `/js/tools` directory which looks like this:
```js
/* global app */
window.tools.EXAMPLE = {
  name: 'my example tool',
  icon: '/images/EXAMPLE.png',
  state: {
    selected: false
    // other state properties go here
  },
  events: {
    // window events go here
  }
}
```
Replace `EXAMPLE` with the name of your tool, your JavaScript file's name should match that of your tool. This name should be written in lower case and not contain any spaces (use [camel case](https://en.wikipedia.org/wiki/Camel_case) for names containing more than one word).

Your tool's object should contain the following properties:

| property | type | description |
|:---:|:---:|:---:|
| `name` | string | the display name as you want it to appear in the app |
| `icon` | string | path to the tool's icon which should appear in the tool bar |
| `cursor` | string | path to the tool's custom cursor image |
| `state` | object | your tool's internal state object |
| `events` | object | your tool's window event object  |

Once you've finished creating your JavaScript file containing a tool object you can add it to the Artware app by updating the app's `/js/settings.json` file and adding your tool's name (which should also match your filename) as a string in the setting's `tools` array. Then refresh your app and you should see your new tool appear in the tool bar.

**NOTE**: your browser may cash the `/js/settings.json` file, if this happens you'll need to replace the chached file with the new one by requesting it directly in a separate tab in your browser, for example, by visiting: http://localhost:8000/js/settings.json (replacing '8000' with your local development server's port number)

### state

Your tool's `state` property is an object used to keep track of any [state](https://en.wikipedia.org/wiki/State_(computer_science)) properties your tool needs. Think of these as your tool's internal variables. At the very least it needs to contain a `selected` property which indicates weather or not this tool is currently selected by the user. This value changes anytime the user makes a new selection from the app's toolbar. You can add as many additional state properties as you like, one useful property might be a `mousePressed` boolean.

```js
state: {
  selected: false,
  mousePressed: false
}
```

### events

Your tool's `events` property is an object used to define any browser [window events](https://developer.mozilla.org/en-US/docs/Web/API/Window#events) your tool requires:
```js
events: {
  EVENT_NAME: function () {
    // your code here
  }
}
```
Where `EVENT_NAME` should be a valid [window event](https://developer.mozilla.org/en-US/docs/Web/Events) name. A common pattern is to create `mousedown`, `mouseup` and `mousemove` event functions where the `mousedown` and `mouseup` functions are used to change your tool's internal state's `mousePressed` property to `true` and `false` respectively. Your `mousemove` function can then check it's internal state to see if the user has this tool selected *and* if the mouse is currently pressed. If so, it can proceed to do whatever it is your tool does, in the example below our tool draws circles at the mouse's location.
```js
events: {
  mousedown: function (e, self) {
    self.state.mousePressed = true
  },
  mouseup: function (e, self) {
    self.state.mousePressed = false
  },
  mousemove: function (e, self) {
    // if self tool is selected AND the mouse is pressed
    if (self.state.selected && self.state.mousePressed) {
      const mouse = app.eventToMouse(e)
      // draw a box
      app.ctx.rect(mouse.x, mouse.y, 10, 10)
    }
  }
}
```

These event functions will give you access to two objects via it's arguments. The first (which I've defined as `e` above) is the standard [event object](https://developer.mozilla.org/en-US/docs/Web/API/Event) which is typically passed into any browser [window event](https://developer.mozilla.org/en-US/docs/Web/Events), the second (which I've defined as `self` above) is a reference to the tool itself. You can use this to access your tool's state like `self.state` or any other property in your tool like `self.icon` for example.
