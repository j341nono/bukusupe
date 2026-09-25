import * as THREE from "three";
import { minimumSpanningTree, type ConstellationPoint } from "../constellation";

export type DrawnConstellation = { id: string; name: string; points: ConstellationPoint[] };

type Entry = { data: DrawnConstellation; edges: ReturnType<typeof minimumSpanningTree>; line: THREE.LineSegments;
  glints: THREE.Points };

/** 地図座標で結んだ星座。通常は淡く、選択中だけ明るくする。 */
export class ConstellationLayer {
  readonly object = new THREE.Group();
  private entries = new Map<string, Entry>();
  private active: string | null = null;
  private drawing: { id: string; elapsed: number } | null = null;
  private readonly animated = new THREE.LineSegments(new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({ color: 0xffe8bc, transparent: true, opacity: 0.9, depthWrite: false }));
  private readonly rings = new THREE.Group();
  private ringIds: string[] = [];

  constructor() {
    this.animated.visible = false;
    this.object.add(this.animated, this.rings);
  }

  set(rows: DrawnConstellation[]): void {
    for (const entry of this.entries.values()) {
      this.object.remove(entry.line, entry.glints);
      entry.line.geometry.dispose();
      (entry.line.material as THREE.Material).dispose();
      entry.glints.geometry.dispose();
      (entry.glints.material as THREE.Material).dispose();
    }
    this.entries.clear();
    for (const data of rows) {
      const edges = minimumSpanningTree(data.points);
      const byId = new Map(data.points.map((point) => [point.id, point]));
      const vertices: number[] = [];
      for (const edge of edges) {
        const a = byId.get(edge.a)!, b = byId.get(edge.b)!;
        vertices.push(a.x, 0.12, -a.y, b.x, 0.12, -b.y);
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
      const line = new THREE.LineSegments(geometry,
        new THREE.LineBasicMaterial({ color: 0xfff0d2, transparent: true, opacity: 0.15, depthWrite: false }));
      const glintGeometry = new THREE.BufferGeometry();
      glintGeometry.setAttribute("position", new THREE.Float32BufferAttribute(data.points.flatMap((p) => [p.x, 0.14, -p.y]), 3));
      const glints = new THREE.Points(glintGeometry,
        new THREE.PointsMaterial({ color: 0xfff2d8, size: 2.5, sizeAttenuation: false, transparent: true,
          opacity: 0.2, depthWrite: false }));
      this.entries.set(data.id, { data, edges, line, glints });
      this.object.add(line, glints);
    }
    if (this.active && !this.entries.has(this.active)) this.active = null;
    this.style();
  }

  select(id: string | null): void { this.active = id; this.style(); }

  editMembers(points: ConstellationPoint[]): void {
    this.ringIds = points.map((point) => point.id);
    for (const mesh of [...this.rings.children]) {
      this.rings.remove(mesh);
      (mesh as THREE.Mesh).geometry.dispose();
      ((mesh as THREE.Mesh).material as THREE.Material).dispose();
    }
    for (const point of points) {
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.42, 24),
        new THREE.MeshBasicMaterial({ color: 0xffe5ad, transparent: true, opacity: 0.9,
          side: THREE.DoubleSide, depthWrite: false }));
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(point.x, 0.16, -point.y);
      this.rings.add(ring);
    }
  }

  moveEditMembers(position: (id: string) => { x: number; y: number } | null): void {
    this.rings.children.forEach((ring, i) => {
      const p = position(this.ringIds[i]);
      if (p) ring.position.set(p.x, 0.16, -p.y);
    });
  }

  /** 星が戻る 0.95 秒のあと、各辺を 120ms で伸ばす。 */
  startDrawing(id: string): void {
    this.drawing = { id, elapsed: 0 };
    this.animated.visible = true;
    this.animated.geometry.dispose();
    this.animated.geometry = new THREE.BufferGeometry();
    this.style();
  }

  update(dt: number): void {
    if (!this.drawing) return;
    const { id } = this.drawing;
    const entry = this.entries.get(id);
    if (!entry) { this.drawing = null; this.animated.visible = false; return; }
    this.drawing.elapsed += dt;
    const progress = Math.max(0, (this.drawing.elapsed - 0.95) / 0.12);
    const count = Math.min(entry.edges.length, Math.floor(progress));
    const partial = Math.min(1, progress - count);
    const byId = new Map(entry.data.points.map((point) => [point.id, point]));
    const vertices: number[] = [];
    for (let i = 0; i < count + (partial > 0 ? 1 : 0); i++) {
      const edge = entry.edges[i];
      if (!edge) break;
      const a = byId.get(edge.a)!, b = byId.get(edge.b)!;
      const t = i < count ? 1 : partial;
      vertices.push(a.x, 0.17, -a.y, a.x + (b.x - a.x) * t, 0.17, -(a.y + (b.y - a.y) * t));
    }
    this.animated.geometry.dispose();
    this.animated.geometry = new THREE.BufferGeometry();
    this.animated.geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    if (progress >= entry.edges.length) {
      this.drawing = null;
      this.animated.visible = false;
      this.style();
    }
  }

  animationState(): { phase: "returning" | "drawing" | "done"; edgesDrawn: number; edges: number } {
    const entry = this.drawing && this.entries.get(this.drawing.id);
    if (!this.drawing || !entry) return { phase: "done", edgesDrawn: 0, edges: 0 };
    const p = (this.drawing.elapsed - 0.95) / 0.12;
    return { phase: p < 0 ? "returning" : "drawing",
      edgesDrawn: Math.max(0, Math.min(entry.edges.length, Math.floor(p))), edges: entry.edges.length };
  }

  geometry(): { id: string; members: string[]; edges: { a: string; b: string }[]; opacity: number }[] {
    return [...this.entries].map(([id, entry]) => ({ id,
      members: entry.data.points.map((point) => point.id), edges: entry.edges,
      opacity: (entry.line.material as THREE.LineBasicMaterial).opacity }));
  }

  points(id: string): ConstellationPoint[] { return this.entries.get(id)?.data.points ?? []; }

  private style(): void {
    for (const [id, entry] of this.entries) {
      const selected = id === this.active;
      const drawing = this.drawing?.id === id;
      (entry.line.material as THREE.LineBasicMaterial).opacity = drawing ? 0 : selected ? 0.85 : 0.15;
      (entry.glints.material as THREE.PointsMaterial).opacity = drawing ? 0 : selected ? 0.9 : 0.2;
    }
  }
}
