import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Textures Loader

const loader = new THREE.TextureLoader
const stars = loader.load('./pngwing.com.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 40, 100 );
const geometry2 = new THREE.DodecahedronGeometry( 0.3,2,10);

const particlesGeometry = new THREE.BufferGeometry;
const particlesCnt = 5000;
const posArray = new Float32Array(particlesCnt * 3);
for (let i = 0; i < particlesCnt * 3; i++) {
    posArray[i] = ((Math.random() - 0.5) * 10)
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

// Materials

const material = new THREE.PointsMaterial(
    { size: 0.010, color: 0xffffff }
    );
const material2 = new THREE.MeshNormalMaterial(
    // { size: 0.010, color: 0xffffff }
    {
    wireframe: true,
    transparent: true,
    opacity: 0.5,
    }
    );

const material3 = new THREE.MeshNormalMaterial(
    // { size: 0.010, color: 0xffffff }
    {
    wireframe: true,
    transparent: true,
    opacity: 0.2,
    }
    );


const particlesMaterial = new THREE.PointsMaterial(
    {   size: 0.0070, 
        color: 0xffffff, 
        map: stars, 
        transparent: true });
    
    


// Mesh
const sphere = new THREE.Points(geometry,material)
const sphere2 = new THREE.Mesh(geometry2,material2)
const sphere3 = new THREE.Mesh(geometry,material3)
const sphere4 = new THREE.Points(geometry2,material)
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(sphere)
scene.add(sphere2)
scene.add(sphere3)
scene.add(sphere4)
scene.add(particlesMesh)
// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(new THREE.Color('#000000'),1)

//Mouse move

document.addEventListener('mousemove', animateParticles)

let mouseX = 0
let mouseY = 0

function animateParticles(event){
    mouseY =event.clientY
    mouseX= event.clientX
}
/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .9 * elapsedTime
    sphere.rotation.x = .5 * elapsedTime

    sphere2.rotation.y = 1.8 * elapsedTime
    sphere2.rotation.x = 1.8 * elapsedTime

    sphere3.rotation.y = .9 * elapsedTime
    sphere3.rotation.x = .5 * elapsedTime

    sphere4.rotation.y = 1.8 * elapsedTime
    sphere4.rotation.x = 1.8 * elapsedTime

    particlesMesh.rotation.x = - .2 * elapsedTime
    particlesMesh.rotation.y = - .2 * elapsedTime
    particlesMesh.rotation.y = mouseY * (elapsedTime * 0.00010)
    particlesMesh.rotation.y = mouseX * (elapsedTime * 0.00010)
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

//clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
