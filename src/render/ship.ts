import * as THREE from "three";

/**
 * 宇宙船の機体（SPEC 13 章）。既存のゲーム作品の機体や名前に寄せない、オリジナルの形。
 *
 * 星図の版画のように「藍の面＋生成りの細い輪郭線」で描く（`docs/DESIGN.md` の配色：藍・白。金は使わない。
 * 金は人が名付けたもの＝星座だけの色）。細身の船体に、後ろへ流れる 2 枚の翼と小さな垂直尾翼、
 * 後部に淡い白青の推進の光。機首は -z（three の座標）を向く。長さは約 1.5。
 */
const HULL = 0x1c2342;    // 藍の面
const WING = 0x252d52;
const INK = 0xe9e1cc;     // 生成りの輪郭線
const GLOW = 0xcfe0ff;    // 推進の光（白に近い青。検索のネオンの青より淡く）

export type ShipModel = { group: THREE.Group; setThrust: (level: number) => void };

export function createShip(): ShipModel {
  const group = new THREE.Group();
  const fill = (color: number) => new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide });
  const line = new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.9 });
  const add = (geometry: THREE.BufferGeometry, color: number) => {
    const mesh = new THREE.Mesh(geometry, fill(color));
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 20), line);
    group.add(mesh, edges);
  };

  // 船体：前へ細くなる円錐と、後部の短い胴
  const nose = new THREE.ConeGeometry(0.15, 1.05, 10, 1, true).rotateX(-Math.PI / 2).translate(0, 0, -0.32);
  add(nose, HULL);
  const body = new THREE.CylinderGeometry(0.15, 0.12, 0.42, 10, 1, true).rotateX(Math.PI / 2).translate(0, 0, 0.41);
  add(body, HULL);

  // 翼：後ろへ流れる三角形（左右対称）
  const wing = (side: number) => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute([
      side * 0.1, 0, -0.05,
      side * 0.1, 0, 0.55,
      side * 0.92, -0.04, 0.72,
    ], 3));
    return g;
  };
  add(wing(1), WING);
  add(wing(-1), WING);

  // 垂直尾翼：小さな三角形
  const fin = new THREE.BufferGeometry();
  fin.setAttribute("position", new THREE.Float32BufferAttribute([
    0, 0.1, 0.25,
    0, 0.1, 0.62,
    0, 0.42, 0.68,
  ], 3));
  add(fin, WING);

  // 推進の光：後部の小さな光の玉（加算合成）
  const glowTexture = (() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.35, "rgba(255,255,255,0.45)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
    }
    return new THREE.CanvasTexture(canvas);
  })();
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture, color: GLOW, transparent: true,
    blending: THREE.AdditiveBlending, depthWrite: false }));
  glow.position.set(0, 0, 0.7);
  group.add(glow);

  group.rotation.order = "YXZ";   // yaw（上から見た回転）→ pitch（機首の上下）。ロールは使わない
  group.visible = false;

  const setThrust = (level: number) => {
    const t = THREE.MathUtils.clamp(level, 0, 1);
    glow.scale.setScalar(0.35 + t * 0.55);
    (glow.material as THREE.SpriteMaterial).opacity = 0.35 + t * 0.6;
  };
  setThrust(0);
  return { group, setThrust };
}
