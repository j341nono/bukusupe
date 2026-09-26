import * as THREE from "three";

/**
 * 飛行モード（SPEC 13 章）の状態と、宇宙船を追うカメラ。
 *
 * 座標：地図の (x, y) は three の (x, 0, -y)。飛行モードの高さ z は three の y。
 * 宇宙船の向きは yaw（上から見た回転。0 で地図の上＝three の -z）と pitch（機首の上下）だけ。
 * 機体を横に傾ける回転（ロール）は入れない（酔いにくくするため）。
 */

/**
 * 飛行モードの空間は、地図の座標（x・y と高さ）を FLIGHT_SCALE 倍に広げる（並びと高さの相対関係は保つ）。
 * 星と星座の層は描画の拡大率で広げ、宇宙船とカメラはこの広げた空間（世界の座標）で動く。
 * 地図に戻るときは FLIGHT_SCALE で割って、地図の座標に戻す。
 */
export const FLIGHT_SCALE = 4;

/** 入る・出るの移り変わりにかける時間（星の立ち上がりとカメラの移動を同時に行う） */
const ENTER_SECONDS = 1.4;
const LEAVE_SECONDS = 1.2;
/** 宇宙船を追うカメラの位置（宇宙船の後ろ・上）と、見る先（前方） */
const CHASE_BACK = 5.5;
const CHASE_UP = 1.8;
const CHASE_AHEAD = 12;
/** 出たときの地図は真上から（真下を向くとカメラの上向きが決まらないので、ごく僅かに傾ける） */
const TOP_DOWN_EPSILON = 1e-4;

/**
 * 操作（SPEC 13 章）。初見で 10 秒以内に飛べること、酔いにくいことを優先する。
 * - W・S：加速・減速（止まるまで。後退はしない）
 * - A・D：左右に旋回。マウスの左右のずれも旋回に足す。合わせた旋回の速さに上限を付ける
 * - マウスの上下のずれ：機首の上下（角度に上限）。画面の中央付近は反応しない（不感帯）
 * - Space・Shift：上昇・下降
 * 速さは地図の広がりに合わせる（星が多く広い地図ほど速い）。
 */
const MAX_TURN_RATE = 1.2;          // 旋回の速さの上限（rad/秒）
const KEY_TURN_RATE = 1.0;
const MOUSE_TURN_RATE = 1.0;
const TURN_EASE = 6;                // 旋回の速さが目標に近づく速さ（急に回り始めない）
const MAX_PITCH = 0.5;              // 機首の上下の上限（rad、約 29 度）
const PITCH_EASE = 4;
const MOUSE_DEAD_ZONE = 0.15;       // 画面中央からのずれがこれ未満なら反応しない
const CLIMB_EASE = 6;

export type FlightInput = {
  /** W で +1、S で -1 */
  thrust: number;
  /** A で +1（左）、D で -1（右） */
  turn: number;
  /** Space で +1、Shift で -1 */
  climb: number;
  /** マウスの位置の、画面中央からのずれ（-1〜1。右・下が正） */
  mouseX: number;
  mouseY: number;
};

const deadZone = (v: number) => {
  const a = Math.abs(v);
  return a < MOUSE_DEAD_ZONE ? 0 : Math.sign(v) * Math.min(1, (a - MOUSE_DEAD_ZONE) / (1 - MOUSE_DEAD_ZONE));
};

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
  /** 旋回の速さと上昇の速さ（なめらかに変える） */
  private turnVelocity = 0;
  private climbVelocity = 0;
  /** 地図の広がりから決まる、最高速度と飛べる範囲 */
  private maxSpeed = 12;
  private bound = 120;
  private ceiling = 40;
  private readonly startPosition = new THREE.Vector3();
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
  enter(camera: THREE.PerspectiveCamera, mapTarget: THREE.Vector3, mapDistance: number, height: number, extent: number): void {
    this.mapDistance = mapDistance;
    // 目安：宇宙の端から端（広げた空間の直径）を 30 秒ほど、星団の中を数秒で抜ける速さ
    const world = extent * FLIGHT_SCALE;
    this.maxSpeed = THREE.MathUtils.clamp((world * 2) / 30, 10, 120);
    this.bound = world * 1.5;
    this.ceiling = Math.max(40, world * 0.5);
    this.ship.position.set(mapTarget.x * FLIGHT_SCALE, height, mapTarget.z * FLIGHT_SCALE);
    this.startPosition.copy(this.ship.position);
    this.reset();
    this.fromPosition.copy(camera.position);
    this.fromLook.copy(mapTarget);
    this.chasePose(this.toPosition, this.toLook);
    this.phase = "entering";
    this.elapsed = 0;
  }

  /** 宇宙船を入った直後の位置と向きに戻し、止める。 */
  reset(): void {
    this.ship.position.copy(this.startPosition);
    this.ship.yaw = 0;
    this.ship.pitch = 0;
    this.ship.speed = 0;
    this.turnVelocity = 0;
    this.climbVelocity = 0;
  }

  /** 宇宙船を、点 point を正面に見る位置 position に置いて止める（確認用の瞬間移動にも使う）。 */
  place(position: THREE.Vector3, point: THREE.Vector3): void {
    this.ship.position.copy(position);
    const dir = point.clone().sub(position).normalize();
    this.ship.yaw = Math.atan2(-dir.x, -dir.z);
    this.ship.pitch = Math.asin(THREE.MathUtils.clamp(dir.y, -1, 1));
    this.ship.speed = 0;
    this.turnVelocity = 0;
    this.climbVelocity = 0;
  }

  /** 推進の強さ（0〜1）。機体の光に使う。 */
  get thrustLevel(): number {
    return this.maxSpeed > 0 ? this.ship.speed / this.maxSpeed : 0;
  }

  /** 操作を 1 コマ分進める（飛んでいる間だけ）。 */
  private steer(dt: number, input: FlightInput): void {
    const ship = this.ship;
    // 加速・減速
    // 最高速度まで約 2 秒で加速し、約 1 秒で止まる
    if (input.thrust > 0) ship.speed += this.maxSpeed * 0.5 * dt;
    if (input.thrust < 0) ship.speed -= this.maxSpeed * 1.0 * dt;
    ship.speed = THREE.MathUtils.clamp(ship.speed, 0, this.maxSpeed);
    // 旋回：キーとマウスの左右を合わせ、上限を付けて、なめらかに
    const wanted = THREE.MathUtils.clamp(
      input.turn * KEY_TURN_RATE - deadZone(input.mouseX) * MOUSE_TURN_RATE, -MAX_TURN_RATE, MAX_TURN_RATE);
    this.turnVelocity += (wanted - this.turnVelocity) * (1 - Math.exp(-dt * TURN_EASE));
    ship.yaw += this.turnVelocity * dt;
    // 機首の上下：マウスの上下のずれで角度を決める（上に動かすと機首が上がる）
    const pitchTarget = -deadZone(input.mouseY) * MAX_PITCH;
    ship.pitch += (pitchTarget - ship.pitch) * (1 - Math.exp(-dt * PITCH_EASE));
    // 上昇・下降
    const climbSpeed = Math.max(4, this.maxSpeed * 0.45);
    this.climbVelocity += (input.climb * climbSpeed - this.climbVelocity) * (1 - Math.exp(-dt * CLIMB_EASE));
    // 進む
    ship.position.addScaledVector(this.forward(), ship.speed * dt);
    ship.position.y += this.climbVelocity * dt;
    // 飛べる範囲：地図の広がりの外や、高すぎ・低すぎへは出ない
    const r = Math.hypot(ship.position.x, ship.position.z);
    if (r > this.bound) {
      ship.position.x *= this.bound / r;
      ship.position.z *= this.bound / r;
    }
    ship.position.y = THREE.MathUtils.clamp(ship.position.y, -this.ceiling, this.ceiling);
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

  /** 出た後に地図が見る点（宇宙船の真下の、地図の平面上の点。地図の座標に戻す）。 */
  mapTarget(): THREE.Vector3 {
    return new THREE.Vector3(this.ship.position.x / FLIGHT_SCALE, 0, this.ship.position.z / FLIGHT_SCALE);
  }

  get returnDistance(): number {
    return this.mapDistance;
  }

  /**
   * 1 コマ進める。カメラの位置と向きを決め、星の立ち上がりの度合いを返す。
   * 戻り値の finished は、出る移り変わりが終わったコマで "left" になる。
   */
  update(dt: number, camera: THREE.PerspectiveCamera, look: THREE.Vector3, input: FlightInput): { finished: "entered" | "left" | null } {
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
      this.steer(dt, input);
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
