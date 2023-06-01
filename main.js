import * as THREE from 'three';
import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from 'gsap';

//Scene
const scene = new THREE.Scene();

//Create our sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  roughness:0.2
})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh)

//Light
const light = new THREE.PointLight(0xffffff, .3, 100);
light.position.set(0, 7, 8)
light.intensity = 1.25
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
renderer.setPixelRatio(2)

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;


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
  controls.update();
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()

//TimeLine Magic
const timeline = gsap.timeline({ default: {duration: 1} })
timeline.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})
timeline.fromTo('nav', {y: '-100%'}, {y:'0%'})
timeline.fromTo('title', {opacity: 0}, {opacity: 1})

//Mouse Animation Color
let mouseDown = false;
let rgb = []
window.addEventListener('mousedown', () => ( mouseDown=true ));
window.addEventListener('mouseup', () => ( mouseDown=false ));

window.addEventListener('mousemove', (e) => {
  if(mouseDown){
      let rgb = [
        Math.round((e.pageX / size.width ) * 255),
        Math.round((e.pageY / size.height ) * 255),
        150,
    ]

    //Let's animate
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color, {r:newColor.r, g:newColor.g, b:newColor.b})
  }
})