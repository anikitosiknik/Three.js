import * as THREE from 'three';

export default class Mesh {
    #mesh: THREE.Mesh;

    constructor(geometry: THREE.BufferGeometry, material?: THREE.Material) {
      this.#mesh = new THREE.Mesh(geometry, material);
    }

    get mesh() {
      return this.#mesh;
    }

    public setRotation(x?: number, y?: number, z?: number) {
      this.#mesh.rotation.x = x || this.#mesh.rotation.x;
      this.#mesh.rotation.y = y || this.#mesh.rotation.y;
      this.#mesh.rotation.z = z || this.#mesh.rotation.z;
    }
}
