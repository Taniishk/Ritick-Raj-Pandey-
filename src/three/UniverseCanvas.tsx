import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { getSceneMeta, ThreeDioramaMode } from '../data/scenesMeta';
import {
  createButterflyWingGeometry,
  createCastleDiorama,
  createChocolateFountain,
  createContactShadowTexture,
  createFlowerMesh,
  createFurBumpTexture,
  createGiftBox,
  createGoldenCrown,
  createHeartGeometry,
  createHeartPadlockAndKey,
  createTeddyBear,
  TeddyRig,
} from './proceduralAssets';

export interface SceneVisualFlags {
  hugActive?: boolean;
  grumpyMelted?: boolean;
  blushPulse?: number;
  giftOpened?: boolean;
  heartChargeLevel?: number; // 0..1
  unlockProgress?: number; // 0..6
  butterflyHeartFormation?: boolean;
  finalHugBurst?: boolean;
  kissBurstCount?: number;
  lanternLaunchCount?: number;
}

interface UniverseCanvasProps {
  sceneId: number;
  visualFlags: SceneVisualFlags;
}

const BUTTERFLY_COUNT = 72;
const PARTICLE_COUNT = 100;

// Reusable scratch math objects (zero GC allocations inside render loop)
const _dummy = new THREE.Object3D();
const _vec3 = new THREE.Vector3();
const _targetColor = new THREE.Color();

function detectSoftwareGl(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export function UniverseCanvas({ sceneId, visualFlags }: UniverseCanvasProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneIdRef = useRef(sceneId);
  const flagsRef = useRef<SceneVisualFlags>(visualFlags);
  const pointerRef = useRef({ x: 0, y: 0 });
  const rebuildDioramaRef = useRef<((mode: ThreeDioramaMode) => void) | null>(null);

  sceneIdRef.current = sceneId;
  flagsRef.current = visualFlags;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareGl();

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(container.clientWidth || window.innerWidth, container.clientHeight || window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    const scene = new THREE.Scene();
    const initialMeta = getSceneMeta(sceneIdRef.current);
    scene.fog = new THREE.FogExp2(initialMeta.fogHex, 0.045);

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    const camera = new THREE.PerspectiveCamera(
      48,
      (container.clientWidth || window.innerWidth) / (container.clientHeight || window.innerHeight),
      0.1,
      100,
    );
    camera.position.set(0, 1.85, 7.6);
    camera.lookAt(0, 1.15, 0);

    // 3-point warm/cool lighting rig
    const hemiLight = new THREE.HemisphereLight(
      initialMeta.hemiSkyHex,
      initialMeta.hemiGroundHex,
      0.85,
    );
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(initialMeta.keyLightHex, 1.65);
    keyLight.position.set(4.5, 7.5, 5.5);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 24;
    keyLight.shadow.camera.left = -6;
    keyLight.shadow.camera.right = 6;
    keyLight.shadow.camera.top = 6;
    keyLight.shadow.camera.bottom = -6;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xff99d6, 0.9);
    rimLight.position.set(-4.5, 4.0, -4.5);
    scene.add(rimLight);

    // Shared procedural textures
    const furBumpTex = createFurBumpTexture();
    const shadowTex = createContactShadowTexture();
    const contactShadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.55,
    });
    const contactShadowGeo = new THREE.CircleGeometry(1.4, 24);

    // Instanced Butterflies
    const butterflyGeo = createButterflyWingGeometry();
    const butterflyMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.35,
      metalness: 0.15,
      side: THREE.DoubleSide,
    });
    const butterflyMesh = new THREE.InstancedMesh(butterflyGeo, butterflyMat, BUTTERFLY_COUNT);
    butterflyMesh.frustumCulled = false;
    const bPalette = [0xff7eb6, 0xf472b6, 0xc084fc, 0xfbbf24, 0x7dd3fc, 0xfb7185];
    const bSeeds = Array.from({ length: BUTTERFLY_COUNT }, (_, i) => ({
      phase: (i / BUTTERFLY_COUNT) * Math.PI * 2,
      speed: 0.7 + (i % 5) * 0.18,
      radius: 2.3 + (i % 7) * 0.48,
      heightOffset: -0.2 + ((i * 13) % 10) * 0.32,
      scale: 0.16 + (i % 4) * 0.045,
      heartT: (i / BUTTERFLY_COUNT) * Math.PI * 2,
    }));
    for (let i = 0; i < BUTTERFLY_COUNT; i += 1) {
      _targetColor.setHex(bPalette[i % bPalette.length]);
      butterflyMesh.setColorAt(i, _targetColor);
    }
    if (butterflyMesh.instanceColor) butterflyMesh.instanceColor.needsUpdate = true;
    scene.add(butterflyMesh);

    // Instanced Hearts / Sparkles
    const heartParticleGeo = createHeartGeometry(0.18, 0.08);
    const heartParticleMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.25,
      metalness: 0.1,
      clearcoat: 0.9,
      emissive: 0x6b0f3b,
      emissiveIntensity: 0.35,
    });
    const particleMesh = new THREE.InstancedMesh(heartParticleGeo, heartParticleMat, PARTICLE_COUNT);
    particleMesh.frustumCulled = false;
    const pPalette = [0xff4d94, 0xf43f5e, 0xfbbf24, 0xc084fc, 0xffe4e6];
    const pSeeds = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      x: ((i * 37) % 100) / 10 - 5,
      y: ((i * 19) % 70) / 10 - 1.5,
      z: ((i * 29) % 60) / 10 - 3.5,
      speed: 0.35 + (i % 6) * 0.12,
      phase: i * 0.61,
      scale: 0.45 + (i % 5) * 0.18,
    }));
    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      _targetColor.setHex(pPalette[i % pPalette.length]);
      particleMesh.setColorAt(i, _targetColor);
    }
    if (particleMesh.instanceColor) particleMesh.instanceColor.needsUpdate = true;
    scene.add(particleMesh);

    // Diorama root & dynamic handles
    const dioramaRoot = new THREE.Group();
    scene.add(dioramaRoot);

    interface ActiveHandles {
      mode: ThreeDioramaMode;
      teddies: TeddyRig[];
      heroHeart?: THREE.Mesh;
      crown?: THREE.Group;
      giftLid?: THREE.Group;
      giftTeddy?: TeddyRig;
      lockKey?: THREE.Group;
      discoBall?: THREE.Mesh;
      flowers: THREE.Group[];
      balloons: THREE.Group[];
      starsGroup?: THREE.Group;
      floatingRings: THREE.Mesh[];
    }

    let handles: ActiveHandles = {
      mode: initialMeta.dioramaMode,
      teddies: [],
      flowers: [],
      balloons: [],
      floatingRings: [],
    };

    const addShadowDisc = (x: number, z: number, scale = 1) => {
      const disc = new THREE.Mesh(contactShadowGeo, contactShadowMat);
      disc.rotation.x = -Math.PI / 2;
      disc.position.set(x, -0.02, z);
      disc.scale.setScalar(scale);
      dioramaRoot.add(disc);
    };

    const buildDiorama = (mode: ThreeDioramaMode) => {
      // Clear previous diorama children (keep shared furBumpTex & shadowTex alive)
      while (dioramaRoot.children.length > 0) {
        const child = dioramaRoot.children[0];
        dioramaRoot.remove(child);
      }

      handles = {
        mode,
        teddies: [],
        flowers: [],
        balloons: [],
        floatingRings: [],
      };

      const addHeroTeddy = (
        x: number,
        y: number,
        z: number,
        opts: Parameters<typeof createTeddyBear>[0] = {},
      ) => {
        const rig = createTeddyBear({ ...opts, furBumpTexture: furBumpTex });
        rig.group.position.set(x, y, z);
        dioramaRoot.add(rig.group);
        addShadowDisc(x, z, (opts.scale ?? 1) * 0.9);
        handles.teddies.push(rig);
        return rig;
      };

      switch (mode) {
        case 'entrance': {
          addHeroTeddy(0, -0.05, 0.2, {
            scale: 1.18,
            pose: 'wave',
            accessory: 'heartBalloon',
          });
          [-2.1, -1.3, 1.4, 2.2].forEach((x, idx) => {
            const fl = createFlowerMesh(idx % 2 === 0 ? 0xf43f5e : 0xf472b6, 0.85);
            fl.position.set(x, -0.1, -0.5 + (idx % 2) * 0.4);
            dioramaRoot.add(fl);
            handles.flowers.push(fl);
          });
          break;
        }
        case 'apology': {
          addHeroTeddy(0, -0.1, 0.1, {
            scale: 1.05,
            pose: 'normal',
            accessory: 'apologyLetter',
            furColor: 0xe6b89c,
          });
          const rose1 = createFlowerMesh(0xe11d48, 0.72);
          rose1.position.set(-1.55, -0.1, 0.25);
          const rose2 = createFlowerMesh(0xf472b6, 0.65);
          rose2.position.set(1.55, -0.1, 0.25);
          dioramaRoot.add(rose1, rose2);
          handles.flowers.push(rose1, rose2);
          break;
        }
        case 'grumpy': {
          addHeroTeddy(-1.25, -0.1, 0.1, {
            scale: 0.92,
            pose: 'grumpy',
            accessory: 'grumpyCloud',
            furColor: 0xf1bfa2,
          });
          addHeroTeddy(1.25, -0.1, 0.1, {
            scale: 0.96,
            pose: 'normal',
            accessory: 'giftAndChocolates',
            furColor: 0xd99e7d,
          });
          break;
        }
        case 'giant_hug': {
          addHeroTeddy(0, -0.2, 0.1, {
            scale: 1.25,
            pose: 'openArms',
            accessory: 'none',
            furColor: 0xf5cbb1,
          });
          break;
        }
        case 'butterfly_garden':
        case 'dream_garden': {
          const centerFlower = createFlowerMesh(mode === 'dream_garden' ? 0x10b981 : 0xec4899, 0.95);
          centerFlower.position.set(-1.6, -0.1, -0.3);
          const rightFlower = createFlowerMesh(0xa855f7, 0.95);
          rightFlower.position.set(1.6, -0.1, -0.3);
          dioramaRoot.add(centerFlower, rightFlower);
          handles.flowers.push(centerFlower, rightFlower);
          addHeroTeddy(0, -0.1, -0.4, { scale: 0.85, pose: 'wave', accessory: 'rose' });
          break;
        }
        case 'floating_hearts':
        case 'heart_explosion': {
          const heartMat = new THREE.MeshPhysicalMaterial({
            color: 0xf43f5e,
            emissive: 0xbe185d,
            emissiveIntensity: 0.45,
            roughness: 0.18,
            clearcoat: 1.0,
          });
          const heroHeart = new THREE.Mesh(createHeartGeometry(1.25, 0.48), heartMat);
          heroHeart.position.set(0, 1.35, 0);
          dioramaRoot.add(heroHeart);
          handles.heroHeart = heroHeart;
          break;
        }
        case 'princess_castle': {
          const castle = createCastleDiorama();
          castle.position.set(0, -0.1, -0.8);
          dioramaRoot.add(castle);
          const crown = createGoldenCrown(0.95);
          crown.position.set(0, 3.35, 0.5);
          dioramaRoot.add(crown);
          handles.crown = crown;
          addHeroTeddy(-1.7, -0.1, 0.6, { scale: 0.7, pose: 'wave', accessory: 'crown' });
          break;
        }
        case 'chocolate_world': {
          const fountain = createChocolateFountain();
          fountain.position.set(-0.9, -0.1, 0);
          dioramaRoot.add(fountain);
          addHeroTeddy(1.15, -0.1, 0.25, {
            scale: 0.92,
            pose: 'wave',
            accessory: 'chefHat',
            furColor: 0xd99b72,
          });
          break;
        }
        case 'rose_sky':
        case 'flower_shop': {
          const colors = [0xe11d48, 0xf472b6, 0xfbbf24, 0xc084fc, 0xfb7185];
          for (let i = 0; i < 5; i += 1) {
            const fl = createFlowerMesh(colors[i], 0.9 + (i === 2 ? 0.25 : 0));
            const angle = (i - 2) * 0.48;
            fl.position.set(Math.sin(angle) * 1.9, -0.1, -0.4 + Math.cos(angle) * 0.4);
            fl.rotation.z = -angle * 0.25;
            dioramaRoot.add(fl);
            handles.flowers.push(fl);
          }
          break;
        }
        case 'blushing_machine': {
          addHeroTeddy(-1.25, -0.1, 0, { scale: 0.78, pose: 'wave', blushColor: 0xff2e79 });
          addHeroTeddy(1.25, -0.1, 0, { scale: 0.78, pose: 'wave', blushColor: 0xff2e79 });
          const centerHeart = new THREE.Mesh(
            createHeartGeometry(0.95, 0.35),
            new THREE.MeshPhysicalMaterial({
              color: 0xff3d85,
              emissive: 0xe11d48,
              emissiveIntensity: 0.35,
              roughness: 0.2,
              clearcoat: 1,
            }),
          );
          centerHeart.position.set(0, 1.35, 0.2);
          dioramaRoot.add(centerHeart);
          handles.heroHeart = centerHeart;
          break;
        }
        case 'eye_galaxy':
        case 'star_constellation':
        case 'moonlight_balcony': {
          const starsGroup = new THREE.Group();
          const starMat = new THREE.MeshStandardMaterial({
            color: 0xfef08a,
            emissive: 0xfbbf24,
            emissiveIntensity: 0.85,
            roughness: 0.25,
          });
          for (let i = 0; i < 18; i += 1) {
            const t = (i / 18) * Math.PI * 2;
            const hx = 16 * Math.pow(Math.sin(t), 3) * 0.14;
            const hy =
              (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) *
              0.14;
            const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.11, 0), starMat);
            star.position.set(hx, 1.45 + hy, -0.5);
            starsGroup.add(star);
          }
          // Crescent / Full Moon
          const moon = new THREE.Mesh(
            new THREE.SphereGeometry(0.65, 24, 20),
            new THREE.MeshStandardMaterial({
              color: 0xfef3c7,
              emissive: 0xfde68a,
              emissiveIntensity: 0.55,
              roughness: 0.5,
            }),
          );
          moon.position.set(-2.9, 3.15, -2.2);
          starsGroup.add(moon);
          dioramaRoot.add(starsGroup);
          handles.starsGroup = starsGroup;
          break;
        }
        case 'forehead_kisses': {
          addHeroTeddy(0, -0.1, 0.1, {
            scale: 1.05,
            pose: 'kiss',
            accessory: 'none',
            furColor: 0xf5c9af,
          });
          break;
        }
        case 'cloud_nine': {
          const cloudMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.85 });
          [
            [-1.8, 0.1, -0.4],
            [0, -0.15, 0],
            [1.8, 0.2, -0.5],
          ].forEach(([cx, cy, cz]) => {
            const cg = new THREE.Group();
            cg.position.set(cx, cy, cz);
            [
              [-0.4, 0, 0, 0.42],
              [0, 0.14, 0, 0.54],
              [0.42, 0, 0, 0.4],
            ].forEach(([px, py, pz, r]) => {
              const s = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 12), cloudMat);
              s.position.set(px, py, pz);
              cg.add(s);
            });
            dioramaRoot.add(cg);
          });
          addHeroTeddy(0, 0.35, 0.1, { scale: 0.9, pose: 'wave', accessory: 'heartBalloon' });
          break;
        }
        case 'love_cafe': {
          addHeroTeddy(-1.0, -0.1, 0.1, {
            scale: 0.85,
            pose: 'seated',
            furColor: 0xf2c2a7,
          });
          addHeroTeddy(1.0, -0.1, 0.1, {
            scale: 0.85,
            pose: 'seated',
            furColor: 0xdba07e,
          });
          const tableTop = new THREE.Mesh(
            new THREE.CylinderGeometry(0.8, 0.8, 0.08, 24),
            new THREE.MeshStandardMaterial({ color: 0xfff5f8, roughness: 0.35 }),
          );
          tableTop.position.set(0, 0.72, 0.45);
          const leg = new THREE.Mesh(
            new THREE.CylinderGeometry(0.08, 0.12, 0.82, 12),
            new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.75, roughness: 0.25 }),
          );
          leg.position.set(0, 0.31, 0.45);
          const cupMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.25 });
          [-0.26, 0.26].forEach((mx) => {
            const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.09, 0.18, 14), cupMat);
            mug.position.set(mx, 0.85, 0.45);
            dioramaRoot.add(mug);
          });
          dioramaRoot.add(tableTop, leg);
          break;
        }
        case 'museum':
        case 'letter_room':
        case 'deep_letter':
        case 'safe_place': {
          addHeroTeddy(0, -0.1, 0.1, {
            scale: 0.98,
            pose: mode === 'safe_place' ? 'openArms' : 'normal',
            accessory: mode === 'safe_place' ? 'none' : 'apologyLetter',
            furColor: 0xf4c7ab,
          });
          const ringMat = new THREE.MeshStandardMaterial({
            color: 0xfbbf24,
            metalness: 0.85,
            roughness: 0.2,
          });
          const ring = new THREE.Mesh(new THREE.TorusGeometry(1.65, 0.03, 10, 48), ringMat);
          ring.position.set(0, 1.35, -0.35);
          dioramaRoot.add(ring);
          handles.floatingRings.push(ring);
          break;
        }
        case 'pearl_celestial': {
          const pearlMat = new THREE.MeshPhysicalMaterial({
            color: 0xfff5fb,
            roughness: 0.12,
            metalness: 0.15,
            clearcoat: 1.0,
            iridescence: 0.85,
          });
          for (let i = 0; i < 10; i += 1) {
            const angle = (i / 10) * Math.PI * 2;
            const pearl = new THREE.Mesh(new THREE.SphereGeometry(0.22, 18, 16), pearlMat);
            pearl.position.set(Math.cos(angle) * 2.0, 1.35 + Math.sin(angle * 2) * 0.45, Math.sin(angle) * 1.2);
            dioramaRoot.add(pearl);
          }
          const heart = new THREE.Mesh(
            createHeartGeometry(0.85, 0.35),
            new THREE.MeshPhysicalMaterial({ color: 0xf472b6, roughness: 0.18, clearcoat: 1 }),
          );
          heart.position.set(0, 1.35, 0);
          dioramaRoot.add(heart);
          handles.heroHeart = heart;
          break;
        }
        case 'dance_party': {
          const discoMat = new THREE.MeshStandardMaterial({
            color: 0xf8fafc,
            metalness: 0.95,
            roughness: 0.1,
            flatShading: true,
          });
          const discoBall = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 1), discoMat);
          discoBall.position.set(0, 2.85, 0);
          dioramaRoot.add(discoBall);
          handles.discoBall = discoBall;

          addHeroTeddy(-1.35, -0.1, 0.15, {
            scale: 0.82,
            pose: 'dance',
            accessory: 'discoGlasses',
            furColor: 0xf4c7ab,
          });
          addHeroTeddy(0, -0.1, -0.25, {
            scale: 0.9,
            pose: 'dance',
            accessory: 'discoGlasses',
            furColor: 0xe2a888,
          });
          addHeroTeddy(1.35, -0.1, 0.15, {
            scale: 0.82,
            pose: 'dance',
            accessory: 'discoGlasses',
            furColor: 0xf7d6bf,
          });
          break;
        }
        case 'flirty_game': {
          addHeroTeddy(-1.35, -0.1, 0.1, { scale: 0.85, pose: 'kiss', furColor: 0xf4c7ab });
          addHeroTeddy(1.35, -0.1, 0.1, { scale: 0.85, pose: 'wave', accessory: 'rose', furColor: 0xe6b192 });
          break;
        }
        case 'heart_lock': {
          const { lockGroup, keyGroup } = createHeartPadlockAndKey();
          dioramaRoot.add(lockGroup, keyGroup);
          handles.lockKey = keyGroup;
          break;
        }
        case 'teddy_army': {
          const armyColors = [0xf4c7ab, 0xe2a684, 0xf7d8c4, 0xd8936c, 0xffd1dc];
          for (let i = 0; i < 6; i += 1) {
            const angle = (i / 6) * Math.PI * 2;
            const acc = (['rose', 'heartBalloon', 'apologyLetter', 'giftAndChocolates'] as const)[
              i % 4
            ];
            addHeroTeddy(Math.cos(angle) * 2.0, -0.1, Math.sin(angle) * 1.4, {
              scale: 0.62,
              pose: 'wave',
              accessory: acc,
              furColor: armyColors[i % armyColors.length],
            });
          }
          break;
        }
        case 'surprise_gift': {
          const { group: giftGroup, lid } = createGiftBox();
          giftGroup.position.set(0, -0.2, 0);
          dioramaRoot.add(giftGroup);
          addShadowDisc(0, 0, 1.3);
          handles.giftLid = lid;

          const surpriseBear = createTeddyBear({
            scale: 0.82,
            pose: 'openArms',
            accessory: 'crown',
            furBumpTexture: furBumpTex,
          });
          surpriseBear.group.position.set(0, 0.1, 0);
          surpriseBear.group.scale.setScalar(0.01);
          dioramaRoot.add(surpriseBear.group);
          handles.giftTeddy = surpriseBear;
          break;
        }
        case 'final_universe': {
          const heartMat = new THREE.MeshPhysicalMaterial({
            color: 0xff2e79,
            emissive: 0xdb2777,
            emissiveIntensity: 0.55,
            roughness: 0.16,
            clearcoat: 1.0,
          });
          const bigHeart = new THREE.Mesh(createHeartGeometry(1.15, 0.45), heartMat);
          bigHeart.position.set(0, 2.55, -0.5);
          dioramaRoot.add(bigHeart);
          handles.heroHeart = bigHeart;

          addHeroTeddy(-2.35, -0.05, 0.35, {
            scale: 0.85,
            pose: 'openArms',
            accessory: 'heartBalloon',
          });
          addHeroTeddy(2.35, -0.05, 0.35, {
            scale: 0.85,
            pose: 'openArms',
            accessory: 'rose',
            furColor: 0xc98860,
          });

          const ring = new THREE.Mesh(
            new THREE.TorusGeometry(2.35, 0.035, 10, 64),
            new THREE.MeshStandardMaterial({ color: 0xfde68a, metalness: 0.85, roughness: 0.2 }),
          );
          ring.position.set(0, 2.55, -0.5);
          ring.rotation.x = Math.PI / 3;
          dioramaRoot.add(ring);
          handles.floatingRings.push(ring);
          break;
        }
      }
    };

    rebuildDioramaRef.current = buildDiorama;
    buildDiorama(initialMeta.dioramaMode);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const handlePointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      pointerRef.current.x = nx;
      pointerRef.current.y = ny;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.render(scene, camera);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop with Software-WebGL afterDraw pacing + rAF compositor sync
    let lastTimeMs = performance.now();
    const startTimeMs = lastTimeMs;
    let frameId = 0;
    let timerId = 0;
    let disposed = false;

    const afterDraw = (cb: () => void) => {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0) : null;
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          timerId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          timerId = window.setTimeout(cb, 80);
        }
      };
      timerId = window.setTimeout(poll, 5);
    };

    // Smooth interpolated camera & scene variables
    let currentCamZ = 7.2;
    let currentCamY = 1.95;
    let heartMorphAlpha = 0;
    let giftOpenAlpha = 0;

    let frameCount = 0;
    const tick = () => {
      if (disposed) return;
      frameCount += 1;
      const nowMs = performance.now();
      const dt = Math.min((nowMs - lastTimeMs) / 1000, 0.08);
      lastTimeMs = nowMs;
      const elapsed = (nowMs - startTimeMs) / 1000;
      const meta = getSceneMeta(sceneIdRef.current);
      const flags = flagsRef.current;

      // Smooth sky fog & lighting transition
      _targetColor.setHex(meta.fogHex);
      if (scene.fog instanceof THREE.FogExp2) {
        scene.fog.color.lerp(_targetColor, 1 - Math.exp(-3 * dt));
      }
      _targetColor.setHex(meta.keyLightHex);
      keyLight.color.lerp(_targetColor, 1 - Math.exp(-3 * dt));

      // Camera parallax + hug zoom
      const targetZ = flags.hugActive || flags.finalHugBurst ? 4.9 : 7.2;
      const targetY = flags.hugActive || flags.finalHugBurst ? 1.65 : 1.95;
      currentCamZ = THREE.MathUtils.damp(currentCamZ, targetZ, 4.5, dt);
      currentCamY = THREE.MathUtils.damp(currentCamY, targetY, 4.5, dt);

      const px = pointerRef.current.x * 0.45;
      const py = pointerRef.current.y * 0.25;
      camera.position.x = THREE.MathUtils.damp(camera.position.x, px, 4, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, currentCamY - py, 4, dt);
      camera.position.z = currentCamZ;
      camera.lookAt(0, 1.2, 0);

      // Butterfly Animation (natural flight OR giant heart formation around Sonyyy!)
      const wantHeartForm =
        Boolean(flags.butterflyHeartFormation) ||
        meta.dioramaMode === 'butterfly_garden' ||
        meta.dioramaMode === 'final_universe';
      heartMorphAlpha = THREE.MathUtils.damp(heartMorphAlpha, wantHeartForm ? 1 : 0, 1.8, dt);

      for (let i = 0; i < BUTTERFLY_COUNT; i += 1) {
        const seed = bSeeds[i];
        const t = elapsed * seed.speed + seed.phase;

        const freeX = Math.cos(t * 0.7) * seed.radius + Math.sin(t * 1.3) * 0.5;
        const freeY = 1.6 + seed.heightOffset + Math.sin(t * 1.4) * 0.65;
        const freeZ = Math.sin(t * 0.7) * (seed.radius * 0.65) - 0.5;

        const ht = seed.heartT + elapsed * 0.14;
        const hx = 16 * Math.pow(Math.sin(ht), 3) * 0.155;
        const hy =
          1.7 +
          (13 * Math.cos(ht) - 5 * Math.cos(2 * ht) - 2 * Math.cos(3 * ht) - Math.cos(4 * ht)) *
            0.155;
        const hz = Math.sin(t * 2.0) * 0.25 - 0.3;

        _vec3.set(
          THREE.MathUtils.lerp(freeX, hx, heartMorphAlpha),
          THREE.MathUtils.lerp(freeY, hy, heartMorphAlpha),
          THREE.MathUtils.lerp(freeZ, hz, heartMorphAlpha),
        );

        _dummy.position.copy(_vec3);
        const flap = 0.4 + Math.abs(Math.sin(elapsed * 8.5 + seed.phase)) * 0.75;
        _dummy.rotation.set(0.35 + Math.sin(t) * 0.2, -t + Math.PI / 2, Math.cos(t) * 0.15);
        _dummy.scale.set(seed.scale * flap, seed.scale, seed.scale);
        _dummy.updateMatrix();
        butterflyMesh.setMatrixAt(i, _dummy.matrix);
      }
      butterflyMesh.instanceMatrix.needsUpdate = true;

      // Heart / Sparkle Particles
      const burstBoost =
        flags.hugActive || flags.finalHugBurst || (flags.heartChargeLevel ?? 0) > 0.7 ? 1.45 : 1.0;
      for (let i = 0; i < PARTICLE_COUNT; i += 1) {
        const ps = pSeeds[i];
        const rise = ((ps.y + elapsed * ps.speed * burstBoost + 3) % 7.2) - 1.5;
        _dummy.position.set(
          ps.x + Math.sin(elapsed * 1.2 + ps.phase) * 0.35,
          rise,
          ps.z + Math.cos(elapsed * 0.9 + ps.phase) * 0.3,
        );
        _dummy.rotation.set(0, elapsed * 0.9 + ps.phase, Math.sin(elapsed + ps.phase) * 0.25);
        const s = ps.scale * (flags.finalHugBurst ? 1.35 : 1.0);
        _dummy.scale.setScalar(s);
        _dummy.updateMatrix();
        particleMesh.setMatrixAt(i, _dummy.matrix);
      }
      particleMesh.instanceMatrix.needsUpdate = true;

      // Animate active diorama props & teddies
      handles.teddies.forEach((rig, idx) => {
        const sway = Math.sin(elapsed * 2.1 + idx) * 0.05;
        rig.head.rotation.z = sway;
        rig.head.rotation.y = Math.sin(elapsed * 1.1 + idx) * 0.12;

        if (handles.mode === 'dance_party') {
          rig.group.position.y = -0.1 + Math.abs(Math.sin(elapsed * 6.5 + idx)) * 0.24;
          rig.group.rotation.y = Math.sin(elapsed * 3.2 + idx) * 0.45;
          rig.leftArm.rotation.z = -0.5 + Math.sin(elapsed * 8 + idx) * 0.55;
          rig.rightArm.rotation.z = 0.5 - Math.sin(elapsed * 8 + idx) * 0.55;
        } else if (handles.mode === 'giant_hug' || handles.mode === 'final_universe') {
          const hugShift = flags.hugActive || flags.finalHugBurst ? 1.25 : 0;
          rig.group.position.z = THREE.MathUtils.damp(rig.group.position.z, 0.1 + hugShift, 5, dt);
          rig.leftArm.rotation.z = THREE.MathUtils.damp(
            rig.leftArm.rotation.z,
            flags.hugActive || flags.finalHugBurst ? 0.35 : -0.55,
            5,
            dt,
          );
          rig.rightArm.rotation.z = THREE.MathUtils.damp(
            rig.rightArm.rotation.z,
            flags.hugActive || flags.finalHugBurst ? -0.35 : 0.55,
            5,
            dt,
          );
        } else if (handles.mode === 'grumpy' && idx === 0 && flags.grumpyMelted) {
          rig.leftArm.rotation.set(-0.2, 0, -0.3);
          rig.rightArm.rotation.set(-0.2, 0, 0.3);
          if (rig.angryCloud) {
            rig.angryCloud.scale.setScalar(
              THREE.MathUtils.damp(rig.angryCloud.scale.x, 0.001, 5, dt),
            );
          }
        } else if (handles.mode === 'teddy_army') {
          rig.group.position.y = -0.1 + Math.abs(Math.sin(elapsed * 4.5 + idx * 0.8)) * 0.15;
          rig.group.rotation.y = Math.sin(elapsed * 1.5 + idx) * 0.35;
        } else {
          rig.rightArm.rotation.z =
            (handles.mode === 'entrance' ? 1.8 : 0.35) + Math.sin(elapsed * 3.2 + idx) * 0.15;
        }
      });

      if (handles.heroHeart) {
        handles.heroHeart.rotation.y = elapsed * 0.65;
        const charge = flags.heartChargeLevel ?? 0;
        const pulse = 1 + Math.sin(elapsed * 3.2) * 0.06 + charge * 0.85;
        handles.heroHeart.scale.setScalar(pulse);
      }

      if (handles.crown) {
        handles.crown.rotation.y = elapsed * 0.85;
        handles.crown.position.y = 3.35 + Math.sin(elapsed * 2.2) * 0.1;
      }

      if (handles.discoBall) {
        handles.discoBall.rotation.y = elapsed * 1.4;
      }

      if (handles.giftLid && handles.giftTeddy) {
        giftOpenAlpha = THREE.MathUtils.damp(giftOpenAlpha, flags.giftOpened ? 1 : 0, 3.5, dt);
        handles.giftLid.rotation.x = -giftOpenAlpha * 1.75;
        handles.giftTeddy.group.position.y = THREE.MathUtils.lerp(0.1, 1.35, giftOpenAlpha);
        const s = THREE.MathUtils.lerp(0.01, 0.85, giftOpenAlpha);
        handles.giftTeddy.group.scale.setScalar(s);
      }

      if (handles.lockKey) {
        const unlockRatio = Math.min(1, (flags.unlockProgress ?? 0) / 6);
        handles.lockKey.position.x = THREE.MathUtils.damp(
          handles.lockKey.position.x,
          THREE.MathUtils.lerp(1.6, 0.15, unlockRatio),
          4,
          dt,
        );
        handles.lockKey.rotation.x = unlockRatio * Math.PI;
      }

      if (handles.starsGroup) {
        handles.starsGroup.rotation.y = Math.sin(elapsed * 0.35) * 0.18;
      }

      handles.flowers.forEach((fl, i) => {
        fl.rotation.z = Math.sin(elapsed * 1.4 + i) * 0.06;
      });

      handles.floatingRings.forEach((ring, i) => {
        ring.rotation.z = elapsed * 0.35 * (i % 2 === 0 ? 1 : -1);
      });

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(() => {
          if (!disposed) frameId = requestAnimationFrame(tick);
        });
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(timerId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      furBumpTex.dispose();
      shadowTex.dispose();
      contactShadowGeo.dispose();
      contactShadowMat.dispose();
      butterflyGeo.dispose();
      butterflyMat.dispose();
      heartParticleGeo.dispose();
      heartParticleMat.dispose();
      renderer.dispose();
    };
  }, []);

  // Rebuild 3D diorama smoothly whenever sceneId changes (without tearing down WebGLRenderer)
  useEffect(() => {
    const meta = getSceneMeta(sceneId);
    rebuildDioramaRef.current?.(meta.dioramaMode);
  }, [sceneId]);

  return (
    <div
      ref={mountRef}
      data-testid="universe-3d-canvas"
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
