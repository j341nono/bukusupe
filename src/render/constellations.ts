import * as THREE from "three";
import { minimumSpanningTree, type ConstellationPoint } from "../constellation";

export type DrawnConstellation = { id: string; name: string; points: ConstellationPoint[] };

type Entry = { data: DrawnConstellation; edges: ReturnType<typeof minimumSpanningTree>; line: THREE.LineSegments;
  glints: THREE.Points };

/**
 * 星座の線は、検索の要素（ブラックホール・軌道・引き寄せた星・光の尾）より先に描く（renderOrder を負にする）。
 * 線は深度を書かないので、後から描く検索の要素が常に手前に見える。
 */
const LINE_ORDER = -1;

/**
 * 星座の線の材質。検索中はブラックホールの周り（uHoleRadius の球の中）の線を描かない。
 * 地図では線もブラックホールも平面の上にあるので円に、飛行中の検索（段階 3b）では球になる。
 */
function lineMaterial(color: number, opacity: number): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: opacity },
      uHoleCenter: { value: new THREE.Vector3() },
      uHoleRadius: { value: 0 },
    },
    vertexShader: `varying vec3 vWorld;
      void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }`,
    fragmentShader: `uniform vec3 uColor; uniform float uOpacity; uniform vec3 uHoleCenter; uniform float uHoleRadius;
      varying vec3 vWorld;
      void main() {
        if (uHoleRadius > 0.0 && distance(vWorld, uHoleCenter) < uHoleRadius) discard;
        gl_FragColor = vec4(uColor, uOpacity);
      }`,
  });
}

const opacityOf = (material: THREE.Material) => (material as THREE.ShaderMaterial).uniforms.uOpacity.value as number;

/** 地図座標で結んだ星座。通常は淡く、選択中だけ明るくする。 */
export class ConstellationLayer {
  readonly object = new THREE.Group();
  private entries = new Map<string, Entry>();
  private active: string | null = null;
  private drawing: { id: string; elapsed: number } | null = null;
  private readonly animated = new THREE.LineSegments(new THREE.BufferGeometry(), lineMaterial(0xe6c88c, 0.95));
  private readonly rings = new THREE.Group();
  private ringIds: string[] = [];
  /** 新星の輪（SPEC 9 章「新星」）。金ではなく、星と文字の淡い白（まだ自分で名付けた星座の星ではない） */
  private readonly novae = new THREE.Group();
  private novaIds: string[] = [];

  constructor() {
    this.animated.visible = false;
    this.animated.renderOrder = LINE_ORDER;
    this.rings.renderOrder = LINE_ORDER;
    this.novae.renderOrder = LINE_ORDER;
    this.object.add(this.animated, this.rings, this.novae);
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
      const line = new THREE.LineSegments(geometry, lineMaterial(0xd8b878, 0.15));
      line.renderOrder = LINE_ORDER;
      const glintGeometry = new THREE.BufferGeometry();
      glintGeometry.setAttribute("position", new THREE.Float32BufferAttribute(data.points.flatMap((p) => [p.x, 0.14, -p.y]), 3));
      const glints = new THREE.Points(glintGeometry,
        new THREE.PointsMaterial({ color: 0xe6c88c, size: 2.5, sizeAttenuation: false, transparent: true,
          opacity: 0.2, depthWrite: false }));
      glints.renderOrder = LINE_ORDER;
      const entry = { data, edges, line, glints };
      this.entries.set(data.id, entry);
      this.object.add(line, glints);
      if (this.lift > 0) this.applyLift(entry);
      this.applyHole(entry);
    }
    if (this.active && !this.entries.has(this.active)) this.active = null;
    this.style();
  }

  select(id: string | null): void { this.active = id; this.style(); }

  private flying = false;
  /** 検索中のブラックホールの周り（three の座標の中心と半径）。null なら検索していない */
  private hole: { center: THREE.Vector3; radius: number } | null = null;
  private heightOf: (id: string) => number = () => 0;
  private lift = 0;
  private testOpacity: number | null = null;
  private testLine: THREE.Line | null = null;

  /** 確認用：検索の中心を横切る線を、通常の線と同じ材質で一時的に描く。 */
  setTestLine(center: THREE.Vector3 | null, radius = 0): void {
    if (this.testLine) this.object.remove(this.testLine);
    this.testLine = null;
    if (!center) return;
    const points = [new THREE.Vector3(center.x - radius * 1.4, center.y, center.z),
      new THREE.Vector3(center.x + radius * 1.4, center.y, center.z)];
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), lineMaterial(0xffffff, 1));
    line.renderOrder = -1;
    this.applyHoleTo(line.material as THREE.ShaderMaterial);
    this.testLine = line;
    this.object.add(line);
  }

  /** 画素確認中だけ線を明るくし、切り抜きの有無を測れるようにする。 */
  setTestOpacity(value: number | null): void {
    this.testOpacity = value;
    this.style();
  }

  /** 飛行中は、地図の平面に置いた輪を隠し、線はすべてかすかに描く（SPEC 13 章）。 */
  setFlight(on: boolean): void {
    this.flying = on;
    this.rings.visible = !on;
    this.novae.visible = !on;
    this.style();
  }

  /**
   * 検索中は検索を前面に出す：線をさらに薄くし、ブラックホールの周り（center から radius の内側）の線を描かない。
   * 星の上の光点は検索中は出さない。null で検索前に戻す。center・radius は three の座標（この層の拡大率を掛けた後）。
   */
  setSearchHole(center: THREE.Vector3 | null, radius = 0): void {
    this.hole = center ? { center: center.clone(), radius } : null;
    for (const entry of this.entries.values()) this.applyHole(entry);
    this.applyHoleTo(this.animated.material as THREE.ShaderMaterial);
    this.style();
  }

  private applyHole(entry: Entry): void {
    this.applyHoleTo(entry.line.material as THREE.ShaderMaterial);
  }

  private applyHoleTo(material: THREE.ShaderMaterial): void {
    material.uniforms.uHoleCenter.value.copy(this.hole?.center ?? new THREE.Vector3());
    material.uniforms.uHoleRadius.value = this.hole?.radius ?? 0;
  }

  /**
   * 線と光点を立体の位置へ持ち上げる。高さは星ごとの高さ × 立ち上がりの度合い（0：地図の平面、1：飛行モード）。
   * 辺は平面の座標で求めた最小全域木のまま（SPEC 9 章）で、描く位置だけを変える。
   */
  setLift(heightOf: (id: string) => number, lift: number): void {
    this.heightOf = heightOf;
    this.lift = lift;
    for (const entry of this.entries.values()) this.applyLift(entry);
  }

  private applyLift(entry: Entry): void {
    const y = (id: string, base: number) => base + this.heightOf(id) * this.lift;
    const line = entry.line.geometry.getAttribute("position") as THREE.BufferAttribute;
    entry.edges.forEach((edge, i) => {
      line.setY(i * 2, y(edge.a, 0.12));
      line.setY(i * 2 + 1, y(edge.b, 0.12));
    });
    line.needsUpdate = true;
    const glints = entry.glints.geometry.getAttribute("position") as THREE.BufferAttribute;
    entry.data.points.forEach((point, i) => glints.setY(i, y(point.id, 0.14)));
    glints.needsUpdate = true;
  }

  /** 確認用：描いている辺と、両端の高さ（three の y）。 */
  segments(): { id: string; a: string; b: string; az: number; bz: number }[] {
    return [...this.entries].flatMap(([id, entry]) => {
      const line = entry.line.geometry.getAttribute("position") as THREE.BufferAttribute;
      return entry.edges.map((edge, i) => ({ id, a: edge.a, b: edge.b, az: line.getY(i * 2), bz: line.getY(i * 2 + 1) }));
    });
  }

  /**
   * 星座の星に小さな輪を付ける。編集中（strong）は太く明るく、星座に入っているかどうかを
   * はっきり見分けられるようにする。描いているとき・選んでいるときは控えめにする。
   */
  editMembers(points: ConstellationPoint[], strong = true): void {
    this.ringIds = points.map((point) => point.id);
    for (const mesh of [...this.rings.children]) {
      this.rings.remove(mesh);
      (mesh as THREE.Mesh).geometry.dispose();
      ((mesh as THREE.Mesh).material as THREE.Material).dispose();
    }
    for (const point of points) {
      const ring = new THREE.Mesh(strong ? new THREE.RingGeometry(0.34, 0.52, 28) : new THREE.RingGeometry(0.36, 0.44, 28),
        new THREE.MeshBasicMaterial({ color: strong ? 0xe6c88c : 0xd8b878, transparent: true,
          opacity: strong ? 0.95 : 0.6, side: THREE.DoubleSide, depthWrite: false }));
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(point.x, 0.16, -point.y);
      this.rings.add(ring);
    }
  }

  /**
   * 新星に輪を付ける：細い輪を 2 重にし、星座の星の輪（金）と見分けられるようにする。
   * 点滅させない（動きがあるときだけ描く方式を保ち、静かな見た目にする）。
   */
  setNovae(points: ConstellationPoint[]): void {
    this.novaIds = points.map((point) => point.id);
    for (const group of [...this.novae.children]) {
      this.novae.remove(group);
      for (const mesh of group.children as THREE.Mesh[]) {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      }
    }
    for (const point of points) {
      const group = new THREE.Group();
      for (const [inner, outer, opacity] of [[0.34, 0.38, 0.85], [0.5, 0.52, 0.4]] as const) {
        const ring = new THREE.Mesh(new THREE.RingGeometry(inner, outer, 32),
          new THREE.MeshBasicMaterial({ color: 0xece6d6, transparent: true, opacity, side: THREE.DoubleSide, depthWrite: false }));
        ring.rotation.x = -Math.PI / 2;
        group.add(ring);
      }
      group.position.set(point.x, 0.16, -point.y);
      this.novae.add(group);
    }
  }

  /** 確認用：金の輪を付けている星の id */
  ringIdList(): string[] { return [...this.ringIds]; }

  /** 確認用：輪を付けている新星の id */
  novaeIds(): string[] { return [...this.novaIds]; }

  /** 輪を星の表示位置に合わせる。scale は画面上でほぼ一定の大きさに見せるための倍率。 */
  moveEditMembers(position: (id: string) => { x: number; y: number } | null, scale = 1): void {
    this.rings.children.forEach((ring, i) => {
      const p = position(this.ringIds[i]);
      if (p) ring.position.set(p.x, 0.16, -p.y);
      ring.scale.setScalar(scale);
    });
    this.novae.children.forEach((group, i) => {
      const p = position(this.novaIds[i]);
      if (p) group.position.set(p.x, 0.16, -p.y);
      group.scale.setScalar(scale);
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

  /** 線を描く演出の途中か（途中なら毎コマ描く必要がある） */
  get isAnimating(): boolean {
    return this.drawing !== null;
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
      opacity: opacityOf(entry.line.material as THREE.Material) }));
  }

  points(id: string): ConstellationPoint[] { return this.entries.get(id)?.data.points ?? []; }

  private style(): void {
    for (const [id, entry] of this.entries) {
      const selected = id === this.active;
      const drawing = this.drawing?.id === id;
      // 飛行中は、選んでいる星座も含めてかすかに（立体の星の間に、うっすら見える程度）。検索中はさらに薄く
      const searching = !!this.hole;
      (entry.line.material as THREE.ShaderMaterial).uniforms.uOpacity.value = this.testOpacity ??
        (drawing ? 0 : searching ? (this.flying ? 0.1 : 0.07) : this.flying ? 0.22 : selected ? 0.85 : 0.15);
      (entry.glints.material as THREE.PointsMaterial).opacity = this.flying ? 0.3 : drawing ? 0 : selected ? 0.9 : 0.2;
      entry.glints.visible = !searching;
    }
  }
}
