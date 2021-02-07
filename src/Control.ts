import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class Control {
    #controls: OrbitControls;

    constructor(camera: PerspectiveCamera, canvas: HTMLElement) {
      this.#controls = new OrbitControls(camera, canvas);
      this.#controls.target.set(0, 5, 0);
      this.#controls.update();
    }

    public addHandlers() {
      return this;
    }
}
