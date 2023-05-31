import * as THREE from 'three';
import './style.css'

//Scene
const scene = new THREE.Scene();

//Create our sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

//Light
const light = new THREE.PointLight(0xffffff, .3, 100);
light.position.set(0, 7, 8)
scene.add(light)


//Sizes
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//Camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100);
camera.position.z = 10
scene.add(camera)


//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGL1Renderer({ canvas })

renderer.setSize(size.width, size.height)
renderer.render(scene, camera)



//Resize
window.addEventListener('resize', () => {
  //Update sizes
  size.width = window.innerWidth
  size.height = window.innerHeight

  //update Camera
  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()
  renderer.setSize(size.width, size.height)
})

const loop = () => {
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}

loop()