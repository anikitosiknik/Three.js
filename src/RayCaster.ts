import * as THREE from 'three';
import { Camera, Vector2 } from 'three';

export default class Ray {
    #ray: THREE.Raycaster;

    #intersected: THREE.Mesh | null;

    constructor() {
      this.#ray = new THREE.Raycaster();
      this.#intersected = null;
    }

    public setFromCamera(mouse: Vector2, camera: Camera) {
      this.#ray.setFromCamera(mouse, camera);
    }

    public interectObjects(objects: THREE.Object3D[]) {
      const interArr = this.#ray.intersectObjects(objects, true);
      if (interArr[0]) {
        if (this.#intersected !== interArr[0].object) {
          if (this.#intersected) {
            this.#intersected.material.emissive.setHex(this.#intersected.currentHex);
          }

          this.#intersected = interArr[0].object;
          this.#intersected.currentHex = this.#intersected.material.emissive.getHex();
          this.#intersected.material.emissive.setHex(0xff0000);
        }
      } else {
        if (this.#intersected) {
          this.#intersected.material.emissive.setHex(this.#intersected.currentHex);
        }
        this.#intersected = null;
      }

      //   return [this.#intersected, { ...this.#intersected }];
    }
}
