const brandCircle = 'M0 149.78C0 67.6113 61.7332 1 143.902 1C226.072 1 300 67.6113 300 149.78C300 231.95 226.072 298.561 143.902 298.561C61.7332 298.561 0 231.95 0 149.78Z'
const brandSquare = 'M3.78707 18.0333C3.89287 10.2885 10.2671 4.10144 18.0115 4.22635L286.226 8.55238C293.869 8.67565 300 14.9066 300 22.5506V281.247C300 288.979 293.732 295.247 286 295.247H14.1926C6.38579 295.247 0.0872298 288.862 0.19387 281.055L3.78707 18.0333Z'
const brandTriangle = 'M65.2074 15.8374C66.4642 10.0952 73.2771 7.6238 77.9231 11.2247L283.884 170.853C288.791 174.656 287.685 182.356 281.905 184.624L18.3769 288.008C12.4242 290.343 6.27307 285.096 7.64028 278.85L65.2074 15.8374Z'
//var draw = SVG()

const cMidnight = '#0E0940'
const cMidnightLow = '#050316'
const cMidnightHigh = '#221C5F'

const cDaylight = '#EDF6FF'
const cDaylightLow = '#D4E5F7'
const cDaylightHigh = '#FAFDFF'

const cPurple = '#5631E8'
const cPurpleLow = '#3414B1'
const cPurpleHigh = '#7957FF'

const cRed = '#FF4F68'
const cRedLow = '#EF3953'
const cRedHigh = '#FF758C'

const cYellow = '#FFD833'
const cYellowLow = '#FFC91A'
const cYellowHigh = '#FBE36A'

const cTeal = '#2AF9C9'
const cTealLow = '#00EBB4'
const cTealHigh = '#66FFDC'

const cShapes = [brandCircle,brandSquare,brandTriangle]

var cColors = [cPurple,cRed,cYellow,cTeal,cMidnightHigh,cMidnightLow,cDaylight]
var cPrime = cMidnight;
var cSecond = cMidnightHigh;

var draw;
var bgRect;
var quadrant;
this.refresh();

function refresh() {
  let main = document.getElementById("main");
  while (main.hasChildNodes()) {
    main.removeChild(main.firstChild);
  }

  draw = SVG().addTo('#main').size(window.innerWidth,window.innerHeight);
  bgRect = draw.rect('100%','100%').fill(cPrime);

  let group = draw.group()
  group.add = largeRandomShape()
  let count = 3 + Math.round(Math.random() * 8);
  for (let i = 0; i < count; i++) { 
    group.add = randomShape()
  }
}

function save(type) {
  const canvas = document.createElement("canvas");
  const svg = document.querySelector('svg');
  const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
  switch(type) { 
    case "svg":
      const a = document.createElement('a');
      const e = new MouseEvent('click');
      a.download = 'texture.svg';
      a.href = 'data:image/svg+xml;base64,' + base64doc;
      a.dispatchEvent(e);
      break;
    case "png":
      const w = parseInt(svg.getAttribute('width'));
      const h = parseInt(svg.getAttribute('height'));
      const img_to_download = document.createElement('img');
      img_to_download.src = 'data:image/svg+xml;base64,' + base64doc;
      console.log(w, h);
      img_to_download.onload = function () {
        console.log('img loaded');
        canvas.setAttribute('width', w);
        canvas.setAttribute('height', h);
        const context = canvas.getContext("2d");
        //context.clearRect(0, 0, w, h);
        context.drawImage(img_to_download,0,0,w,h);
        const dataURL = canvas.toDataURL('image/png');
        if (window.navigator.msSaveBlob) {
          window.navigator.msSaveBlob(canvas.msToBlob(), "download.png");
          e.preventDefault();
        } else {
          const a = document.createElement('a');
          const my_evt = new MouseEvent('click');
          a.download = 'download.png';
          a.href = dataURL;
          a.dispatchEvent(my_evt);
        }
        //canvas.parentNode.removeChild(canvas);
        }
      break;
  }
}

function theme(el) {
  var sColor = el.options[el.selectedIndex].value;
  switch(sColor) {
    case "Daylight":
      cColors = [cPurple,cRed,cYellow,cTeal,cDaylightHigh,cDaylightLow,cMidnight]
      cPrime = cDaylight;
      cSecond = cDaylightLow;
      break;
    case "Red":
      cColors = [cPurple,cYellow,cTeal,cRedHigh,cRedLow,cDaylight,cMidnight]
      cPrime = cRed;
      cSecond = cRedLow;
      break;
    case "Yellow":
      cColors = [cPurple,cRed,cTeal,cYellowHigh,cYellowLow,cDaylight,cMidnight]
      cPrime = cYellow;
      cSecond = cYellowLow;
      break;
    case "Teal":
      cColors = [cPurple,cRed,cYellow,cTealHigh,cTealLow,cDaylight,cMidnight]
      cPrime = cTeal;
      cSecond = cTealLow;
      break;
    case "Purple":
      cColors = [cRed,cYellow,cTeal,cPurpleHigh,cPurpleLow,cDaylight,cMidnight]
      cPrime = cPurple;
      cSecond = cPurpleLow;
      break;
    default:
      cColors = [cPurple,cRed,cYellow,cTeal,cMidnightHigh,cMidnightLow,cDaylight]
      cPrime = cMidnight;
      cSecond = cMidnightHigh;
  }
  refresh();
}

function randomShape() {
  var sRot = Math.random() * 180
  var sColor = cColors[Math.floor(Math.random() * cColors.length)]
  var sShape = cShapes[Math.floor(Math.random() * cShapes.length)]
  var sSize = 20 + (Math.pow(Math.round(Math.random() * 15), 2))

  return draw.path(sShape).fill(sColor).move(xpos(sSize),ypos(sSize)).size(sSize).rotate(sRot)
}

function largeRandomShape() {
  var sRot = Math.random() * 180
  var sShape = cShapes[Math.floor(Math.random() * cShapes.length)]
  var sSize = Math.pow(Math.round(Math.random() * Math.sqrt(window.innerWidth)), 2)

  return draw.path(sShape).fill(cSecond).move(xpos(sSize),ypos(sSize)).size(sSize).rotate(sRot)
}

function xpos(size) {
  var sX;
  switch(quadrant) {
    case 1:
      sX = Math.round(Math.random() * (window.innerWidth/2))
      break;
    case 2:
      sX = (window.innerWidth/2) + Math.round(Math.random() * (window.innerWidth/2))
      break;
    case 3:
        sX = Math.round(Math.random() * (window.innerWidth/2))
        break;
    case 4:
        sX = (window.innerWidth/2) + Math.round(Math.random() * (window.innerWidth/2))
        break;
    default:
      sX = Math.round(Math.random() * window.innerWidth)
  }
  return sX-(size/2);
}
function ypos(size) {
  switch(quadrant) {
    case 1:
      sY = Math.round(Math.random() * (window.innerHeight/2))
      break;
    case 2:
      sY = (window.innerHeight/2) + Math.round(Math.random() * (window.innerHeight/2))
      break;
    case 3:
      sY = Math.round(Math.random() * (window.innerHeight/2))
      break;
    case 4:
      sY = (window.innerHeight/2) + Math.round(Math.random() * (window.innerHeight/2))
      break;
    default:
      sY = Math.round(Math.random() * window.innerHeight)
  }
  return sY-(size/2);
}