import * as THREE from "three";

export type NebulaRange = { x: number; y: number; z: number; radius: number };
export type DebrisPoint = { x: number; y: number; z: number; r: number };
export type BoostRing = { x: number; y: number; z: number; nx: number; ny: number; nz: number; radius: number };

/** 星団の外側に置く、決定的なデブリと航路の銀色のリング。 */
export class FlightObstacles {
  readonly object = new THREE.Group();
  readonly debris: DebrisPoint[] = [];
  readonly rings: BoostRing[] = [];
  readonly ranges: NebulaRange[] = [];
  private rocks: THREE.InstancedMesh | null = null;
  private readonly dummy = new THREE.Object3D();
  private elapsed = 0;

  set(ranges: NebulaRange[], extent: number): void {
    this.object.clear();
    this.ranges.splice(0, this.ranges.length, ...ranges);
    this.debris.length = 0;
    this.rings.length = 0;
    const seed = ranges.reduce((h, c) => Math.imul(h ^ Math.round(c.x * 100 + c.z), 1664525) >>> 0, 2166136261);
    let state = seed;
    const random = () => ((state = (Math.imul(state, 1664525) + 1013904223) >>> 0) / 4294967296);
    const span = Math.max(100, extent * 4.6);
    for (let attempts = 0; attempts < 4000 && this.debris.length < 140; attempts++) {
      const p = { x: (random() * 2 - 1) * span, y: (random() * 2 - 1) * span * 0.22,
        z: (random() * 2 - 1) * span, r: 0.6 + random() * 1.4 };
      if (Math.hypot(p.x, p.z + 14) > extent * 4 * 1.25) continue;
      if (ranges.some((c) => Math.hypot(p.x - c.x, p.y - c.y, p.z - c.z) < c.radius + p.r + 8)) continue;
      this.debris.push(p);
    }
    const geom = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshBasicMaterial({ color: 0x7d859e });
    const rocks = new THREE.InstancedMesh(geom, material, this.debris.length);
    rocks.frustumCulled = false;
    this.debris.forEach((p, i) => {
      this.dummy.position.set(p.x, p.y, p.z);
      this.dummy.scale.setScalar(p.r);
      this.dummy.rotation.set(random() * 6, random() * 6, random() * 6);
      this.dummy.updateMatrix();
      rocks.setMatrixAt(i, this.dummy.matrix);
      const shade = 0.5 + random() * 0.28;
      rocks.setColorAt(i, new THREE.Color().setRGB(shade * 0.72, shade * 0.78, shade));
    });
    rocks.instanceMatrix.needsUpdate = true;
    this.rocks = rocks;
    this.object.add(rocks);
    // 星団の中心を結ぶ航路。長い辺の中ほどは星雲から離れている。
    const sorted = [...ranges].sort((a, b) => a.x - b.x || a.z - b.z);
    for (let i = 0; i < sorted.length - 1; i++) {
      const a = sorted[i], b = sorted[i + 1];
      const dx = b.x - a.x, dz = b.z - a.z, distance = Math.hypot(dx, dz);
      if (distance < 24) continue;
      const ring: BoostRing = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2,
        z: (a.z + b.z) / 2, nx: dx / distance, ny: 0, nz: dz / distance, radius: 6 };
      this.rings.push(ring);
      const mesh = new THREE.Mesh(new THREE.TorusGeometry(ring.radius, 0.26, 7, 44),
        new THREE.MeshBasicMaterial({ color: 0xdce5f4, transparent: true, opacity: 0.62, depthWrite: false }));
      mesh.position.set(ring.x, ring.y, ring.z);
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), new THREE.Vector3(ring.nx, 0, ring.nz));
      this.object.add(mesh);
    }
  }

  update(dt: number): void {
    this.elapsed += dt;
    if (this.rocks) this.rocks.rotation.y = Math.sin(this.elapsed * 0.08) * 0.008;
  }
}
