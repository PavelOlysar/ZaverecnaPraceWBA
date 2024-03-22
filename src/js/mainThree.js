import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let object;

let objToRender = 'eyes'; // eyes || monkey

const loader = new GLTFLoader();

loader.load(
  `models/${objToRender}/eyes.glb`, // eyes.glb || monkey.glb
  function (gltf) {
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);


const renderer = new THREE.WebGLRenderer({ alpha: true }); 
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("container3D").appendChild(renderer.domElement);

camera.position.z = objToRender === "eyes" ? 5 : 500;

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 2);
topLight.position.set(0, 200, 200);
topLight.castShadow = false;
scene.add(topLight);

const downLight = new THREE.DirectionalLight(0xffffff, 1);
downLight.position.set(0, -200, 200);
downLight.castShadow = false;
scene.add(downLight);


function animate() {
  requestAnimationFrame(animate);

  if (object && objToRender === "eyes" || object && objToRender === "monkey") {
    object.rotation.y = -1.5 + mouseX / window.innerWidth * 3;
    object.rotation.x = -1.25 + mouseY * 2.5 / window.innerHeight;
  }
  renderer.render(scene, camera);
}

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

animate();