import * as THREE from 'three';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

let camera, scene, renderer;
let controls;

const cubes = [];
init();

// Mouse move event listener for hover
window.addEventListener("mousemove", handleMouseMove);

// Mouse click event listener
window.addEventListener("click", handleMouseClick);

// Display current camera coordinates
const coordinatesElement = document.getElementById('camera-coordinates');

// Display Hovered Cube Coordinates 
const coordinatesHover = document.getElementById('hover-cube');

// Display Clicked Cube Coordinates 
const coordinatesClick = document.getElementById('clicked-cube');

const coordinatesPoint = document.getElementById('point-coordinates');
coordinatesPoint.textContent = `Hello`;

animate();


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredCube = null;

function handleMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(cubes);

  if (hoveredCube && !hoveredCube.isClicked) {
    hoveredCube.material.color.set(0xcccccc);
    hoveredCubeCoordinates();
  }

  hoveredCube = intersects.length > 0 ? intersects[0].object : null;

  if (hoveredCube && !hoveredCube.isClicked) {
    hoveredCube.material.color.set('#ff0000');
    hoveredCubeCoordinates();
  }
}

function handleMouseClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(cubes);

  if (intersects.length > 0) {
    const selectedCube = intersects[0].object;
    selectedCube.material.color.set('#ff0000');
    selectedCube.isClicked = true;
    clickedCubeCoordinates();
    // Perform additional game logic based on the clicked cube
  }
}


function init() {
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(3000, 3000, 3000);

  scene = new THREE.Scene();

  for (let i = 0; i < 4 * 4 * 4; i++) {
    const cubeGeometry = new THREE.BoxGeometry(150, 150, 150);
    // const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 });
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, transparent: true, opacity: 0.7 });
    // const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc, transparent: true, opacity: 0.7 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    const gridX = (i % 4) * 200 - 300; //red
    const gridY = -(Math.floor((i / 4) % 4) * 200) + 300; //green
    const gridZ = Math.floor(i / 16) * 200 - 300; //blue

    cube.position.set(gridX, gridY, gridZ);
    scene.add(cube);

    cubes.push(cube);
  }

  const canvas = document.querySelector('.webgl')
  renderer = new THREE.WebGLRenderer({canvas})

  renderer.setSize(window.innerWidth, window.innerHeight);

  controls = new TrackballControls(camera, renderer.domElement);
  controls.minDistance = 500;
  controls.maxDistance = 8000;
  controls.addEventListener('change', render);
  window.addEventListener('resize', onWindowResize);
  
  const axesHelper = new THREE.AxesHelper(5000);
  scene.add(axesHelper);

}
function hoveredCubeCoordinates() {
  if (hoveredCube) {
    const hoveredCubePosition = hoveredCube.position;
    const hoveredCubeCoordinatesText = `Hovered Cube Coordinates: 
      Y: ${((hoveredCubePosition.y.toFixed(2)/100)+3)/2}, 
      X: ${(3-(hoveredCubePosition.x.toFixed(2)/100))/2}, 
      Z: ${(3-(hoveredCubePosition.z.toFixed(2)/100))/2}`;
  
    coordinatesHover.textContent = hoveredCubeCoordinatesText;
  }
}

function clickedCubeCoordinates() {
  if (hoveredCube && hoveredCube.isClicked) {
    const clickedCubePosition = hoveredCube.position;
    const clickedCubeCoordinatesText = `Clicked Cube Coordinates: 
      Y: ${((clickedCubePosition.y.toFixed(2)/100)+3)/2}, 
      X: ${(3-(clickedCubePosition.x.toFixed(2)/100))/2}, 
      Z: ${(3-(clickedCubePosition.z.toFixed(2)/100))/2}`;
  
    coordinatesClick.textContent = clickedCubeCoordinatesText;
  }
}

function cameraCoordinates() {
  const cameraPosition = camera.position;
  const cameraCoordinatesText = `Camera Coordinates: 
    X: ${cameraPosition.x.toFixed(2)}, 
    Y: ${cameraPosition.y.toFixed(2)}, 
    Z: ${cameraPosition.z.toFixed(2)}`;

  coordinatesElement.textContent = cameraCoordinatesText;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  cameraCoordinates();
  render();
}

function render() {
  renderer.render(scene, camera);
}
