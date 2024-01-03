import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


/**
  * Un pocket cube
  * @constructor
  */
export default function PocketCube() {
  this.camera = null;
  this.renderer = null;
  this.scene = null;
  this.mesh = null;
  this.controls = null;

  this.container = document.body;
  this.containerWidth = window.innerWidth 
  this.containerHeight = window.innerHeight 
  this.path = null;
  this.images = null;
}

/**
  * définit le noeud DOM où le cube sera inséré  
  * @description si le container est omis  document.body sera utilisé
  * @memberof PocketCube
  * @param {Element} container
  */
PocketCube.prototype.setContainer = function(container) {
  this.container = container
  this.containerWidth = container?.getBoundingClientRect().width;
  this.containerHeight = container?.getBoundingClientRect().height;
};

/**
  * définit le chemin d'accès au dossier contenant les images
  * @memberof PocketCube
  * @param {string} path
  */
PocketCube.prototype.setImagesPath = function(path) {this.path = path};

/**
  * tableau de 6 images recouvrant la surface du cube 
  * @memberof PocketCube
  * @param {Array<string>} images
  */
PocketCube.prototype.setImages = function(images) {this.images = images};

/**
  * initialise le rendu du cube
  * @memberof PocketCube
  */
PocketCube.prototype.init = function() {
    this.camera = new THREE.PerspectiveCamera( 70, this.containerWidth / this.containerHeight, 0.01, 10 );
    this.camera.position.z = 1;

    this.scene = new THREE.Scene();

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
    this.mesh = new THREE.Mesh( geometry, cubeMaterials );

    this.scene.add( this.mesh );
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setSize( this.containerWidth, this.containerHeight );

    this.container.appendChild( this.renderer.domElement );

    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.update();

    // par défaut le cube est animé
    this.startAnimation();
}

/**
  * lance l'animation du cube
  * @memberof PocketCube
  * @description  init() lance automatiquement l'animation du cube 
  */
PocketCube.prototype.startAnimation = function(){
    this.renderer.setAnimationLoop( (time) => {
      this.mesh.rotation.x = time / 2000;
      this.mesh.rotation.y = time / 1000;
      this.controls.update();
      this.renderer.render( this.scene, this.camera );
    });
  }

/**
  * met l' animation en pause
  * @memberof PocketCube
  */
PocketCube.prototype.stopAnimation = function(){
    this.renderer.setAnimationLoop( () => {
      this.controls.update();
      this.renderer.render( this.scene, this.camera );
    } );
}
