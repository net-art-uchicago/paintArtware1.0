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
    <head>
   
    <style>
    .title {
      font-family: "Impact", Impact, sans-serif;
    }
    .start-button {
      width: 70px;
      height: 70px;
      border: none;
      border-radius: 100px;
      outline: none;
      background: #228b22;
      color: white; 
      cursor: pointer;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
    }
    .start-button:hover {
      background: #90EE90;
    }
    .stop-button {
      width: 70px;
      height: 70px;
      border: none;
      border-radius: 100px;
      outline: none;
      background: #B22222;
      color: white; 
      cursor: pointer;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
    }
    .stop-button:hover {
      background: #FF6347;
    }
    </style>
    </head>
    <body>
    <div class = "title" > <b> Screen Recording Buttons: </b> </div>
    <div class="recorder">
        <button class="start-button" id="start"> 
          Start 
        </button>
        <button class="stop-button" id="stop" disabled>
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
