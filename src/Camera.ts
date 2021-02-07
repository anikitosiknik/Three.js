import { PerspectiveCamera } from 'three/src/cameras/PerspectiveCamera';

export default class Camera {
    #camera: PerspectiveCamera;

    constructor() {
      const fov = 45;
      const aspect = 2;
      const near = 0.1;
      const far = 100;
      this.#camera = new PerspectiveCamera(fov, aspect, near, far);
      this.setPosition(0, 10, 20);
    }

    get camera() {
      return this.#camera;
    }

    public setPosition(x: number, y: number, z: number) {
      this.#camera.position.set(x, y, z);
    }
}
