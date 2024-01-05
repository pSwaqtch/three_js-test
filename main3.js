import * as THREE from 'three';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

let camera, scene, renderer;
let controls;

const cubes = [];

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(3000, 3000, 3000);

  scene = new THREE.Scene();

  for (let i = 0; i < 4 * 4 * 4; i++) {
    const cubeGeometry = new THREE.BoxGeometry(150, 150, 150);
    // const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 });
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff, transparent: true, opacity: 0.7 });
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

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
}

function render() {
  renderer.render(scene, camera);
}
