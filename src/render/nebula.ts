import * as THREE from "three";

const VERT = /* glsl */ `
attribute vec3 aColor;
varying vec2 vUv;
varying vec3 vColor;
void main() {
  vUv = uv;
  vColor = aColor;
  gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
}
`;

const FRAG = /* glsl */ `
varying vec2 vUv;
varying vec3 vColor;
void main() {
  float d = length(vUv - 0.5) * 2.0;
  if (d > 1.0) discard;
  float a = pow(1.0 - d, 2.6) * 0.30;
  gl_FragColor = vec4(vColor, a);
}
`;

export type NebulaSpec = { x: number; y: number; radius: number; color: THREE.Color };

/**
 * 星団の下に敷く、かすかに光る円形のもや（星雲）。
 * 平面に寝かせた板を星団の数だけ並べる。意味は持たせず、まとまりを見せるためだけ。
 */
export class Nebulae {
  readonly object: THREE.Group = new THREE.Group();
  private mesh: THREE.InstancedMesh | null = null;
  private readonly geometry = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
  private readonly material = new THREE.ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  set(specs: NebulaSpec[]): void {
    if (this.mesh) {
      this.object.remove(this.mesh);
      this.mesh.dispose();
      this.mesh = null;
    }
    if (specs.length === 0) return;

    const mesh = new THREE.InstancedMesh(this.geometry, this.material, specs.length);
    const colors = new Float32Array(specs.length * 3);
    const m = new THREE.Matrix4();
    specs.forEach((s, i) => {
      const size = s.radius * 2.8;
      m.makeScale(size, 1, size);
      m.setPosition(s.x, -0.2, -s.y);
      mesh.setMatrixAt(i, m);
      colors[i * 3] = s.color.r;
      colors[i * 3 + 1] = s.color.g;
      colors[i * 3 + 2] = s.color.b;
    });
    mesh.geometry.setAttribute("aColor", new THREE.InstancedBufferAttribute(colors, 3));
    mesh.instanceMatrix.needsUpdate = true;
    mesh.frustumCulled = false;
    this.mesh = mesh;
    this.object.add(mesh);
  }
}
