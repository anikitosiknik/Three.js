import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import Camera from './Camera';
import Control from './Control';
import Mesh from './Mesh';
import Renderer from './Renderer';
import Scene from './Scene';

function main() {
  const canvas = document.querySelector('#c') as HTMLCanvasElement;
  const camera = new Camera();
  const scene = new Scene();
  const renderer = new Renderer(canvas, camera.camera, scene.scene);
  const controls = new Control(camera.camera, canvas);
  controls.addHandlers();

  scene.setBackground('black');

  {
    const planeSize = 40;

    const loader = new THREE.TextureLoader();
    const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const plankMesh = new Mesh(planeGeo, planeMat);
    plankMesh.setRotation(Math.PI * -0.5);
    scene.add(plankMesh.mesh);
  }

  {
    const skyColor = 0xB1E1FF; // light blue
    const groundColor = 0xB97A20; // brownish orange
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);
  }

  {
    const objLoader = new OBJLoader();
    objLoader.load('./models/table.obj', (root) => {
      scene.add(root);
    });
  }

  renderer.init();
}

main();
