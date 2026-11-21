import * as THREE from 'three';

export interface TeddyOptions {
  furColor?: number;
  bellyColor?: number;
  blushColor?: number;
  scale?: number;
  pose?: 'normal' | 'openArms' | 'grumpy' | 'wave' | 'dance' | 'kiss' | 'seated';
  accessory?:
    | 'none'
    | 'heartBalloon'
    | 'apologyLetter'
    | 'grumpyCloud'
    | 'giftAndChocolates'
    | 'crown'
    | 'chefHat'
    | 'rose'
    | 'discoGlasses'
    | 'cup';
  furBumpTexture?: THREE.CanvasTexture;
}

export interface TeddyRig {
  group: THREE.Group;
  head: THREE.Group;
  leftArm: THREE.Group;
  rightArm: THREE.Group;
  leftLeg: THREE.Group;
  rightLeg: THREE.Group;
  blushLeft: THREE.Mesh;
  blushRight: THREE.Mesh;
  angryCloud?: THREE.Group;
  accessoryGroup?: THREE.Group;
}

export function createFurBumpTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 2400; i += 1) {
      const x = Math.random() * 128;
      const y = Math.random() * 128;
      const v = 90 + Math.floor(Math.random() * 110);
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(x, y, 2, 2);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  return tex;
}

export function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(64, 64, 6, 64, 64, 60);
    grad.addColorStop(0, 'rgba(55, 10, 35, 0.45)');
    grad.addColorStop(0.55, 'rgba(55, 10, 35, 0.16)');
    grad.addColorStop(1, 'rgba(55, 10, 35, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createHeartGeometry(scale = 1, depth = 0.28): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.35 * scale);
  shape.bezierCurveTo(0, 0.65 * scale, -0.5 * scale, 0.72 * scale, -0.62 * scale, 0.32 * scale);
  shape.bezierCurveTo(-0.74 * scale, -0.08 * scale, -0.22 * scale, -0.46 * scale, 0, -0.72 * scale);
  shape.bezierCurveTo(0.22 * scale, -0.46 * scale, 0.74 * scale, -0.08 * scale, 0.62 * scale, 0.32 * scale);
  shape.bezierCurveTo(0.5 * scale, 0.72 * scale, 0, 0.65 * scale, 0, 0.35 * scale);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: depth * scale,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.08 * scale,
    bevelThickness: 0.08 * scale,
  });
  geo.center();
  return geo;
}

export function createButterflyWingGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  // Two-wing symmetric silhouette in XY plane, with inner crease along X=0
  // Built as single wing half so we can flap or use full butterfly
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.28, 0.45, 0.72, 0.48, 0.66, 0.12);
  shape.bezierCurveTo(0.62, -0.08, 0.34, -0.1, 0.18, -0.06);
  shape.bezierCurveTo(0.45, -0.14, 0.48, -0.45, 0.18, -0.42);
  shape.bezierCurveTo(0.05, -0.4, 0.02, -0.18, 0, 0);

  const rightWing = new THREE.ShapeGeometry(shape, 8);
  const leftWing = rightWing.clone();
  leftWing.scale(-1, 1, 1);

  // Merge both wings into a single lightweight BufferGeometry with tilted V shape
  const rPos = rightWing.attributes.position;
  const lPos = leftWing.attributes.position;
  const rIdx = rightWing.index;
  const lIdx = leftWing.index;

  const totalVerts = rPos.count + lPos.count;
  const positions = new Float32Array(totalVerts * 3);
  for (let i = 0; i < rPos.count; i += 1) {
    const x = rPos.getX(i);
    const y = rPos.getY(i);
    positions[i * 3] = x * 0.9;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = Math.abs(x) * 0.32;
  }
  const offset = rPos.count;
  for (let i = 0; i < lPos.count; i += 1) {
    const x = lPos.getX(i);
    const y = lPos.getY(i);
    positions[(offset + i) * 3] = x * 0.9;
    positions[(offset + i) * 3 + 1] = y;
    positions[(offset + i) * 3 + 2] = Math.abs(x) * 0.32;
  }

  const indices: number[] = [];
  if (rIdx) {
    for (let i = 0; i < rIdx.count; i += 1) indices.push(rIdx.getX(i));
  }
  if (lIdx) {
    for (let i = 0; i < lIdx.count; i += 1) indices.push(lIdx.getX(i) + offset);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  rightWing.dispose();
  leftWing.dispose();
  return geo;
}

export function createTeddyBear(options: TeddyOptions = {}): TeddyRig {
  const {
    furColor = 0xd89b72,
    bellyColor = 0xffe8d6,
    blushColor = 0xff6b9d,
    scale = 1,
    pose = 'normal',
    accessory = 'none',
    furBumpTexture,
  } = options;

  const group = new THREE.Group();
  group.scale.setScalar(scale);

  const furMat = new THREE.MeshStandardMaterial({
    color: furColor,
    roughness: 0.88,
    metalness: 0.02,
    bumpMap: furBumpTexture ?? null,
    bumpScale: furBumpTexture ? 0.03 : 0,
  });

  const bellyMat = new THREE.MeshStandardMaterial({
    color: bellyColor,
    roughness: 0.82,
    metalness: 0.02,
  });

  const darkEyeMat = new THREE.MeshPhysicalMaterial({
    color: 0x1a0b12,
    roughness: 0.12,
    metalness: 0.1,
    clearcoat: 1.0,
  });

  const noseMat = new THREE.MeshStandardMaterial({
    color: 0x4a1d28,
    roughness: 0.35,
    metalness: 0.05,
  });

  const blushMat = new THREE.MeshStandardMaterial({
    color: blushColor,
    roughness: 0.7,
    emissive: blushColor,
    emissiveIntensity: 0.25,
  });

  const heartBadgeMat = new THREE.MeshPhysicalMaterial({
    color: 0xf43f5e,
    roughness: 0.25,
    metalness: 0.1,
    clearcoat: 0.8,
  });

  // 1. Torso (primary silhouette)
  const torso = new THREE.Mesh(new THREE.SphereGeometry(0.72, 24, 20), furMat);
  torso.scale.set(1, 1.15, 0.92);
  torso.position.set(0, 0.95, 0);
  torso.castShadow = true;
  group.add(torso);

  // Belly patch + heart emblem
  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.52, 20, 16), bellyMat);
  belly.scale.set(0.92, 1.08, 0.45);
  belly.position.set(0, 0.92, 0.46);
  group.add(belly);

  const chestHeart = new THREE.Mesh(createHeartGeometry(0.22, 0.14), heartBadgeMat);
  chestHeart.position.set(0, 1.08, 0.67);
  group.add(chestHeart);

  // Cute Ribbon Bowtie
  const bowMat = new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.4, metalness: 0.15 });
  const bowLeft = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.24, 12), bowMat);
  bowLeft.rotation.z = -Math.PI / 2;
  bowLeft.position.set(-0.14, 1.5, 0.56);
  const bowRight = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.24, 12), bowMat);
  bowRight.rotation.z = Math.PI / 2;
  bowRight.position.set(0.14, 1.5, 0.56);
  const bowKnot = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 12), bowMat);
  bowKnot.position.set(0, 1.5, 0.58);
  group.add(bowLeft, bowRight, bowKnot);

  // 2. Head group (secondary silhouette + facial details)
  const head = new THREE.Group();
  head.position.set(0, 2.02, 0.04);
  group.add(head);

  const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.66, 26, 22), furMat);
  cranium.scale.set(1.06, 0.96, 0.98);
  cranium.castShadow = true;
  head.add(cranium);

  // Ears
  [-1, 1].forEach((side) => {
    const ear = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 14), furMat);
    ear.position.set(side * 0.52, 0.48, -0.04);
    ear.scale.set(1, 1, 0.68);
    head.add(ear);

    const earInner = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 12), blushMat);
    earInner.position.set(side * 0.52, 0.48, 0.08);
    earInner.scale.set(1, 1, 0.45);
    head.add(earInner);
  });

  // Snout + Nose + Eyes + Highlights
  const snout = new THREE.Mesh(new THREE.SphereGeometry(0.24, 18, 14), bellyMat);
  snout.scale.set(1.15, 0.85, 0.85);
  snout.position.set(0, -0.1, 0.54);
  head.add(snout);

  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), noseMat);
  nose.scale.set(1.25, 0.85, 0.8);
  nose.position.set(0, -0.02, 0.73);
  head.add(nose);

  const eyeSparkMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  [-1, 1].forEach((side) => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.075, 14, 14), darkEyeMat);
    eye.position.set(side * 0.23, 0.1, 0.57);
    head.add(eye);

    const eyeSpark = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), eyeSparkMat);
    eyeSpark.position.set(side * 0.25, 0.13, 0.635);
    head.add(eyeSpark);
  });

  const blushLeft = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), blushMat);
  blushLeft.scale.set(1.2, 0.75, 0.4);
  blushLeft.position.set(-0.34, -0.08, 0.52);
  const blushRight = blushLeft.clone();
  blushRight.position.x = 0.34;
  head.add(blushLeft, blushRight);

  if (pose === 'grumpy') {
    [-1, 1].forEach((side) => {
      const brow = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 0.05), noseMat);
      brow.position.set(side * 0.23, 0.22, 0.61);
      brow.rotation.z = side * 0.36;
      head.add(brow);
    });
  }

  // 3. Articulated Arms
  const leftArm = new THREE.Group();
  leftArm.position.set(-0.62, 1.32, 0.08);
  const rightArm = new THREE.Group();
  rightArm.position.set(0.62, 1.32, 0.08);
  group.add(leftArm, rightArm);

  const buildArmMesh = (pivot: THREE.Group, side: number) => {
    const limb = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.46, 8, 14), furMat);
    limb.position.set(side * 0.14, -0.24, 0.08);
    limb.rotation.z = side * 0.32;
    limb.castShadow = true;
    pivot.add(limb);

    const paw = new THREE.Mesh(new THREE.SphereGeometry(0.13, 12, 12), bellyMat);
    paw.scale.set(1, 1, 0.55);
    paw.position.set(side * 0.24, -0.48, 0.18);
    pivot.add(paw);
  };
  buildArmMesh(leftArm, -1);
  buildArmMesh(rightArm, 1);

  // Pose arm presets
  if (pose === 'openArms') {
    leftArm.rotation.set(-0.6, 0, -0.55);
    rightArm.rotation.set(-0.6, 0, 0.55);
  } else if (pose === 'grumpy') {
    leftArm.rotation.set(-1.1, 0.45, 0.65);
    rightArm.rotation.set(-1.1, -0.45, -0.65);
  } else if (pose === 'wave') {
    leftArm.rotation.set(-0.2, 0, -0.15);
    rightArm.rotation.set(-0.2, 0, 1.85);
  } else if (pose === 'kiss') {
    leftArm.rotation.set(-0.3, 0, -0.2);
    rightArm.rotation.set(-1.25, -0.35, 0.3);
  }

  // 4. Legs
  const leftLeg = new THREE.Group();
  leftLeg.position.set(-0.36, 0.34, 0.18);
  const rightLeg = new THREE.Group();
  rightLeg.position.set(0.36, 0.34, 0.18);
  group.add(leftLeg, rightLeg);

  const buildLegMesh = (pivot: THREE.Group) => {
    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.34, 8, 14), furMat);
    leg.rotation.x = pose === 'seated' ? Math.PI / 2.2 : 0.25;
    leg.position.set(0, -0.08, pose === 'seated' ? 0.28 : 0.08);
    leg.castShadow = true;
    pivot.add(leg);

    const footPad = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), bellyMat);
    footPad.scale.set(0.95, 1.15, 0.4);
    footPad.position.set(0, -0.12, pose === 'seated' ? 0.56 : 0.28);
    pivot.add(footPad);
  };
  buildLegMesh(leftLeg);
  buildLegMesh(rightLeg);

  // 5. Accessories
  let angryCloud: THREE.Group | undefined;
  let accessoryGroup: THREE.Group | undefined;

  if (accessory === 'heartBalloon') {
    accessoryGroup = new THREE.Group();
    const stringPts = [
      new THREE.Vector3(0.84, 0.9, 0.28),
      new THREE.Vector3(0.96, 1.6, 0.2),
      new THREE.Vector3(1.06, 2.3, 0.14),
    ];
    const stringCurve = new THREE.CatmullRomCurve3(stringPts);
    const stringMesh = new THREE.Mesh(
      new THREE.TubeGeometry(stringCurve, 16, 0.014, 6, false),
      new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.4 }),
    );
    const balloonMat = new THREE.MeshPhysicalMaterial({
      color: 0xff3d85,
      emissive: 0xff1e6e,
      emissiveIntensity: 0.45,
      roughness: 0.18,
      clearcoat: 1.0,
    });
    const balloon = new THREE.Mesh(createHeartGeometry(0.65, 0.38), balloonMat);
    balloon.position.set(1.08, 2.72, 0.14);
    accessoryGroup.add(stringMesh, balloon);
    group.add(accessoryGroup);
    rightArm.rotation.set(-0.7, 0, 0.4);
  } else if (accessory === 'apologyLetter') {
    accessoryGroup = new THREE.Group();
    const env = new THREE.Mesh(
      new THREE.BoxGeometry(0.75, 0.5, 0.08),
      new THREE.MeshStandardMaterial({ color: 0xfff8f0, roughness: 0.6 }),
    );
    env.position.set(0, 0.98, 0.86);
    env.rotation.x = -0.2;
    const seal = new THREE.Mesh(createHeartGeometry(0.14, 0.08), heartBadgeMat);
    seal.position.set(0, 0.98, 0.92);
    accessoryGroup.add(env, seal);
    group.add(accessoryGroup);
    leftArm.rotation.set(-0.9, 0.4, 0.25);
    rightArm.rotation.set(-0.9, -0.4, -0.25);
  } else if (accessory === 'grumpyCloud') {
    angryCloud = new THREE.Group();
    angryCloud.position.set(0, 3.1, 0);
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      emissive: 0x475569,
      emissiveIntensity: 0.2,
      roughness: 0.85,
    });
    [
      [-0.28, 0, 0, 0.24],
      [0, 0.1, 0, 0.3],
      [0.28, 0, 0, 0.24],
      [-0.12, -0.06, 0.1, 0.2],
      [0.14, -0.06, -0.08, 0.2],
    ].forEach(([x, y, z, r]) => {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 12), cloudMat);
      puff.position.set(x, y, z);
      angryCloud!.add(puff);
    });
    group.add(angryCloud);
  } else if (accessory === 'giftAndChocolates') {
    accessoryGroup = new THREE.Group();
    const chocBox = new THREE.Mesh(
      createHeartGeometry(0.45, 0.22),
      new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.35 }),
    );
    chocBox.position.set(-0.52, 1.02, 0.72);
    chocBox.rotation.x = -0.4;
    const roseStem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.65, 8),
      new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.6 }),
    );
    roseStem.position.set(0.55, 1.15, 0.62);
    roseStem.rotation.z = -0.25;
    const roseHead = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.16, 1),
      new THREE.MeshStandardMaterial({ color: 0xe11d48, roughness: 0.45 }),
    );
    roseHead.position.set(0.62, 1.48, 0.62);
    accessoryGroup.add(chocBox, roseStem, roseHead);
    group.add(accessoryGroup);
    leftArm.rotation.set(-0.85, 0.2, 0.1);
    rightArm.rotation.set(-0.85, -0.2, -0.1);
  } else if (accessory === 'crown') {
    accessoryGroup = createGoldenCrown(0.55);
    accessoryGroup.position.set(0, 0.62, 0);
    head.add(accessoryGroup);
  } else if (accessory === 'chefHat') {
    accessoryGroup = new THREE.Group();
    const hatMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.75 });
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.3, 0.24, 18), hatMat);
    band.position.y = 0.68;
    const puff = new THREE.Mesh(new THREE.SphereGeometry(0.38, 18, 14), hatMat);
    puff.scale.set(1.1, 0.8, 1.1);
    puff.position.y = 0.94;
    accessoryGroup.add(band, puff);
    head.add(accessoryGroup);
  } else if (accessory === 'discoGlasses') {
    accessoryGroup = new THREE.Group();
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xec4899,
      metalness: 0.6,
      roughness: 0.12,
      clearcoat: 1,
    });
    const frameMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.85, roughness: 0.2 });
    [-0.22, 0.22].forEach((x) => {
      const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.04, 16), glassMat);
      lens.rotation.x = Math.PI / 2;
      lens.position.set(x, 0.1, 0.65);
      accessoryGroup!.add(lens);
    });
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.03, 0.03), frameMat);
    bridge.position.set(0, 0.11, 0.65);
    accessoryGroup.add(bridge);
    head.add(accessoryGroup);
  } else if (accessory === 'rose') {
    accessoryGroup = createFlowerMesh(0xe11d48, 0.55);
    accessoryGroup.position.set(0.7, 1.0, 0.55);
    accessoryGroup.rotation.x = 0.3;
    group.add(accessoryGroup);
  }

  return {
    group,
    head,
    leftArm,
    rightArm,
    leftLeg,
    rightLeg,
    blushLeft,
    blushRight,
    angryCloud,
    accessoryGroup,
  };
}

export function createGoldenCrown(scale = 1): THREE.Group {
  const crown = new THREE.Group();
  crown.scale.setScalar(scale);

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xfbbf24,
    metalness: 0.9,
    roughness: 0.18,
  });

  const gemMat = new THREE.MeshPhysicalMaterial({
    color: 0xec4899,
    metalness: 0.1,
    roughness: 0.1,
    clearcoat: 1,
    emissive: 0xdb2777,
    emissiveIntensity: 0.35,
  });

  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.5, 0.25, 24, 1, true), goldMat);
  band.material.side = THREE.DoubleSide;
  crown.add(band);

  for (let i = 0; i < 6; i += 1) {
    const angle = (i / 6) * Math.PI * 2;
    const spike = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.42, 8), goldMat);
    spike.position.set(Math.cos(angle) * 0.52, 0.32, Math.sin(angle) * 0.52);
    crown.add(spike);

    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.075, 0), gemMat);
    gem.position.set(Math.cos(angle) * 0.54, 0.54, Math.sin(angle) * 0.54);
    crown.add(gem);
  }
  return crown;
}

export function createFlowerMesh(petalColor = 0xf43f5e, scale = 1): THREE.Group {
  const flower = new THREE.Group();
  flower.scale.setScalar(scale);

  const stemMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.6 });
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 1.3, 10), stemMat);
  stem.position.y = 0.65;
  flower.add(stem);

  const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 8), stemMat);
  leaf.scale.set(1.4, 0.25, 0.65);
  leaf.position.set(0.18, 0.6, 0);
  leaf.rotation.z = 0.4;
  flower.add(leaf);

  const petalMat = new THREE.MeshStandardMaterial({
    color: petalColor,
    roughness: 0.45,
    metalness: 0.05,
    side: THREE.DoubleSide,
  });

  const center = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 14, 12),
    new THREE.MeshStandardMaterial({ color: 0xfde047, roughness: 0.5 }),
  );
  center.position.y = 1.34;
  flower.add(center);

  for (let i = 0; i < 8; i += 1) {
    const angle = (i / 8) * Math.PI * 2;
    const petal = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), petalMat);
    petal.scale.set(0.95, 0.28, 1.35);
    petal.position.set(Math.cos(angle) * 0.26, 1.32 + (i % 2) * 0.04, Math.sin(angle) * 0.26);
    petal.rotation.y = -angle;
    petal.rotation.x = 0.35;
    flower.add(petal);
  }
  return flower;
}

export function createGiftBox(): { group: THREE.Group; lid: THREE.Group } {
  const group = new THREE.Group();
  const boxMat = new THREE.MeshStandardMaterial({
    color: 0xf472b6,
    roughness: 0.42,
    metalness: 0.08,
  });
  const ribbonMat = new THREE.MeshStandardMaterial({
    color: 0xfbbf24,
    roughness: 0.25,
    metalness: 0.72,
  });

  const base = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.3, 1.7), boxMat);
  base.position.y = 0.65;
  base.castShadow = true;
  group.add(base);

  const strip1 = new THREE.Mesh(new THREE.BoxGeometry(1.74, 1.32, 0.26), ribbonMat);
  strip1.position.y = 0.65;
  const strip2 = new THREE.Mesh(new THREE.BoxGeometry(0.26, 1.32, 1.74), ribbonMat);
  strip2.position.y = 0.65;
  group.add(strip1, strip2);

  const lid = new THREE.Group();
  lid.position.set(0, 1.34, -0.86);
  const lidTop = new THREE.Mesh(new THREE.BoxGeometry(1.84, 0.28, 1.84), boxMat);
  lidTop.position.set(0, 0.14, 0.86);
  lid.add(lidTop);

  const lidRibbon1 = new THREE.Mesh(new THREE.BoxGeometry(1.88, 0.3, 0.28), ribbonMat);
  lidRibbon1.position.set(0, 0.14, 0.86);
  const lidRibbon2 = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.3, 1.88), ribbonMat);
  lidRibbon2.position.set(0, 0.14, 0.86);
  lid.add(lidRibbon1, lidRibbon2);

  // Satin Bow loops on lid
  [-1, 1].forEach((s) => {
    const loop = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.06, 10, 20), ribbonMat);
    loop.position.set(s * 0.24, 0.42, 0.86);
    loop.rotation.y = s * 0.4;
    lid.add(loop);
  });

  group.add(lid);
  return { group, lid };
}

export function createHeartPadlockAndKey(): { lockGroup: THREE.Group; keyGroup: THREE.Group } {
  const lockGroup = new THREE.Group();
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xfbbf24,
    metalness: 0.88,
    roughness: 0.18,
  });
  const pinkGoldMat = new THREE.MeshPhysicalMaterial({
    color: 0xf43f5e,
    metalness: 0.35,
    roughness: 0.2,
    clearcoat: 1,
  });

  const body = new THREE.Mesh(createHeartGeometry(1.4, 0.45), pinkGoldMat);
  body.position.y = 1.25;
  lockGroup.add(body);

  const shackle = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.09, 12, 28, Math.PI), goldMat);
  shackle.position.y = 1.95;
  lockGroup.add(shackle);

  const keyGroup = new THREE.Group();
  const keyRing = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.05, 10, 20), goldMat);
  const keyShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.85, 12), goldMat);
  keyShaft.rotation.z = Math.PI / 2;
  keyShaft.position.x = 0.65;
  const keyTooth = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.06), goldMat);
  keyTooth.position.set(0.95, -0.1, 0);
  keyGroup.add(keyRing, keyShaft, keyTooth);
  keyGroup.position.set(1.6, 1.2, 0.55);

  return { lockGroup, keyGroup };
}

export function createCastleDiorama(): THREE.Group {
  const castle = new THREE.Group();
  const wallMat = new THREE.MeshStandardMaterial({ color: 0xffe4f2, roughness: 0.65 });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.35, metalness: 0.2 });
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.85, roughness: 0.2 });

  const keep = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.6, 1.4), wallMat);
  keep.position.y = 0.8;
  castle.add(keep);

  [
    [-1.1, 1.2, 0.5],
    [1.1, 1.2, 0.5],
    [-0.95, 1.5, -0.6],
    [0.95, 1.5, -0.6],
  ].forEach(([x, h, z]) => {
    const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.36, h * 1.4, 16), wallMat);
    tower.position.set(x, h * 0.7, z);
    castle.add(tower);

    const spire = new THREE.Mesh(new THREE.ConeGeometry(0.4, 0.75, 16), roofMat);
    spire.position.set(x, h * 1.4 + 0.35, z);
    castle.add(spire);

    const finial = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 10), goldMat);
    finial.position.set(x, h * 1.4 + 0.75, z);
    castle.add(finial);
  });

  const centralTower = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.48, 2.3, 18), wallMat);
  centralTower.position.set(0, 1.55, 0);
  const centralRoof = new THREE.Mesh(new THREE.ConeGeometry(0.56, 0.95, 18), roofMat);
  centralRoof.position.set(0, 3.15, 0);
  castle.add(centralTower, centralRoof);

  return castle;
}

export function createChocolateFountain(): THREE.Group {
  const fountain = new THREE.Group();
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xfde68a, metalness: 0.85, roughness: 0.22 });
  const chocMat = new THREE.MeshPhysicalMaterial({
    color: 0x5c2c16,
    roughness: 0.14,
    metalness: 0.05,
    clearcoat: 1.0,
  });

  const bowl = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 0.85, 0.35, 24), metalMat);
  bowl.position.y = 0.2;
  const chocPool = new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 0.08, 24), chocMat);
  chocPool.position.y = 0.38;
  fountain.add(bowl, chocPool);

  [0.72, 0.5, 0.3].forEach((r, idx) => {
    const tier = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.15, 0.12, 22), chocMat);
    tier.position.y = 0.75 + idx * 0.45;
    fountain.add(tier);
  });

  const column = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.22, 1.85, 16), chocMat);
  column.position.y = 1.1;
  fountain.add(column);

  return fountain;
}
