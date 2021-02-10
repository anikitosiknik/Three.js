import * as THREE from 'three';
import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';
import Control from './Control';

export default class Renderer {
  #renderer: THREE.WebGLRenderer;

  #scene: THREE.Scene;

  #camera: PerspectiveCamera;

  #control: Control;

  constructor(
    canvas: HTMLCanvasElement, camera: PerspectiveCamera, scene: THREE.Scene, control: Control,
  ) {
    this.#scene = scene;
    this.#renderer = new THREE.WebGLRenderer({ canvas });
    this.#control = control;
    this.setCamera(camera);
  }

  get renderer() {
    return this.#renderer;
  }

  public setCamera(camera: PerspectiveCamera) {
    this.#camera = camera;
  }

  public init() {
    requestAnimationFrame(this.render.bind(this));
  }

  private resizeRendererToDisplaySize() {
    const canvas = this.#renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      this.#renderer.setSize(width, height, false);
    }
    return needResize;
  }

  private render() {
    this.#control.ray.setFromCamera(this.#control.mouse, this.#camera);
    this.#control.ray.interectObjects(this.#scene.children);

    if (this.resizeRendererToDisplaySize()) {
      const canvas = this.#renderer.domElement;
      this.#camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.#camera.updateProjectionMatrix();
    }

    this.#renderer.render(this.#scene, this.#camera);

    requestAnimationFrame(this.render.bind(this));
  }
}
