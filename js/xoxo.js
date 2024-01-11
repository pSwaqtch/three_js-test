import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Create a scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111); // Background color

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1;

//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(2);

// Load a font
const fontLoader = new FontLoader();
fontLoader.load('Courier.json', (font) => {
  // Create text geometry
  const textGeometry = new TextGeometry('X', {
    font: font,
    size: 1,
    height: 0.1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  // Create Phong material
  const material = new THREE.MeshPhongMaterial({ color: 0x00ffff, specular: 0x555555, shininess: 30 });

  // Create mesh
  const textMesh = new THREE.Mesh(textGeometry, material);
  scene.add(textMesh);

  textGeometry.center();

  const pivotGroup = new THREE.Group();
  scene.add(pivotGroup);
  pivotGroup.add(textMesh);

  // Add lights
  const ambientLight = new THREE.AmbientLight(0x404040); // Ambient light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Directional light
  directionalLight.position.set(10, 10, 10).normalize();
  scene.add(ambientLight, directionalLight);

  // controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0;

  const axesHelper = new THREE.AxesHelper(5000);
  const axesHelperi = new THREE.AxesHelper(-5000);
  scene.add(axesHelper);
  scene.add(axesHelperi);

  // Animation
  const animate = () => {
    requestAnimationFrame(animate);

    // Update controls
    controls.update();  

    // Rotate the text mesh
    pivotGroup.rotation.y += 0.05;

    // Render the scene
    renderer.render(scene, camera);
  };

  // Start animation
  animate();
});

// Handle window resize
window.addEventListener('resize', () => {
  // Update camera aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Update renderer size
  renderer.setSize(window.innerWidth, window.innerHeight);
});


