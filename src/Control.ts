import * as THREE from 'three';
import { PerspectiveCamera, Vector2 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import Ray from './RayCaster';

type DragControl = {
  activate: () => {}
}

const KEYS = {
  SPACE: 32,
};

export default class Control {
  #controls: OrbitControls;

  #mouse: Vector2;

  #ray: Ray;

  #dragControls = DragControl || null;

  #camera: THREE.PerspectiveCamera;

  #canvas: HTMLElement;

  #devMode: boolean;

  #dragList: THREE.Object3D[];

  copyDragList: THREE.Object3D[];

  constructor(camera: PerspectiveCamera, canvas: HTMLElement) {
    this.#devMode = true;

    this.#controls = new OrbitControls(camera, canvas);
    this.#controls.target.set(0, 5, 0);
    this.#controls.update();
    this.#mouse = new THREE.Vector2();
    this.#ray = new Ray();
    this.#dragControls = null;
    this.#camera = camera;
    this.#canvas = canvas;
    this.#dragList = [];
    this.copyDragList = [];
  }

  get ray() {
    return this.#ray;
  }

  get mouse() {
    return this.#mouse;
  }

  public setControl(elements?: THREE.Object3D[]) {
    this.#controls.enabled = false;
    if (this.#dragList.length) {
      this.#dragControls.activate();
      return;
    }
    this.#dragList = [...this.copyDragList];
    this.#dragControls = new DragControls(elements || this.#dragList, this.#camera, this.#canvas) as DragControl;
  }

  public unsetControl() {
    this.#controls.enabled = true;
    this.#dragControls.deactivate();
  }

  public addHandlers(document: HTMLElement) {
    document.parentElement.addEventListener('keydown', this.keyDownHandler.bind(this, true));
    document.parentElement.addEventListener('keyup', this.keyDownHandler.bind(this, false));
    document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this));
    return this;
  }

  private onDocumentMouseMove(event: MouseEvent) {
    event.preventDefault();

    this.#mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.#mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  private keyDownHandler(isDown: boolean, event: KeyboardEvent) {
    console.log(this.#controls);
    switch (event.keyCode) {
      case KEYS.SPACE:
        isDown ? this.toggleDragControls(true) : this.toggleDragControls(false);
        break;

      default:
        console.log('unhandled');
        break;
    }
  }

  private toggleDragControls(shouldSet: boolean) {
    return shouldSet ? this.setControl() : this.unsetControl();
  }
}
