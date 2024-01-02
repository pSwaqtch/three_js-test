import * as THREE from 'https://threejs.org/build/three.module.js';
import "./style.css"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

//Scene
const scene = new THREE.Scene()

//sphere
const geometry = new THREE.SphereGeometry(3,64,64)
const material = new THREE.MeshStandardMaterial({
  color: '#00ff83'
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//size
const sizes = {
  width : window.innerWidth,
  height : window.innerHeight
}

//light
const light = new THREE.PointLight(0xffffff, 175, 100)
light.position.set(10,10,10)
scene.add(light)

//camera
const camera  = new THREE.PerspectiveCamera(45,sizes.width/sizes.height,0.1,100)
camera.position.z = 20
scene.add(camera)

//renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene,camera)

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 1

// Resize event listener
window.addEventListener("resize", () => {
  // Update sizes on window resize
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera aspect ratio
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer size
  renderer.setSize(sizes.width, sizes.height);
});

// Render function
const render = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render); // Loop the render function for smooth animation
};

// Initial call to the render function
render();
