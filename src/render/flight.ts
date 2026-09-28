import * as THREE from "three";

/**
 * 飛行モード（SPEC 13 章）の状態と、宇宙船を追うカメラ。
 *
 * 座標：地図の (x, y) は three の (x, 0, -y)。飛行モードの高さ z は three の y。
 * 宇宙船の向きは四元数（orientation）で持つ。機体の座標軸は three の既定どおり、右が +x、上が +y、機首が -z。
 * 機首が真上・真下を向いても向きの計算が乱れないよう、オイラー角（yaw・pitch）では持たない（表示と保存のときだけ換算する）。
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
 * 操作（SPEC 13 章）。宇宙船は常に前へ進む（止まらない）。
 * - W・↑：機首を上へ、S・↓：機首を下へ（押し続ければ宙返り）。A・←：左へ、D・→：右へ（機体の上下の軸のまわりに回る）
 * - Space：押している間は加速、Shift：押している間は減速（止まらない。窓のタイトルが読めて、狙った星に入れる遅さまで）
 * - マウス：ボタンを押してドラッグしている間だけ、押した点からのずれで機首の向きを変える
 * - 向きを変える速さには上限を付け、動き出しと止まりをなめらかにする
 * - 操作していないときは、左右の傾き（ロール）だけを地図の面を基準にゆっくり水平へ戻す（機首の上下は戻さない）
 * - 星空の範囲を越えたら、機首がゆっくり星空の中心のほうへ向き直る
 * 速さは地図の広がりに合わせる（星が多く広い地図ほど速い）。
 */
const KEY_PITCH_RATE = 1.4;         // 機首の上下の速さ（rad/秒。約 4.5 秒で宙返り）
const KEY_YAW_RATE = 1.0;           // 左右の向きの速さ
const MOUSE_RATE = 1.2;             // ドラッグのずれが最大のときの速さ
const MAX_TURN_RATE = 1.5;          // 向きを変える速さの上限（キーとマウスを合わせても、軸ごとにこれを超えない）
const TURN_EASE = 5;                // 向きを変える速さが目標に近づく速さ（急に回り始めない・急に止まらない）
const ROLL_LEVEL_RATE = 0.6;        // 左右の傾きを水平へ戻す速さの上限（rad/秒）
const ROLL_LEVEL_GAIN = 1.2;
const HOME_TURN_RATE = 0.5;         // 星空の範囲の外で、中心へ向き直る速さの上限（rad/秒）
const DRAG_DEAD_ZONE = 0.04;        // ドラッグのずれがこれ未満なら曲がらない（押しただけで動かない）
const CRUISE = 0.35;                // 入った直後の速さ（最高速度に対する割合）
const MIN_SPEED = 0.06;             // 減速したときの下限（最高速度に対する割合）。0 にはしない
const ACCELERATION = 0.5;           // Space：最高速度まで約 2 秒
const DECELERATION = 0.6;           // Shift：最高速度から下限まで約 1.6 秒
const CAMERA_FOLLOW = 6;            // カメラが機体の向きに追いつく速さ（少し遅れて、なめらかに）

export type FlightInput = {
  /** Space で +1（加速）、Shift で -1（減速） */
  throttle: number;
  /** W・↑ で +1（機首を上へ）、S・↓ で -1 */
  pitch: number;
  /** A・← で +1（左へ）、D・→ で -1（右へ） */
  yaw: number;
  /** マウスのボタンを押してドラッグしている間の、押した点からのずれ（-1〜1。右・下が正）。押していなければ 0 */
  dragX: number;
  dragY: number;
};

const NO_INPUT: FlightInput = { throttle: 0, pitch: 0, yaw: 0, dragX: 0, dragY: 0 };

const deadZone = (v: number) => {
  const a = Math.abs(v);
  return a < DRAG_DEAD_ZONE ? 0 : Math.sign(v) * Math.min(1, (a - DRAG_DEAD_ZONE) / (1 - DRAG_DEAD_ZONE));
};

const X_AXIS = new THREE.Vector3(1, 0, 0);
const Y_AXIS = new THREE.Vector3(0, 1, 0);
const Z_AXIS = new THREE.Vector3(0, 0, 1);
const WORLD_UP = new THREE.Vector3(0, 1, 0);

/** 四元数を、表示と保存のための角度に換算する（YXZ の順：yaw → pitch → roll） */
export function anglesOf(q: THREE.Quaternion): { yaw: number; pitch: number; roll: number } {
  const e = new THREE.Euler().setFromQuaternion(q, "YXZ");
  return { yaw: e.y, pitch: e.x, roll: e.z };
}

export type FlightPhase = "idle" | "entering" | "flying" | "leaving";

export type Ship = {
  position: THREE.Vector3;
  /** 機体の向き（機首が -z、上が +y の機体を回したもの） */
  orientation: THREE.Quaternion;
  speed: number;
};

export class Flight {
  phase: FlightPhase = "idle";
  /** 星の立ち上がり（0：地図の平面、1：立体） */
  lift = 0;
  readonly ship: Ship = { position: new THREE.Vector3(), orientation: new THREE.Quaternion(), speed: 0 };
  /** 地図へ戻るときの距離（入る前の拡大率） */
  private mapDistance = 90;
  /** 向きを変える速さ（機体の軸ごと：x＝機首の上下、y＝左右、z＝左右の傾き。なめらかに変える） */
  private readonly turnRate = new THREE.Vector3();
  /** カメラの向き（機体の向きを少し遅れて追う） */
  private readonly cameraOrientation = new THREE.Quaternion();
  /** 地図の広がりから決まる、最高速度と星空の範囲 */
  private maxSpeed = 12;
  private boostLeft = 0;
  readonly boostMultiplier = 1.6;
  private bound = 120;
  private ceiling = 40;
  /** 範囲の外で中心へ向き直っているか（確認用） */
  homing = false;
  private readonly startPosition = new THREE.Vector3();
  private elapsed = 0;
  private readonly fromPosition = new THREE.Vector3();
  private readonly fromLook = new THREE.Vector3();
  private readonly fromUp = new THREE.Vector3();
  private readonly toPosition = new THREE.Vector3();
  private readonly toLook = new THREE.Vector3();
  private readonly toUp = new THREE.Vector3();

  get active(): boolean {
    return this.phase !== "idle";
  }

  get normalMaxSpeed(): number { return this.maxSpeed; }
  get boostCap(): number { return this.maxSpeed * this.boostMultiplier; }
  get minSpeed(): number { return this.maxSpeed * MIN_SPEED; }
  get cruiseSpeed(): number { return this.maxSpeed * CRUISE; }
  /** 星空の範囲（中心からの水平の距離と、上下の高さ） */
  get range(): { bound: number; ceiling: number } { return { bound: this.bound, ceiling: this.ceiling }; }

  boost(): void {
    this.boostLeft = 1.5;
    this.ship.speed = Math.min(this.boostCap, Math.max(this.ship.speed * 1.35, this.maxSpeed * 1.2));
  }

  get transitioning(): boolean {
    return this.phase === "entering" || this.phase === "leaving";
  }

  /** 機首の向き（単位ベクトル）。 */
  forward(out = new THREE.Vector3()): THREE.Vector3 {
    return out.set(0, 0, -1).applyQuaternion(this.ship.orientation);
  }

  /** 機体の上の向き（単位ベクトル）。 */
  up(out = new THREE.Vector3()): THREE.Vector3 {
    return out.set(0, 1, 0).applyQuaternion(this.ship.orientation);
  }

  /** カメラの上の向き（確認用。宙返りの途中で下を向く） */
  cameraUp(out = new THREE.Vector3()): THREE.Vector3 {
    return out.set(0, 1, 0).applyQuaternion(this.cameraOrientation);
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
    this.fromUp.copy(camera.up);
    this.chasePose(this.toPosition, this.toLook, this.toUp);
    this.phase = "entering";
    this.elapsed = 0;
  }

  /** 「戻る」で再生成された画面では、出入りの移り変わりを飛ばして飛行を続ける。 */
  resume(position: THREE.Vector3, angles: { yaw: number; pitch: number; roll: number }, speed: number,
    camera: THREE.PerspectiveCamera, look: THREE.Vector3): void {
    this.ship.position.copy(position);
    this.ship.orientation.setFromEuler(new THREE.Euler(angles.pitch, angles.yaw, angles.roll, "YXZ"));
    this.cameraOrientation.copy(this.ship.orientation);
    this.ship.speed = THREE.MathUtils.clamp(speed, this.minSpeed, this.maxSpeed);
    this.phase = "flying";
    this.lift = 1;
    this.elapsed = 0;
    this.turnRate.set(0, 0, 0);
    this.chasePose(camera.position, look, camera.up);
    camera.lookAt(look);
  }

  /** 宇宙船を入った直後の位置と向き（地図の上の方向・水平）に戻し、入った直後の速さにする。 */
  reset(): void {
    this.ship.position.copy(this.startPosition);
    this.ship.orientation.identity();
    this.cameraOrientation.identity();
    this.ship.speed = this.cruiseSpeed;
    this.turnRate.set(0, 0, 0);
    this.boostLeft = 0;
    this.homing = false;
  }

  /**
   * 宇宙船を、点 point を正面に見る位置 position に置く（確認用の瞬間移動にも使う）。機体は水平、速さは入った直後の速さ。
   */
  place(position: THREE.Vector3, point: THREE.Vector3): void {
    this.ship.position.copy(position);
    // Matrix4.lookAt は、-z が point を向く回転を作る（機首が -z の機体にそのまま使える）
    const m = new THREE.Matrix4().lookAt(position, point, WORLD_UP);
    this.ship.orientation.setFromRotationMatrix(m);
    this.cameraOrientation.copy(this.ship.orientation);
    this.ship.speed = this.cruiseSpeed;
    this.turnRate.set(0, 0, 0);
  }

  /** 確認用：機体の向きを角度で直接決める（YXZ の順） */
  setAngles(yaw: number, pitch: number, roll: number): void {
    this.ship.orientation.setFromEuler(new THREE.Euler(pitch, yaw, roll, "YXZ"));
    this.cameraOrientation.copy(this.ship.orientation);
    this.turnRate.set(0, 0, 0);
  }

  /** 突入の後など、速さを下限まで落とす（止めない） */
  slowDown(): void {
    this.ship.speed = this.minSpeed;
  }

  /** 推進の強さ（0〜1）。機体の光に使う。 */
  get thrustLevel(): number {
    return this.maxSpeed > 0 ? this.ship.speed / this.maxSpeed : 0;
  }

  /** 操作を 1 コマ分進める（飛んでいる間だけ）。 */
  private steer(dt: number, input: FlightInput): void {
    const ship = this.ship;
    // 速さ：Space で加速、Shift で減速。下限より下げない（止まらない）
    if (this.boostLeft > 0) this.boostLeft = Math.max(0, this.boostLeft - dt);
    const currentMax = this.boostLeft > 0 ? this.boostCap : this.maxSpeed;
    if (input.throttle > 0) ship.speed += this.maxSpeed * ACCELERATION * dt;
    if (input.throttle < 0) ship.speed -= this.maxSpeed * DECELERATION * dt;
    ship.speed = THREE.MathUtils.clamp(ship.speed, this.minSpeed, currentMax);

    // 向き：キーとドラッグを合わせ、軸ごとに上限を付けて、なめらかに
    const dragX = deadZone(input.dragX), dragY = deadZone(input.dragY);
    const pitchWant = THREE.MathUtils.clamp(input.pitch * KEY_PITCH_RATE - dragY * MOUSE_RATE, -MAX_TURN_RATE, MAX_TURN_RATE);
    const yawWant = THREE.MathUtils.clamp(input.yaw * KEY_YAW_RATE - dragX * MOUSE_RATE, -MAX_TURN_RATE, MAX_TURN_RATE);
    const steering = input.pitch !== 0 || input.yaw !== 0 || dragX !== 0 || dragY !== 0;
    const rollWant = steering ? 0 : this.levelingRate();
    const ease = 1 - Math.exp(-dt * TURN_EASE);
    this.turnRate.x += (pitchWant - this.turnRate.x) * ease;
    this.turnRate.y += (yawWant - this.turnRate.y) * ease;
    this.turnRate.z += (rollWant - this.turnRate.z) * ease;
    // 機体の軸のまわりに回す（後ろから掛ける）
    const step = new THREE.Quaternion();
    ship.orientation.multiply(step.setFromAxisAngle(X_AXIS, this.turnRate.x * dt));
    ship.orientation.multiply(step.setFromAxisAngle(Y_AXIS, this.turnRate.y * dt));
    ship.orientation.multiply(step.setFromAxisAngle(Z_AXIS, this.turnRate.z * dt));
    ship.orientation.normalize();

    // 星空の範囲の外：機首をゆっくり中心のほうへ向ける（範囲の中ではこの働きはない）
    const r = Math.hypot(ship.position.x, ship.position.z);
    this.homing = r > this.bound || Math.abs(ship.position.y) > this.ceiling;
    if (this.homing) {
      const forward = this.forward();
      const home = ship.position.clone().negate().normalize();
      const angle = forward.angleTo(home);
      const axis = new THREE.Vector3().crossVectors(forward, home);
      if (axis.lengthSq() < 1e-8) axis.copy(this.up());
      if (angle > 1e-4) {
        ship.orientation.premultiply(step.setFromAxisAngle(axis.normalize(), Math.min(angle, HOME_TURN_RATE * dt)));
        ship.orientation.normalize();
      }
    }

    // 進む
    ship.position.addScaledVector(this.forward(), ship.speed * dt);
    // 念のための外側の壁（範囲の外へ出ても、中心へ向き直るので、ふつうはここまで来ない）
    const wall = this.bound * 2;
    const r2 = Math.hypot(ship.position.x, ship.position.z);
    if (r2 > wall) {
      ship.position.x *= wall / r2;
      ship.position.z *= wall / r2;
    }
    ship.position.y = THREE.MathUtils.clamp(ship.position.y, -this.ceiling * 2, this.ceiling * 2);
  }

  /**
   * 左右の傾きを水平へ戻す速さ（機体の z 軸まわり）。地図の面を基準に、機体の上の向きを「真上を機首の向きに直交させたもの」へ寄せる。
   * 機首がほぼ真上・真下を向いているときは、水平が決まらないので戻さない。
   */
  private levelingRate(): number {
    const forward = this.forward();
    const up = this.up();
    const level = WORLD_UP.clone().addScaledVector(forward, -forward.dot(WORLD_UP));
    if (level.lengthSq() < 0.04) return 0;
    level.normalize();
    // 機首の向きのまわりで、いまの上の向きから水平の上の向きまでの角度（符号付き）
    const error = Math.atan2(new THREE.Vector3().crossVectors(up, level).dot(forward), up.dot(level));
    // 機体の z 軸（機首の反対）まわりの回転なので、符号を反転する
    return THREE.MathUtils.clamp(-error * ROLL_LEVEL_GAIN, -ROLL_LEVEL_RATE, ROLL_LEVEL_RATE);
  }

  /** 左右の傾き（rad。水平で 0）。確認用 */
  get roll(): number {
    const forward = this.forward();
    const level = WORLD_UP.clone().addScaledVector(forward, -forward.dot(WORLD_UP));
    if (level.lengthSq() < 0.04) return 0;
    level.normalize();
    const up = this.up();
    return Math.atan2(new THREE.Vector3().crossVectors(up, level).dot(forward), up.dot(level));
  }

  /** 出る：宇宙船がいた場所の真上から見た地図へ、入る前の距離で戻る。 */
  leave(camera: THREE.PerspectiveCamera, look: THREE.Vector3): void {
    if (this.phase === "idle" || this.phase === "leaving") return;
    this.fromPosition.copy(camera.position);
    this.fromLook.copy(look);
    this.fromUp.copy(camera.up);
    const target = this.mapTarget();
    this.toLook.copy(target);
    this.toPosition.set(target.x, this.mapDistance * Math.cos(TOP_DOWN_EPSILON),
      target.z + this.mapDistance * Math.sin(TOP_DOWN_EPSILON));
    this.toUp.copy(WORLD_UP);
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
   * 戻り値の finished は、出る移り変わりが終わったコマで "left" になる。出終わったら、カメラの上の向きを真上に戻す（地図の操作のため）。
   */
  update(dt: number, camera: THREE.PerspectiveCamera, look: THREE.Vector3, input: FlightInput = NO_INPUT): { finished: "entered" | "left" | null } {
    let finished: "entered" | "left" | null = null;
    if (this.phase === "entering" || this.phase === "leaving") {
      const duration = this.phase === "entering" ? ENTER_SECONDS : LEAVE_SECONDS;
      this.elapsed = Math.min(duration, this.elapsed + dt);
      const t = this.elapsed / duration;
      const eased = t * t * (3 - 2 * t);
      if (this.phase === "entering") this.chasePose(this.toPosition, this.toLook, this.toUp);   // 宇宙船は動かないが、念のため
      camera.position.lerpVectors(this.fromPosition, this.toPosition, eased);
      look.lerpVectors(this.fromLook, this.toLook, eased);
      camera.up.lerpVectors(this.fromUp, this.toUp, eased);
      if (camera.up.lengthSq() < 1e-6) camera.up.copy(WORLD_UP);
      camera.up.normalize();
      camera.lookAt(look);
      this.lift = this.phase === "entering" ? eased : 1 - eased;
      if (t >= 1) {
        finished = this.phase === "entering" ? "entered" : "left";
        this.phase = this.phase === "entering" ? "flying" : "idle";
        if (finished === "left") camera.up.copy(WORLD_UP);
      }
      return { finished };
    }
    if (this.phase === "flying") {
      this.steer(dt, input);
      // カメラの向きは、機体の向きを少し遅れて追う（宙返りでは画面も一緒に回る）
      this.cameraOrientation.slerp(this.ship.orientation, 1 - Math.exp(-dt * CAMERA_FOLLOW));
      this.chasePose(camera.position, look, camera.up);
      camera.lookAt(look);
      this.lift = 1;
    }
    return { finished };
  }

  /** 宇宙船の後ろ・少し上（カメラの向きで見た後ろと上）からのカメラの位置と、見る点と、上の向き。 */
  chasePose(position: THREE.Vector3, look: THREE.Vector3, up?: THREE.Vector3): void {
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.cameraOrientation);
    const cameraUp = new THREE.Vector3(0, 1, 0).applyQuaternion(this.cameraOrientation);
    position.copy(this.ship.position).addScaledVector(forward, -CHASE_BACK).addScaledVector(cameraUp, CHASE_UP);
    look.copy(this.ship.position).addScaledVector(forward, CHASE_AHEAD);
    up?.copy(cameraUp);
  }
}
