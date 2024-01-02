import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const width = window.innerWidth;
const height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
camera.position.z = 1;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
// const loader = new THREE.CubeTextureLoader();
const loader = new THREE
  .TextureLoader()
  .setPath('../assets/cube/')
;

const images = [
  '1.png',
  '2.png',
  '3.png',
  '4.png',
  '5.png',
  '6.png'
];

// creation des textures
const cubeTextures = images.map(image => loader.load(image));
// creation des materials
const cubeMaterials = cubeTextures.map(texture => new THREE.MeshBasicMaterial({map: texture}));
// on applique le materials sur le cube
const mesh = new THREE.Mesh( geometry, cubeMaterials );

scene.add( mesh );
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );

document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

// par défaut le cube est animé
startAnimation();

function infiniteRotateAnimation( time ) {
	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;

  controls.update();

	renderer.render( scene, camera );
}

function noRotateAnimation() {
  controls.update();
	renderer.render( scene, camera );
}


export function stopAnimation(){
  renderer.setAnimationLoop( noRotateAnimation );
  controls.update();
	renderer.render( scene, camera );
}
export function startAnimation(){
  renderer.setAnimationLoop( infiniteRotateAnimation );
	renderer.render( scene, camera );
}
