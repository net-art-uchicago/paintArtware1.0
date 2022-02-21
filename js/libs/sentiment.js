/* global faceapi */
class Sent {
  static async loadModels () {
    // load the ml models
    this._PATH_TO_MODELS = 'js/assets/models'
    await faceapi.loadFaceExpressionModel(this._PATH_TO_MODELS)
    await faceapi.loadSsdMobilenetv1Model(this._PATH_TO_MODELS)
  }

  static textPredict () {}

  static async readFacialExpression (img, verbose = false) {
    // read the facial expression of input
    const extractPrimaryEmotion = (expressionProbability) => {
      // get the emotion of max probability from the object
      const emotions = ['angry', 'disgusted', 'fearful', 'happy', 'neutral', 'sad', 'surprised']
      let maxValue = -1
      let primaryEmotion = ''

      emotions.forEach(e => {
        if (expressionProbability[e] > maxValue) {
          maxValue = expressionProbability[e]
          primaryEmotion = e
        }
      })
      return primaryEmotion
    }

    // detect expression
    const output = await faceapi.detectSingleFace(img).withFaceExpressions()
    const expressions = output.expressions
    if (verbose) {
      // return full object
      return expressions
    }
    return extractPrimaryEmotion(expressions)
  }

  static getMood () {}

  static getTopSong () {}

  static getColor () {}
}

window.Sent = Sent
