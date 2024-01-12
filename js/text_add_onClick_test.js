import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Initialize scene
const scene = new THREE.Scene();

// Initialize camera with perspective projection
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(2);

// Create a cube with semi-transparent cyan material
const cubeGeometry = new THREE.BoxGeometry(2,2,2);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

// Enable OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.autoRotate = false;

// Initialize raycaster for click events
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Handle mouse click events
window.addEventListener('click', onClick);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

// Function to handle mouse click events
function onClick(event) {
    // Calculate normalized device coordinates (NDC) of the mouse click
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Set raycaster with NDC coordinates and camera
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections with the cube
    const intersects = raycaster.intersectObject(cube);

    if (intersects.length > 0) {

        const selectedCube = intersects[0].object;

        // Get the coordinates of the selected cube
        const cubePosition = selectedCube.position;

        // Create a red rotating cubeSmall and add it to the scene
        createRotatingCubeSmall(cubePosition);
    }
}

// Function to create a red rotating cubeSmall
function createRotatingCubeSmall(position) {
    const cubeSmallGeometry = new THREE.BoxGeometry(1,1,1);
    const cubeSmallMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const cubeSmall = new THREE.Mesh(cubeSmallGeometry, cubeSmallMaterial);

    // Set the cubeSmall's position to the center of the cube
    cubeSmall.position.copy(position);

    // Add rotation animation to the cubeSmall
    const animateCubeSmall = () => {
        cubeSmall.rotation.x += 0.01;
        cubeSmall.rotation.y += 0.01;
        requestAnimationFrame(animateCubeSmall);
    };

    animateCubeSmall();

    // Add the cubeSmall to the scene
    scene.add(cubeSmall);
}
