import {startAnimation, stopAnimation} from  './index.js'

const btnStart = document.getElementById("btn-start");
const btnStop = document.getElementById("btn-stop");

btnStart.addEventListener('click', function() {
  startAnimation(); 
})
btnStop.addEventListener('click', function() {
  stopAnimation(); 
})
