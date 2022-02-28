/* global faceapi */
class Sent {
  static async loadModels () {
    // load the ml models
    await faceapi.loadFaceExpressionModel('/js/assets/models')
    await faceapi.loadSsdMobilenetv1Model('/js/assets/models')
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
