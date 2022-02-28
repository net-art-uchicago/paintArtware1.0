/* global C2D */
window.options.recorder = {
  name: 'recorder',

  state: {
    start: [true, false],
    end: [true, false]
  },
  run: function () {
    const div = document.createElement('div')
    div.innerHTML = `
    <html>
    <b>Recording Buttons</b>
    
    <div class="recorder">
        <button id="start">
          Start 
        </button>
        <button id="stop" disabled>
          Stop 
        </button> 
        </div>   
    <html>
    
    `
    const start = div.querySelector('#start')
    const stop = div.querySelector('#stop')
    let mediaRecorder, stream

    start.addEventListener('click', async function () {
      start.setAttribute('disabled', true)
      stop.removeAttribute('disabled')

      const stream = await startRecording()
      const mimeType = 'video/webm'
      mediaRecorder = createRecorder(stream, mimeType)
      startRecording()
    })

    stop.addEventListener('click', () => {
      stop.setAttribute('disabled', true)
      start.removeAttribute('disabled')
      mediaRecorder.stop()
      stream.getVideoTracks()[0].stop()
    })
    async function startRecording () {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: 'canvas2d' }
      })
      return stream
    }

    function createRecorder (stream, mimeType) {
      let recordedChunks = []

      const mediaRecorder = new window.MediaRecorder(stream)

      mediaRecorder.ondataavailable = function (e) {
        if (e.data.size > 0) {
          recordedChunks.push(e.data)
        }
      }
      mediaRecorder.onstop = function () {
        saveFile(recordedChunks)
        recordedChunks = []
      }
      mediaRecorder.start(200)
      return mediaRecorder
    }
    function saveFile (recordedChunks) {
      const blob = new window.Blob(recordedChunks, {
        type: 'video/webm'
      })
      const filename = window.prompt('Enter file name')
      const downloadLink = document.createElement('a')
      downloadLink.href = URL.createObjectURL(blob)
      downloadLink.download = `${filename}.webm`

      document.body.appendChild(downloadLink)
      downloadLink.click()
      URL.revokeObjectURL(blob)
      document.body.removeChild(downloadLink)
    }

    return div
  }
}
