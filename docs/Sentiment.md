# Sent

Sent (or `sentiment.js`) is a JavaScript library for evaluating the mood or sentiment of media in the browser. It consists of a set of methods (documented below) which accept inputs of different media, and return the sentiment. 

## API

#### `readFacialExpression (image, [verbose])`

This method can be used to classify the emotion of the face in image. It takes in ‘image’, which can be an [HTML5 image](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) or an [HTML5 video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video). Verbose is an optional input which controls the format of the output. By default, verbose is false and the classifier returns a string (‘happy’, ‘sad’, ‘angry’, etc.) which is the primary emotion identified. If verbose is true, the output is an object with the likelihood of each of 7 emotions being present:

```js
	{
    angry: 0.00010794925037771463
    disgusted: 0.000025764044039533474
    fearful: 0.00003148596078972332
    happy: 0.969147801399231
    neutral: 0.02727043442428112
    sad: 0.0027909078635275364
    surprised: 0.000625754299107939
	}
```
If no face is detected, the function will return null.

This is an asynchronous function, so it needs to be called in an [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) with the await keyword. 

Example usage: 
```js
static async exampleFunction () {
// 	   ^^ use async keyword
  const video = Document.getElementById('hypotheticalVideoID')
 
  // for the non-verbose version
  const emotionString = await Sent.readFacialExpression(video)
  // out: emotionString = 'happy'
 
  // for the verbose version:
  const emotionProbabilities = await Sent.readFacialExpression(video, verbose = true)
  const angryProbability = emotionProbabilities.angry
  // out: angryProbability = 0.5
}
```
