import * as THREE from 'three';

//Scence
const scene = new THREE.Scene();

//Create our sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
})

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

//Camera
const camera = new THREE.PerspectiveCamera(45, 800 / 600);
scene.add(camera)


//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGL1Renderer({ canvas })

renderer.setSize(800, 600)
renderer.render(scene, camera)

