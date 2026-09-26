import * as THREE from "three";

const VERT = /* glsl */ `
attribute vec3 aColor;
attribute float aSeed;
varying vec2 vUv;
varying vec3 vColor;
varying float vSeed;
void main() {
  vUv = uv;
  vColor = aColor;
  vSeed = aSeed;
  gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
}
`;

const FRAG = /* glsl */ `
varying vec2 vUv;
varying vec3 vColor;
varying float vSeed;
void main() {
  vec2 p = (vUv - 0.5) * 2.0;
  // 輪郭をゆるく波打たせ、星団ごとに違う形の雲にする（色相ではなく形で見分ける）
  float angle = atan(p.y, p.x);
  float wobble = 1.0 + 0.13 * sin(3.0 * angle + vSeed * 2.1) + 0.07 * sin(5.0 * angle + vSeed * 4.7);
  float d = length(p) * wobble;
  if (d > 1.0) discard;
  float a = pow(1.0 - d, 2.2) * 0.42;
  gl_FragColor = vec4(vColor, a);
}
`;

export type NebulaSpec = { x: number; y: number; radius: number; color: THREE.Color; seed: number };

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
    const seeds = new Float32Array(specs.length);
    const q = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    const m = new THREE.Matrix4();
    specs.forEach((s, i) => {
      // 楕円の縦横比と向きも星団ごとに変える（決定的：星団の番号から）
      const size = s.radius * 2.8;
      const aspect = 0.8 + ((s.seed * 37) % 10) / 50;          // 0.8〜0.98
      q.setFromAxisAngle(up, ((s.seed * 53) % 180) * Math.PI / 180);
      m.compose(new THREE.Vector3(s.x, -0.2, -s.y), q, new THREE.Vector3(size, 1, size * aspect));
      seeds[i] = s.seed;
      mesh.setMatrixAt(i, m);
      colors[i * 3] = s.color.r;
      colors[i * 3 + 1] = s.color.g;
      colors[i * 3 + 2] = s.color.b;
    });
    mesh.geometry.setAttribute("aColor", new THREE.InstancedBufferAttribute(colors, 3));
    mesh.geometry.setAttribute("aSeed", new THREE.InstancedBufferAttribute(seeds, 1));
    mesh.instanceMatrix.needsUpdate = true;
    mesh.frustumCulled = false;
    this.mesh = mesh;
    this.object.add(mesh);
  }
}
