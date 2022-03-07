function clock () {
  const dt = new Date()
  const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
  const m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  const month = m[dt.getMonth()]
  const weekday = wd[dt.getDay()]
  const day = dt.getDate()
  const hora = dt.getHours()
  const mins = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
    '31', '32', '33', '34', '35', '36', '37', '38', '39', 40,
    '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
    '51', '52', '53', '54', '55', '56', '57', '58', '59']
  const min = mins[dt.getMinutes()]
  const ele = document.querySelector('#date')
  ele.textContent = `${weekday}, ${month} ${day}`
  const elem = document.querySelector('#time')
  elem.textContent = `${hora}:${min}`
}

async function connect1 () {
  const dataFromFile = await fetch('landingtemp.html')
  const ActualHTML = await dataFromFile.text()
  document.querySelector('#landingpage').innerHTML = ActualHTML
  clock()
}// to get the contents in landingtemp on index
connect1()

/*async function facialScanner() {
  Sent.loadModels()
  const video = Document.getElementById('hypotheticalVideoID')
 
  // for the non-verbose version
  const emotionString = await Sent.readFacialExpression(video)
  // out: emotionString = 'happy'


}*/

async function decideTheme () {
  Sent.loadModels()
  const video = Document.getElementById('videoElement')
  video.srcObject = UserMedia.getStream

  // for the non-verbose version
  const emotionString = await Sent.readFacialExpression(video)
  // out: emotionString = 'happy'



  // <link rel="stylesheet" href="/css/peacefulTheme.css">
  const linkTag = document.createElement('link')
  linkTag.setAttribute('rel', 'stylesheet')

  if(emotionString == 'happy'){ 
  linkTag.setAttribute('href', '/css/joyTheme.css') // recreating line 31, loads whatever css its instructed to
  } else if (emotionString == 'sad'){
    linkTag.setAttribute('href', '/css/sadTheme.css') // recreating line 31, loads whatever css its instructed to
  } else if (emotionString == 'neutral'){
    linkTag.setAttribute('href', '/css/mehTheme.css') // recreating line 31, loads whatever css its instructed to
  } else if (emotionString == 'surprised'){
    linkTag.setAttribute('href', '/css/peacefulTheme.css') // recreating line 31, loads whatever css its instructed to
  } else if(emotionString == 'angry'){
    linkTag.setAttribute('href', '/css/angryTheme.css') // recreating line 31, loads whatever css its instructed to
  } else if (emotionString == 'disgusted'){
    linkTag.setAttribute('href', '/css/tiredTheme.css') // recreating line 31, loads whatever css its instructed to
  } else if (emotionString == 'fearful'){//??
    linkTag.setAttribute('href', '/css/peacefulTheme.css') // recreating line 31, loads whatever css its instructed to
  }

  linkTag.addEventListener('load', () => {
    document.querySelector('#landingpage').remove()// remove the landing page
  }) // dont load whatever is in function until after line 38 loads
  // maes 38 happen b4 36
  document.head.appendChild(linkTag)// add linkTag to html file
}

/*function decideTheme () {



  // <link rel="stylesheet" href="/css/peacefulTheme.css">
  const linkTag = document.createElement('link')
  linkTag.setAttribute('rel', 'stylesheet')
  linkTag.setAttribute('href', '/css/peacefulTheme.css') // recreating line 31, loads whatever css its instructed to
  linkTag.addEventListener('load', () => {
    document.querySelector('#landingpage').remove()// remove the landing page
  }) // dont load whatever is in function until after line 38 loads
  // maes 38 happen b4 36
  document.head.appendChild(linkTag)// add linkTag to html file
}*/
