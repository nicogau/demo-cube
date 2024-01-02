import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// const width = window.innerWidth;
// const height = window.innerHeight;

// init
let camera;
let renderer;
let scene;
let mesh;
let controls;

export default class PocketCube {

  constructor(container, path, images) {
    this.container = container ?? document.body;
    // todo: a changer
    this.containerWidth = window.innerWidth 
    this.containerHeight = window.innerHeight 
    this.path = path;
    this.images = images;
  }

  init() {
    camera = new THREE.PerspectiveCamera( 70, this.containerWidth / this.containerHeight, 0.01, 10 );
    camera.position.z = 1;

    scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );

    const loader = new THREE
      .TextureLoader()
      .setPath(this.path ?? "./")
    ;
    // creation des textures
    const cubeTextures = this.images.map(image => loader.load(image));
    // creation des materials
    const cubeMaterials = cubeTextures.map(texture => new THREE.MeshBasicMaterial({map: texture}));
    // on applique le materials sur le cube
    mesh = new THREE.Mesh( geometry, cubeMaterials );

    scene.add( mesh );
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( this.containerWidth, this.containerHeight );

    this.container.appendChild( renderer.domElement );

    controls = new OrbitControls( camera, renderer.domElement );
    controls.update();

    // par défaut le cube est animé
    this.startAnimation();
  }

  startAnimation(){
    renderer.setAnimationLoop( function(time) {
      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;
      controls.update();
      renderer.render( scene, camera );
    } );
  }

  stopAnimation(){
    renderer.setAnimationLoop( function() {
      controls.update();
      renderer.render( scene, camera );
    } );
  }
}
