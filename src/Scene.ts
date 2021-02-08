import * as THREE from 'three';

export default class Scene {
  #scene: THREE.Scene;

  constructor() {
    this.#scene = new THREE.Scene();
  }

  get scene() {
    return this.#scene;
  }

  public setBackground(color: string) {
    this.#scene.background = new THREE.Color(color);
  }

  public add(target: THREE.Object3D) {
    this.#scene.add(target);
  }
}
