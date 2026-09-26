import * as THREE from "three";

/**
 * 飛行モード（SPEC 13 章）の状態と、宇宙船を追うカメラ。
 *
 * 座標：地図の (x, y) は three の (x, 0, -y)。飛行モードの高さ z は three の y。
 * 宇宙船の向きは yaw（上から見た回転。0 で地図の上＝three の -z）と pitch（機首の上下）だけ。
 * 機体を横に傾ける回転（ロール）は入れない（酔いにくくするため）。
 */

/** 入る・出るの移り変わりにかける時間（星の立ち上がりとカメラの移動を同時に行う） */
const ENTER_SECONDS = 1.4;
const LEAVE_SECONDS = 1.2;
/** 宇宙船を追うカメラの位置（宇宙船の後ろ・上）と、見る先（前方） */
const CHASE_BACK = 5.5;
const CHASE_UP = 1.8;
const CHASE_AHEAD = 12;
/** 出たときの地図は真上から（真下を向くとカメラの上向きが決まらないので、ごく僅かに傾ける） */
const TOP_DOWN_EPSILON = 1e-4;

export type FlightPhase = "idle" | "entering" | "flying" | "leaving";

export type Ship = {
  position: THREE.Vector3;
  yaw: number;
  pitch: number;
  speed: number;
};

export class Flight {
  phase: FlightPhase = "idle";
  /** 星の立ち上がり（0：地図の平面、1：立体） */
  lift = 0;
  readonly ship: Ship = { position: new THREE.Vector3(), yaw: 0, pitch: 0, speed: 0 };
  /** 地図へ戻るときの距離（入る前の拡大率） */
  private mapDistance = 90;
  private elapsed = 0;
  private readonly fromPosition = new THREE.Vector3();
  private readonly fromLook = new THREE.Vector3();
  private readonly toPosition = new THREE.Vector3();
  private readonly toLook = new THREE.Vector3();

  get active(): boolean {
    return this.phase !== "idle";
  }

  get transitioning(): boolean {
    return this.phase === "entering" || this.phase === "leaving";
  }

  /** 機首の向き（単位ベクトル）。 */
  forward(out = new THREE.Vector3()): THREE.Vector3 {
    const { yaw, pitch } = this.ship;
    return out.set(-Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), -Math.cos(yaw) * Math.cos(pitch));
  }

  /**
   * 入る：地図の中心（カメラが見ている点）の真上に宇宙船を置き、地図の上の方向へ機首を向ける。
   * 動かずに出れば、同じ点の真上へ戻る。
   */
  enter(camera: THREE.PerspectiveCamera, mapTarget: THREE.Vector3, mapDistance: number, height: number): void {
    this.mapDistance = mapDistance;
    this.ship.position.set(mapTarget.x, height, mapTarget.z);
    this.ship.yaw = 0;
    this.ship.pitch = 0;
    this.ship.speed = 0;
    this.fromPosition.copy(camera.position);
    this.fromLook.copy(mapTarget);
    this.chasePose(this.toPosition, this.toLook);
    this.phase = "entering";
    this.elapsed = 0;
  }

  /** 出る：宇宙船がいた場所の真上から見た地図へ、入る前の距離で戻る。 */
  leave(camera: THREE.PerspectiveCamera, look: THREE.Vector3): void {
    if (this.phase === "idle" || this.phase === "leaving") return;
    this.fromPosition.copy(camera.position);
    this.fromLook.copy(look);
    const target = this.mapTarget();
    this.toLook.copy(target);
    this.toPosition.set(target.x, this.mapDistance * Math.cos(TOP_DOWN_EPSILON),
      target.z + this.mapDistance * Math.sin(TOP_DOWN_EPSILON));
    this.phase = "leaving";
    this.elapsed = 0;
  }

  /** 出た後に地図が見る点（宇宙船の真下の、地図の平面上の点）と距離。 */
  mapTarget(): THREE.Vector3 {
    return new THREE.Vector3(this.ship.position.x, 0, this.ship.position.z);
  }

  get returnDistance(): number {
    return this.mapDistance;
  }

  /**
   * 1 コマ進める。カメラの位置と向きを決め、星の立ち上がりの度合いを返す。
   * 戻り値の finished は、出る移り変わりが終わったコマで "left" になる。
   */
  update(dt: number, camera: THREE.PerspectiveCamera, look: THREE.Vector3): { finished: "entered" | "left" | null } {
    let finished: "entered" | "left" | null = null;
    if (this.phase === "entering" || this.phase === "leaving") {
      const duration = this.phase === "entering" ? ENTER_SECONDS : LEAVE_SECONDS;
      this.elapsed = Math.min(duration, this.elapsed + dt);
      const t = this.elapsed / duration;
      const eased = t * t * (3 - 2 * t);
      if (this.phase === "entering") this.chasePose(this.toPosition, this.toLook);   // 宇宙船は動かないが、念のため
      camera.position.lerpVectors(this.fromPosition, this.toPosition, eased);
      look.lerpVectors(this.fromLook, this.toLook, eased);
      camera.lookAt(look);
      this.lift = this.phase === "entering" ? eased : 1 - eased;
      if (t >= 1) {
        finished = this.phase === "entering" ? "entered" : "left";
        this.phase = this.phase === "entering" ? "flying" : "idle";
      }
      return { finished };
    }
    if (this.phase === "flying") {
      this.chasePose(camera.position, look);
      camera.lookAt(look);
      this.lift = 1;
    }
    return { finished };
  }

  /** 宇宙船の後ろ・少し上からのカメラの位置と、見る点。 */
  chasePose(position: THREE.Vector3, look: THREE.Vector3): void {
    const forward = this.forward();
    position.copy(this.ship.position).addScaledVector(forward, -CHASE_BACK);
    position.y += CHASE_UP;
    look.copy(this.ship.position).addScaledVector(forward, CHASE_AHEAD);
  }
}
