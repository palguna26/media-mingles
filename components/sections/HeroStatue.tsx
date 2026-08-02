"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import * as THREE from "three";

export type HeroStatueHandle = { setProgress: (progress: number) => void };

function statueMaterial(texture: THREE.Texture) {
  texture.colorSpace = THREE.SRGBColorSpace;
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: true,
    uniforms: { map: { value: texture }, opacity: { value: 1 } },
    vertexShader: "varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
    fragmentShader: "uniform sampler2D map;uniform float opacity;varying vec2 vUv;void main(){vec4 color=texture2D(map,vUv);color.a*=opacity*smoothstep(0.02,0.22,vUv.y);if(color.a<0.01)discard;gl_FragColor=color;}",
  });
}

export const HeroStatue = forwardRef<HeroStatueHandle>(function HeroStatue(_, ref) {
  const host = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  useImperativeHandle(ref, () => ({ setProgress: (value) => { progress.current = value; } }), []);

  useEffect(() => {
    const element = host.current;
    if (!element) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, .1, 100);
    camera.position.z = 6.1;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.25 : 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    element.appendChild(renderer.domElement);

    const movingGroup = new THREE.Group();
    scene.add(movingGroup);
    const textureLoader = new THREE.TextureLoader();
    const statueMaterials = [
      "/media/hero/statue-side.png",
      "/media/hero/statue-turn-1.png",
      "/media/hero/statue-turn-2.png",
      "/media/hero/statue-front.png",
    ].map((path) => statueMaterial(textureLoader.load(path)));
    const planeGeometry = new THREE.PlaneGeometry(3.25, 3.25);
    statueMaterials.forEach((material, index) => {
      material.uniforms.opacity.value = index === 0 ? 1 : 0;
      const plane = new THREE.Mesh(planeGeometry, material);
      plane.position.z = index * .006;
      movingGroup.add(plane);
    });

    const orbitMaterial = new THREE.LineDashedMaterial({ color: 0xffc4cf, transparent: true, opacity: .22, dashSize: .055, gapSize: .045, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
    const dotMaterial = new THREE.PointsMaterial({ color: 0xff8298, size: .042, transparent: true, opacity: .24, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true, toneMapped: false });
    const orbitGeometries: THREE.BufferGeometry[] = [];
    const createOrbit = () => {
      const orbit = new THREE.Group();
      const points = Array.from({ length: 241 }, (_, index) => {
        const angle = (index / 240) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(angle) * 1.72, Math.sin(angle) * 1.72, 0);
      });
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      orbitGeometries.push(geometry);
      const path = new THREE.Line(geometry, orbitMaterial);
      path.computeLineDistances();
      orbit.add(path);
      const dottedRows = [1.52, 1.92].flatMap((radius) => Array.from({ length: 88 }, (_, index) => {
        const angle = (index / 88) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
      }));
      const dotsGeometry = new THREE.BufferGeometry().setFromPoints(dottedRows);
      orbitGeometries.push(dotsGeometry);
      orbit.add(new THREE.Points(dotsGeometry, dotMaterial));
      return orbit;
    };
    const ringA = createOrbit();
    const ringB = createOrbit();
    const ringC = createOrbit();
    ringA.rotation.x = Math.PI * .48;
    ringB.rotation.set(Math.PI * .16, Math.PI * .5, 0);
    ringC.rotation.set(0, Math.PI * .5, Math.PI * .3);
    movingGroup.add(ringA, ringB, ringC);

    const resize = () => {
      const { width, height } = element.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    resize();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clock = new THREE.Clock();
    let frame = 0;
    const render = () => {
      const time = clock.getElapsedTime();
      const value = progress.current;
      const turn = THREE.MathUtils.smoothstep(value, .1, .72) * 3;
      const frameIndex = Math.min(Math.floor(turn), 2);
      const blend = turn - frameIndex;
      statueMaterials.forEach((material, index) => {
        material.uniforms.opacity.value = index === frameIndex ? 1 - blend : index === frameIndex + 1 ? blend : 0;
      });
      movingGroup.position.x = THREE.MathUtils.lerp(2.55, 0, value);
      const ringScale = THREE.MathUtils.lerp(1, 1.72, value);
      ringA.scale.setScalar(ringScale);
      ringB.scale.setScalar(ringScale);
      ringC.scale.setScalar(ringScale);
      ringA.rotation.z = time * .28 + value * 1.15;
      ringB.rotation.z = time * -.22 - value * .85;
      ringC.rotation.x = time * .2 + value * .72;
      renderer.render(scene, camera);
      if (!reducedMotion) frame = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      planeGeometry.dispose();
      orbitGeometries.forEach((geometry) => geometry.dispose());
      statueMaterials.forEach((material) => {
        material.uniforms.map.value.dispose();
        material.dispose();
      });
      orbitMaterial.dispose();
      dotMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} className="hero-statue" aria-hidden="true" />;
});
