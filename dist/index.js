import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";


const myHead = document.querySelector("div.my-head");
// initializing objects to the page
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 10000)
const renderer = new THREE.WebGLRenderer({antialias:true})

// setting the objects to the page
renderer.setSize(innerWidth * 1.5,innerHeight * 1.5)
renderer.setPixelRatio(devicePixelRatio)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
myHead.appendChild(renderer.domElement)
//new OrbitControls(camera, renderer.domElement)

camera.position.z = 40;

//new OrbitControls(camera, renderer.domElement)
const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 1.8;
controls.maxDistance = 200;
controls.update()




//lighting of the scene
const directionalLight = new THREE.PointLight(0xffffff, 0.8);
directionalLight.position.set(0,0,3);
scene.add(directionalLight);

const directionalLight2 = new THREE.PointLight(0xffffff, 0.8);
directionalLight2.position.set(0,0,-3);
scene.add(directionalLight2);

const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight3.position.set(3,0,3);
scene.add(directionalLight3);
const directionalLight5 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight5.position.set(3,0,-3);
scene.add(directionalLight5);

const directionalLight4 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight4.position.set(-3,0,-3);
scene.add(directionalLight4);
const directionalLight6 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight6.position.set(-3,0,3);
scene.add(directionalLight6);


const pointLight = new THREE.PointLight(0xc4c4c4, 1);
pointLight.position.set(0,50,0);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 2040;
pointLight.shadow.mapSize.height = 2040;
scene.add(pointLight);


// light position viewer

//const lightHelper = new THREE.PointLightHelper(directionalLight)
//scene.add(lightHelper)

// floor
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1500, 1500, 1), new THREE.MeshPhongMaterial({color:0x21282a}));
plane.rotation.x = - Math.PI / 2
plane.position.y = -15
plane.receiveShadow = true
scene.add(plane);

console.log(plane);

document.addEventListener('mousemove', mouseCoordinates)
let mouseX = 0
let mouseY = 0
function mouseCoordinates(event){
    mouseX = event.clientX
    mouseY = event.clientY
    
}


function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerHeight, window.innerHeight);
}


let loader = new GLTFLoader();
var object;
function init(){

        loader.load('gltf_images/myLogo8.gltf', (gltf) =>{
            gltf.scene.traverse(c => {
                c.castShadow = true;
               
                
            });
        scene.add(gltf.scene);
        animate()
    });
}

function animate(){
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    window.addEventListener('resize', onWindowResize, false);
}
init()

