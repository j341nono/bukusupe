import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/addons/renderers/CSS2DRenderer.js';
import type {
  LaidOutBookmark,
  PickResult,
  PlanetLayout,
  RingSpec,
  View,
} from '../shared/types';
import { weatheredOpacity } from './style/color';
import { faviconUrl, truncate } from './util/favicon';
import { PLANET_LAYOUT_CONSTANTS } from './data/layout';

interface Star {
  bookmark: LaidOutBookmark;
  group: THREE.Group;
  icon: THREE.Sprite;
  halo: THREE.Sprite;
  label: CSS2DObject;
  baseOpacity: number;
  ringColor: THREE.Color;
}

const ICON_SIZE = 3.2;
const HALO_SIZE = 6.5;
const LABEL_OFFSET_Y = -2.4;
const LABEL_NEAR = 60;
const LABEL_FAR = 200;

function makeHaloTexture(): THREE.Texture {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.35, 'rgba(255,255,255,0.55)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makePlanetTexture(): THREE.Texture {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 256;
  const g = c.getContext('2d')!;
  const grad = g.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0.0, '#9b6d3f');
  grad.addColorStop(0.18, '#c89870');
  grad.addColorStop(0.35, '#e4c094');
  grad.addColorStop(0.5, '#f0d2a8');
  grad.addColorStop(0.65, '#e4c094');
  grad.addColorStop(0.82, '#c89870');
  grad.addColorStop(1.0, '#9b6d3f');
  g.fillStyle = grad;
  g.fillRect(0, 0, 512, 256);

  // Stripes (deterministic-ish)
  const bands = [
    { y: 36, h: 4, a: 0.08 },
    { y: 64, h: 5, a: 0.06 },
    { y: 92, h: 3, a: 0.05 },
    { y: 116, h: 6, a: 0.07 },
    { y: 138, h: 3, a: 0.04 },
    { y: 160, h: 5, a: 0.06 },
    { y: 188, h: 4, a: 0.08 },
    { y: 216, h: 3, a: 0.06 },
  ];
  for (const b of bands) {
    g.fillStyle = `rgba(60,30,10,${b.a})`;
    g.fillRect(0, b.y, 512, b.h);
  }

  // subtle highlight at top equator-ish
  const hl = g.createLinearGradient(0, 100, 0, 156);
  hl.addColorStop(0, 'rgba(255,240,210,0)');
  hl.addColorStop(0.5, 'rgba(255,240,210,0.15)');
  hl.addColorStop(1, 'rgba(255,240,210,0)');
  g.fillStyle = hl;
  g.fillRect(0, 100, 512, 56);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function ringLabelText(spec: RingSpec): string {
  return `${truncate(spec.name, 14)} · ${spec.count}`;
}

export function create3DView(container: HTMLElement, layout: PlanetLayout): View {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#04060c');

  // Distant star field backdrop
  const bgGeo = new THREE.BufferGeometry();
  const bgCount = 2500;
  const bgPositions = new Float32Array(bgCount * 3);
  for (let i = 0; i < bgCount; i++) {
    bgPositions[i * 3] = (Math.random() - 0.5) * 1600;
    bgPositions[i * 3 + 1] = (Math.random() - 0.5) * 1600;
    bgPositions[i * 3 + 2] = (Math.random() - 0.5) * 1600;
  }
  bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3));
  scene.add(
    new THREE.Points(
      bgGeo,
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.6,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
      }),
    ),
  );

  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 4000);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  container.appendChild(renderer.domElement);

  const labelRenderer = new CSS2DRenderer();
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0';
  labelRenderer.domElement.style.left = '0';
  labelRenderer.domElement.style.pointerEvents = 'none';
  container.appendChild(labelRenderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.rotateSpeed = 0.55;
  controls.zoomSpeed = 0.8;
  controls.minDistance = PLANET_LAYOUT_CONSTANTS.PLANET_RADIUS * 2;
  controls.maxDistance = 800;

  const haloTex = makeHaloTexture();
  const planetTex = makePlanetTexture();
  const textureLoader = new THREE.TextureLoader();
  const faviconCache = new Map<string, THREE.Texture>();

  function getFaviconTexture(url: string): THREE.Texture {
    let key = '';
    try {
      key = new URL(url).hostname || url;
    } catch {
      key = url;
    }
    let tex = faviconCache.get(key);
    if (!tex) {
      tex = textureLoader.load(faviconUrl(url, 32));
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      faviconCache.set(key, tex);
    }
    return tex;
  }

  // Saturn group: planet + rings + bookmarks all tilt together
  const saturnGroup = new THREE.Group();
  saturnGroup.rotation.x = layout.tilt;
  scene.add(saturnGroup);

  // Planet
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(PLANET_LAYOUT_CONSTANTS.PLANET_RADIUS, 64, 48),
    new THREE.MeshBasicMaterial({ map: planetTex }),
  );
  saturnGroup.add(planet);

  // Planet inner glow (helps disambiguate from background)
  const planetGlow = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: haloTex,
      color: 0xffd9a8,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  planetGlow.scale.set(
    PLANET_LAYOUT_CONSTANTS.PLANET_RADIUS * 3.2,
    PLANET_LAYOUT_CONSTANTS.PLANET_RADIUS * 3.2,
    1,
  );
  saturnGroup.add(planetGlow);

  // Rings (visual band + label)
  const ringsGroup = new THREE.Group();
  saturnGroup.add(ringsGroup);
  const ringLabels: { spec: RingSpec; obj: CSS2DObject }[] = [];
  function buildRings(): void {
    for (const child of [...ringsGroup.children]) {
      ringsGroup.remove(child);
    }
    ringLabels.length = 0;
    for (const spec of layout.rings) {
      // Band
      const band = new THREE.Mesh(
        new THREE.RingGeometry(spec.radius - 0.5, spec.radius + 0.5, 128),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(spec.cssColor),
          transparent: true,
          opacity: 0.32,
          side: THREE.DoubleSide,
          depthWrite: false,
        }),
      );
      band.rotation.x = Math.PI / 2;
      ringsGroup.add(band);

      // Wider faint outline for visibility from far
      const faint = new THREE.Mesh(
        new THREE.RingGeometry(spec.radius - 1.6, spec.radius + 1.6, 128),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(spec.cssColor),
          transparent: true,
          opacity: 0.08,
          side: THREE.DoubleSide,
          depthWrite: false,
        }),
      );
      faint.rotation.x = Math.PI / 2;
      ringsGroup.add(faint);

      // Ring label at angle 0
      const labelDiv = document.createElement('div');
      labelDiv.className = 'ring-label';
      labelDiv.style.color = spec.cssColor;
      labelDiv.textContent = ringLabelText(spec);
      const labelObj = new CSS2DObject(labelDiv);
      labelObj.position.set(spec.radius + 5, 0, 0);
      ringsGroup.add(labelObj);
      ringLabels.push({ spec, obj: labelObj });
    }
  }
  buildRings();

  // Bookmarks
  const meshGroup = new THREE.Group();
  saturnGroup.add(meshGroup);
  const stars = new Map<string, Star>();
  const raycaster = new THREE.Raycaster();

  function labelText(b: LaidOutBookmark): string {
    return truncate(b.title || b.hostname || 'Untitled', 24);
  }

  function ringColorFor(b: LaidOutBookmark): THREE.Color {
    const spec = layout.rings[b.ringIndex];
    return new THREE.Color(spec ? spec.cssColor : '#cccccc');
  }

  function makeStar(b: LaidOutBookmark): Star {
    const opacity = weatheredOpacity(b.dateAdded);
    const group = new THREE.Group();
    group.position.set(b.position3d[0], b.position3d[1], b.position3d[2]);

    const ringColor = ringColorFor(b);

    const halo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: haloTex,
        color: ringColor,
        transparent: true,
        opacity: opacity * 0.8,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    halo.scale.set(HALO_SIZE, HALO_SIZE, 1);

    const icon = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: getFaviconTexture(b.url),
        transparent: true,
        opacity,
        depthWrite: false,
      }),
    );
    icon.scale.set(ICON_SIZE, ICON_SIZE, 1);
    icon.userData.bookmarkId = b.id;

    const labelDiv = document.createElement('div');
    labelDiv.className = 'star-label';
    labelDiv.textContent = labelText(b);
    const label = new CSS2DObject(labelDiv);
    label.position.set(0, LABEL_OFFSET_Y, 0);

    group.add(halo, icon, label);
    meshGroup.add(group);

    const star: Star = {
      bookmark: b,
      group,
      icon,
      halo,
      label,
      baseOpacity: opacity,
      ringColor,
    };
    stars.set(b.id, star);
    return star;
  }

  function disposeStar(star: Star): void {
    meshGroup.remove(star.group);
    (star.halo.material as THREE.SpriteMaterial).dispose();
    (star.icon.material as THREE.SpriteMaterial).dispose();
    star.group.remove(star.label);
  }

  function clearStars(): void {
    for (const star of stars.values()) disposeStar(star);
    stars.clear();
  }

  function maxRingRadius(): number {
    let r = PLANET_LAYOUT_CONSTANTS.PLANET_RADIUS;
    for (const ring of layout.rings) if (ring.radius > r) r = ring.radius;
    return r;
  }

  function fitCamera(): void {
    const target = new THREE.Vector3(0, 0, 0);
    const radius = maxRingRadius() + 10;
    const fov = camera.fov * (Math.PI / 180);
    const dist = Math.max(radius / Math.sin(fov / 2), 60) * 1.25;
    // Angle: looking from slightly above
    const dir = new THREE.Vector3(0.3, 0.4, 1).normalize();
    camera.position.copy(target).addScaledVector(dir, dist);
    camera.lookAt(target);
    controls.target.copy(target);
    controls.update();
  }

  for (const b of layout.bookmarks) makeStar(b);
  fitCamera();

  function resize(): void {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h || 1;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    labelRenderer.setSize(w, h);
  }
  resize();
  window.addEventListener('resize', resize);
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  let frameCount = 0;
  function updateLabels(): void {
    const camWorld = new THREE.Vector3();
    camera.getWorldPosition(camWorld);
    const tmp = new THREE.Vector3();
    for (const star of stars.values()) {
      star.group.getWorldPosition(tmp);
      const dist = camWorld.distanceTo(tmp);
      let a: number;
      if (dist < LABEL_NEAR) a = 1;
      else if (dist > LABEL_FAR) a = 0;
      else a = 1 - (dist - LABEL_NEAR) / (LABEL_FAR - LABEL_NEAR);
      const effective = a * star.baseOpacity;
      star.label.visible = effective > 0.05;
      if (star.label.visible) {
        star.label.element.style.opacity = String(effective);
      }
    }
  }

  function loop(): void {
    requestAnimationFrame(loop);
    controls.update();
    if (++frameCount % 5 === 0) updateLabels();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  }
  loop();

  function ndcFromClient(clientX: number, clientY: number): THREE.Vector2 {
    const rect = renderer.domElement.getBoundingClientRect();
    return new THREE.Vector2(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1,
    );
  }

  function pick(clientX: number, clientY: number): PickResult | null {
    const ndc = ndcFromClient(clientX, clientY);
    raycaster.setFromCamera(ndc, camera);
    const candidates: THREE.Object3D[] = [];
    for (const star of stars.values()) candidates.push(star.icon);
    const hits = raycaster.intersectObjects(candidates, false);
    if (hits.length === 0) return null;
    const id = hits[0].object.userData.bookmarkId as string | undefined;
    if (!id) return null;
    const star = stars.get(id);
    if (!star) return null;
    return { bookmark: star.bookmark, clientX, clientY };
  }

  renderer.domElement.style.cursor = 'grab';
  renderer.domElement.addEventListener('mousemove', (event) => {
    const hit = pick(event.clientX, event.clientY);
    renderer.domElement.style.cursor = hit ? 'pointer' : 'grab';
  });

  renderer.domElement.addEventListener('click', (event) => {
    const picked = pick(event.clientX, event.clientY);
    if (picked) {
      void chrome.tabs.create({ url: picked.bookmark.url });
    }
  });

  function fadeOutAndRemove(star: Star): void {
    const haloMat = star.halo.material as THREE.SpriteMaterial;
    const iconMat = star.icon.material as THREE.SpriteMaterial;
    const startHalo = haloMat.opacity;
    const startIcon = iconMat.opacity;
    const startScale = star.group.scale.x;
    const t0 = performance.now();
    const dur = 800;
    star.label.visible = false;
    const step = (): void => {
      const t = Math.min(1, (performance.now() - t0) / dur);
      haloMat.opacity = startHalo * (1 - t);
      iconMat.opacity = startIcon * (1 - t);
      const s = startScale * (1 - t);
      star.group.scale.setScalar(s);
      if (t < 1) requestAnimationFrame(step);
      else disposeStar(star);
    };
    step();
  }

  return {
    onActivate(): void {
      resize();
    },
    replaceAll(next): void {
      clearStars();
      layout = next;
      saturnGroup.rotation.x = layout.tilt;
      buildRings();
      for (const b of layout.bookmarks) makeStar(b);
      fitCamera();
    },
    removeBookmark(id): void {
      const star = stars.get(id);
      if (star) {
        stars.delete(id);
        fadeOutAndRemove(star);
      }
    },
    search(query): void {
      const q = query.trim().toLowerCase();
      for (const star of stars.values()) {
        const iconMat = star.icon.material as THREE.SpriteMaterial;
        const haloMat = star.halo.material as THREE.SpriteMaterial;
        if (!q) {
          iconMat.opacity = star.baseOpacity;
          haloMat.opacity = star.baseOpacity * 0.8;
          star.group.scale.setScalar(1);
        } else {
          const hit =
            star.bookmark.title.toLowerCase().includes(q) ||
            star.bookmark.url.toLowerCase().includes(q);
          iconMat.opacity = hit ? 1 : 0.06;
          haloMat.opacity = hit ? 1 : 0;
          star.group.scale.setScalar(hit ? 1.5 : 1);
        }
      }
    },
    pick,
  };
}
