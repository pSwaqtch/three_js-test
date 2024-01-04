import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "/node_modules/three/examples/jsm/loaders/GLTFLoader.js";

// Scene
const scene = new THREE.Scene();

// Size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(-2, 1, 1); // Set initial camera position

//renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(3)
renderer.render(scene,camera)

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0

// Loaders
const loader = new GLTFLoader();

let object;

loader.load(
  'scene.gltf',
  function (gltf) {
    // If the file is loaded, add it to the scene
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    // While it is loading, log the progress
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  function (error) {
    // If there is an error, log it
    console.error(error);
  }
);

// Display current camera coordinates
const coordinatesElement = document.getElementById('coordinates');

// Animation Loop
const animate = function () {
  requestAnimationFrame(animate);

  // Update controls
  controls.update();

  // Render scene
  renderer.render(scene,camera)

  // Display current camera coordinates
  const cameraPosition = camera.position;
  const cameraCoordinatesText = `Camera Coordinates: 
    X: ${cameraPosition.x.toFixed(2)}, 
    Y: ${cameraPosition.y.toFixed(2)}, 
    Z: ${cameraPosition.z.toFixed(2)}`;

  coordinatesElement.textContent = cameraCoordinatesText;
};

// Start animation loop
animate();
