import * as THREE from "three";

import { OBJLoader } from "https://unpkg.com/three@0.139.0/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "https://unpkg.com/three@0.139.0/examples/jsm/loaders/MTLLoader.js";
// import { OrbitControls } from "https://unpkg.com/three@0.139.0/examples/jsm/controls/OrbitControls.js";

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

// scene.add(new THREE.AxesHelper(5));

const camera = new THREE.PerspectiveCamera(
  10,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 300;

//lights
{
  var ambientLight = new THREE.AmbientLight(0xff96ad, 0.2);
  scene.add(ambientLight);

  scene.add(camera);

  // Light 2

  const pointLight2 = new THREE.PointLight(0xff96ad, 0.1);
  pointLight2.position.set(0, 50, 50);
  pointLight2.intensity = 0.5;

  scene.add(pointLight2);

  // const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1);
  // scene.add(pointLightHelper2);

  // Light 3

  const pointLight3 = new THREE.PointLight(0xff96ad, 2);
  pointLight3.position.set(0, -50, 50);
  pointLight3.intensity = 0.5;

  scene.add(pointLight3);

  // const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 1);
  // scene.add(pointLightHelper3);

  // Light 4

  const pointLight4 = new THREE.PointLight(0xff96ad, 2);
  pointLight4.position.set(0, 0, 0);
  pointLight4.intensity = 0.5;

  scene.add(pointLight4);

  // const pointLightHelper4 = new THREE.PointLightHelper(pointLight4, 1);
  // scene.add(pointLightHelper4);

  // Light 5

  const pointLight5 = new THREE.PointLight(0xff96ad, 0.1);
  pointLight5.position.set(50, 50, 50);
  pointLight5.intensity = 0.5;

  scene.add(pointLight5);

  // Light 6

  const pointLight6 = new THREE.PointLight(0xff96ad, 0.1);
  pointLight6.position.set(-50, -50, 50);
  pointLight6.intensity = 1;

  scene.add(pointLight6);
}

//assets

let teapotObj;
let teacupObj;

{
  // manager related variables
  const manager = new THREE.LoadingManager();
  {
    manager.onStart = function (url, itemsLoaded, itemsTotal) {
      console.log(
        "Started loading file: " +
          url +
          ".\nLoaded " +
          itemsLoaded +
          " of " +
          itemsTotal +
          " files."
      );
    };

    manager.onLoad = function () {
      console.log("Loading complete!");
      asyncAnimate();
    };

    manager.onProgress = function (url, itemsLoaded, itemsTotal) {
      console.log(
        "Loading file: " +
          url +
          ".\nLoaded " +
          itemsLoaded +
          " of " +
          itemsTotal +
          " files."
      );
    };

    manager.onError = function (url) {
      console.log("There was an error loading " + url);
    };
  }

  const mtlLoader = new MTLLoader();

  mtlLoader.load(
    "resource/teapot_prj.mtl",
    (materials) => {
      materials.preload();
      const objLoader = new OBJLoader(manager);
      objLoader.setMaterials(materials);
      objLoader.load(
        "resource/teapot.obj",
        (object) => {
          object.scale.set(0.025, 0.025, 0.025);
          let box = new THREE.Box3().setFromObject(object);
          box.center(object.position);
          object.position.multiplyScalar(-1);
          var pivot = new THREE.Group();
          pivot.add(object);
          teapotObj = pivot;
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (error) => {
          console.log("An error happened");
        }
      );
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.log("An error happened");
    }
  );

  mtlLoader.load(
    "resource/teacup.mtl",
    (materials) => {
      materials.preload();
      const objLoader = new OBJLoader(manager);
      objLoader.setMaterials(materials);
      objLoader.load(
        "resource/teacup.obj",
        (object) => {
          object.scale.set(0.07, 0.07, 0.07);
          let box = new THREE.Box3().setFromObject(object);
          box.center(object.position);
          object.position.multiplyScalar(-1);
          var pivot = new THREE.Group();
          pivot.add(object);
          teacupObj = pivot;
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (error) => {
          console.log("An error happened");
        }
      );
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.log("An error happened");
    }
  );
}

const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

scene.background = new THREE.Color(0xff96ad);

document.addEventListener("mousemove", onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

const tObjSet0 = [];
const tObjSet1 = [];
const tObjSet2 = [];
const tObjSet3 = [];

var tObjContainer0 = new THREE.Mesh();
var tObjContainer1 = new THREE.Mesh();
var tObjContainer2 = new THREE.Mesh();
var tObjContainer3 = new THREE.Mesh();
scene.add(tObjContainer0);
scene.add(tObjContainer1);
scene.add(tObjContainer2);
scene.add(tObjContainer3);
var axis = new THREE.Vector3(1, 0, 0).normalize();
var rotateKey = 0;

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.update();

function animate() {
  requestAnimationFrame(animate);

  targetX = mouseX * 0.000005;
  targetY = mouseY * 0.000005;

  rotateKey += 0.012;
  rotateKey %= 3.14;
  var rotateAngle = -3 * 0.01 * (Math.sin(rotateKey) + 0.1);

  if (tObjContainer1 && tObjContainer2 && tObjContainer3) {
    tObjContainer0.rotateZ(-targetY + -0.0005);
    tObjContainer1.rotateZ(targetX + 0.0005);
    tObjContainer2.rotateZ(-targetY + -0.0005);
    tObjContainer3.rotateZ(targetX + 0.0005);
  }

  tObjSet0.map((obj) => {
    obj.rotateOnAxis(axis, rotateAngle);
  });
  tObjSet1.map((obj) => {
    obj.rotateOnAxis(axis, rotateAngle);
  });
  tObjSet2.map((obj) => {
    obj.rotateOnAxis(axis, rotateAngle);
  });
  tObjSet3.map((obj) => {
    obj.rotateOnAxis(axis, rotateAngle);
  });
  renderer.render(scene, camera);
}

function asyncAnimate() {
  for (let i = 0; i < 6; i++) {
    tObjSet0[i] = teapotObj.clone();
    scene.add(tObjSet0[i]);

    tObjSet0[i].rotation.z = ((Math.PI * -i) / 6) * 2;
    tObjSet0[i].rotateOnAxis(axis, 1 * Math.PI * 0.5);

    tObjSet0[i].position.set(
      12 * Math.sin((2 * Math.PI * i) / 6),
      12 * Math.cos((2 * Math.PI * i) / 6),
      0
    );
  }

  for (let i = 0; i < 12; i++) {
    tObjSet1[i] = teacupObj.clone();
    scene.add(tObjSet1[i]);

    tObjSet1[i].rotation.z = ((Math.PI * -i) / 12) * 2;
    tObjSet1[i].rotateOnAxis(axis, 1 * Math.PI * -0.1);

    tObjSet1[i].position.set(
      23 * Math.sin((2 * Math.PI * i) / 12),
      23 * Math.cos((2 * Math.PI * i) / 12),
      0
    );
  }
  for (let i = 0; i < 20; i++) {
    tObjSet2[i] = teapotObj.clone();
    scene.add(tObjSet2[i]);

    tObjSet2[i].rotation.z = ((Math.PI * -i) / 20) * 2;
    tObjSet2[i].rotateOnAxis(axis, 1 * Math.PI * 0.4);

    tObjSet2[i].position.set(
      34 * Math.sin((2 * Math.PI * i) / 20),
      34 * Math.cos((2 * Math.PI * i) / 20),
      0
    );
  }
  for (let i = 0; i < 28; i++) {
    tObjSet3[i] = teacupObj.clone();
    scene.add(tObjSet3[i]);

    tObjSet3[i].rotation.z = ((Math.PI * -i) / 28) * 2;
    tObjSet3[i].rotateOnAxis(axis, 1 * Math.PI * -0.2);

    tObjSet3[i].position.set(
      45 * Math.sin((2 * Math.PI * i) / 28),
      45 * Math.cos((2 * Math.PI * i) / 28),
      0
    );
  }

  tObjSet0.forEach((tp) => {
    tObjContainer0.add(tp);
  });
  tObjSet1.forEach((tp) => {
    tObjContainer1.add(tp);
  });
  tObjSet2.forEach((tp) => {
    tObjContainer2.add(tp);
  });
  tObjSet3.forEach((tp) => {
    tObjContainer3.add(tp);
  });

  animate();
}
