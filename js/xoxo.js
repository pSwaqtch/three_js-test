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

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Load a font
const fontLoader = new FontLoader();

const createTextGeometry = (text, font) => {
  return new TextGeometry(text, {
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
};

fontLoader.load('Courier.json', (font) => {
  // Create text geometries
  const textGeometryX = createTextGeometry('X', font);
  const textGeometryO = createTextGeometry('O', font);

  // Create Phong material
  const material = new THREE.MeshPhongMaterial({ color: 0x00ffff, specular: 0x555555, shininess: 30 });

  // Create meshes
  const textMeshX = new THREE.Mesh(textGeometryX, material);
  const textMeshO = new THREE.Mesh(textGeometryO, material);

  // Position the meshes
  textMeshX.position.y = -0.5; // Lower position for "X"
  textMeshO.position.y = 0.5; // Higher position for "O"

  scene.add(textMeshX);
  scene.add(textMeshO);

  textGeometryX.center();
  textGeometryO.center();

  const pivotGroup = new THREE.Group();
  scene.add(pivotGroup);
  pivotGroup.add(textMeshX);
  pivotGroup.add(textMeshO);

  // Add lights
  const ambientLight = new THREE.AmbientLight(0x404040); // Ambient light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Directional light
  directionalLight.position.set(10, 10, 10).normalize();
  scene.add(ambientLight, directionalLight);

  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0;

  const axesHelper = new THREE.AxesHelper(5000);
  const axesHelperNegative = new THREE.AxesHelper(-5000);
  scene.add(axesHelper);
  scene.add(axesHelperNegative);

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
