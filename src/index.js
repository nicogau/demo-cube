import PocketCube from './pocketCube.js';

const images = [
  '1.png',
  '2.png',
  '3.png',
  '4.png',
  '5.png',
  '6.png'
];

// const pocketCube = new PocketCube(undefined, '../images/cube/', images );
const pocketCube = new PocketCube();
pocketCube.setImagesPath('../images/cube/');
pocketCube.setImages(images);
pocketCube.init();
console.log(pocketCube);

const btnStart = document.getElementById("btn-start");
const btnStop = document.getElementById("btn-stop");

btnStart.addEventListener('click', function() {
  pocketCube.startAnimation(); 
})
btnStop.addEventListener('click', function() {
  pocketCube.stopAnimation(); 
})
