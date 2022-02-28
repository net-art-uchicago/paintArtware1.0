# Sentiment

Sent (or `sentiment.js`) is a JavaScript library for evaluating the mood or sentiment of media in the browser. It consists of a set of methods (documented below) which accept inputs of different media and return the sentiment. 

## getting started

Copy the model files in src/models into your project. You'll need to load them in before classifying. 

Include the sentiment.js in your HTML file, and run Sent.loadModels() once to load the machine learning models for the library. Set the path to the models, stored in Sent._PATH_TO_MODELS, to the correct path. By default, the path is './src/models'

## API

#### `loadModels ([path])`

This method loads the necessary models for sentiment classification. path is an option input which contains the file path to the model repository. By default, it is './src/models'.

This method should be run before your project attempts to run any of the other methods.

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

This is an asynchronous function, so to run it you can use an [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) with the await keyword. 

Example usage: 
```js
static async exampleFunction () {
  // load in the models before attempting to classify
  Sent.loadModels()

  const video = Document.getElementById('hypotheticalVideoID')
 
  // for the non-verbose version
  const emotionString = await Sent.readFacialExpression(video)
  // out: emotionString = 'happy'
 
  // for the verbose version:
  const emotionProbabilities = await Sent.readFacialExpression(video, true)
  const angryProbability = emotionProbabilities.angry
  // out: angryProbability = 0.5
}
```

#### `textPredict (text, [verbose])`
This method can be used to score the sentiment of the given text with a value between -1 ("negative") and 1 ("positive"). Verbose is an optional input which controls the format of the output. By default, verbose is false and the model only returns the score. When verbose is true, the output is an object with score and a breakdown of its positive and negative components. In each component, there is the positive (or negative) score contribution and the list of positve (or negative) words contributing.

Example usage:
```js
Sent.textPredict('I hate your guts, but I love you', true)

Out:
  {
    score: 0,
    negative: {
      score: 0.6,
      words: ['hate']
    },
    positive: {
      score: 0.6,
      words: ['love']
    }
  }
```