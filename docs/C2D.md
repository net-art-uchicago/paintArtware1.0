# C2D

C2D (or `canvas2d.js`) is a JavaScript library for creating 2D graphics in the browser. It consists of a set of properties and methods (documented below) which simplify some of the Web's [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).

## getting started

Include the library in your HTML file. You can [download the library](https://raw.githubusercontent.com/net-art-uchicago/paintArtware1.0/main/js/libs/canvas2d.js) and host it yourself, or you can link to the current version hosted on artware.app like.
```html
<script src="https://artware.app/js/libs/canvas2d.js"></script>
<script>
  // your JavaScript code here...
</script>
```

The first thing you need to do in your JavaScript code is create a HTML5 canvas using the `C2D.createCanvas()` method, after which point you can use any of the libraries properties and methods to draw onto your canvas.

```js
  // create HTML5 <canvas> and a 2d drawing context
  C2D.createCanvas()
  // calculate the horizontal center of the canvas
  const centerX = C2D.width / 2
  // calculate the vertical center of the canvas
  const centerY = C2D.height / 2
  // draw an ellipse at the center of the canvas
  C2D.ellipse(centerX, centerY, 100)
```

Here's an [interactive example](https://netnet.studio/?layout=dock-left#code/eJxtkEFuwjAQRdfNKUZ0kYCimKIKASVZFOiq3fUCjj1NDMaO7IEUVb1744Aoqip5pPGb/79HXpZWnsDTSWM+2HNXKbOA8ROUXOwqZw9GLuB+9iDm88dBsWRBXURLL5xqCLwT+aAmavyCMe6o5Q4z3jRs65lWpWeCmyP3E5ltfXCfbVd/Ed2xEVTallzDarKGEYsgNJlwyAlXvTsZdvDCP5TWkEN82Si+YE/O7vCfgUNByTiF7oRrqyTV57ZGVdV0E32TsZmun6cv8d83f3GrjLRtxqXcHNHQq/KEBl0S7+3B494eMU4hwSHkBXx1egBhjSfox11WiMXgfLdvAXXSXtVzrVXToV6bfaZnU3ZKYTILFZTfw+j6mT8idIO2)

## API

#### `createCanvas([width], [height])`

This method can be used to create an [HTML5 canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) element as well as a [2d drawing context](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext) for that canvas. It takes optional `width` and `height` arguments, when no arguments are passed the canvas's width and height will default to the width and height of the window (at the moment the method is called).

The `C2D` object stores the canvas and drawing context internally. These can be accessed using it's `canvas` and `ctx` properties. For example:
```js
  C2D.createCanvas()
  C2D.canvas // returns the <canvas> element
  C2D.ctx // returns the drawing context
```

These internal properties can be used to interact with any aspect of the Web's [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) directly. Additionally, you can create your own canvas and drawing context and assign it to these internal variables.

```js
  // assuming we've created a single <canvas> element on our HTML page
  C2D.canvas = document.querySelector('canvas')
  C2D.ctx = C2D.canvas.getContext('2d')
```

#### properties

| property | type | description | default |
|:---:|:---:|:---:|:---:|
| `width` | number | n/a |the [width](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/width) of the canvas, an alias for `C2D.canvas.width` |
| `height` | number | n/a | the [height](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/height) of the canvas, an alias for `C2D.canvas.height` |
| `fill` | string | '#fff' | the current [fill style](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle) of the drawing context, an alias for `C2D.ctx.fillStyle` |
| `stroke` | string | '#000' | the current [stroke style](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle) of the drawing context, an alias for `C2D.ctx.strokeStyle` |
| `fontSize` | number | 48 | the font size in pixels of any font drawn on the canvas. Allows easier writing to [`C2D.ctx.font`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font) |
| `fontStyle` | string | 'serif' | the actual style of text drawn on the canvas. Allows for easier writing to [`C2D.ctx.font`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font).|
|  `fontAlign` | string | 'center' |the [text align](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign) for text drawn on the canvas, an alias for `C2D.ctx.textAlign`. Must be either 'left', 'right, 'center', 'start', or 'end', or an error will be thrown. See the linked Mozilla docs for more on each option.
| `fontBaseline` | string | 'baseline' |the [text baseline](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline) of text drawn on the canvas, an alias for `C2D.ctx.textBaseline`. Must be either 'top', 'hanging', 'middle', 'alphabetic', 'ideographic', or 'bottom'. See the linked Mozilla docs for more on each option.
#### `ellipse(x, y, w, [h])`

This method draws an ellipse (oval) onto the canvas. It's first two arguments set the ellipse's `x` (horizontal) and `y` (vertical) position relative to the canvas. It's third argument, `w`, can be used to set both the ellipse's width and height. An optional fourth argument can be used to set a height value different from it's width.

#### `rect(x, y, w, h)`

This method draws a rectangle to the canvas.  It's first two arguments set the rectangle's `x` (horizontal) and `y` (vertical) position relative to the canvas. It's third and fourth arguments set the rectangle's `w` (width) and `h` (height).

#### `line(x1, y1, x2, y2)`

This method draws a line to the canvas. It's first two arguments set the `x` (horizontal) and `y` (vertical) position of one end of the line, while it's third and fourth arguments set the `x` (horizontal) and `y` (vertical) position of the other end.

#### `getPixels()`

This method returns the canvas's current raw pixel data as a one-dimensional [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of objects. These pixel objects contain `r`, `g`, `b` and `a` properties with integer values between `0` and `255`, For example:

```js
  const pixels = C2D.getPixels()

  pixels[0].r // returns the red channel of the first pixel
  pixels[0].g // returns the green channel of the first pixel
  pixels[0].b // returns the blue channel of the first pixel

  pixels[1].r // returns the red channel of the second pixel
  // ...etc
```

#### `setPixels(pixels)`

This method takes a one-dimensional [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) of pixel objects (like the kind returned by the `getPixels()` method) to replaces the canvas's current image data with.


#### `getPixelData()`

This method returns the canvas's current raw [image data](https://developer.mozilla.org/en-US/docs/Web/API/ImageData/data), which is a one-dimensional [Uint8ClampedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray) containing all the pixel data in RGBA order with integer values between `0` and `255`, For example:

```js
  const pixels = C2D.getPixelData()
  pixels[0] // returns the red channel of the first pixel
  pixels[1] // returns the green channel of the first pixel
  pixels[2] // returns the blue channel of the first pixel
  pixels[3] // returns the alpha channel of the first pixel
  pixels[4] // returns the red channel of the second pixel
  // ...etc
```

#### `text(text, x, y, [style])`

This method writes the inputted `text` to the canvas. Accepts a string `text`, telling it what to write, as well as two numbers `x` and `y` that control the horizontal position and vertical position, respectively. `[style]` is an optional parameter accepting strings that determines how text is drawn, and can be set to `'fill'`, `'stroke'`, `'both'`, or `'-both'`. When set to `'fill'`, `text()` will draw [fill text](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText). When set to `'stroke'`, `text()` will draw [stroke text](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeText). If set to `'both'`, `text()` will first draw filled text and then stroked text. If set to `'-both'`, `text()` will first draw stroked text and then draw filled text.  
