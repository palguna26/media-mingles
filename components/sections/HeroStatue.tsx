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
    let frame = 0;
    const render = () => {
      const value = progress.current;
      const turn = THREE.MathUtils.smoothstep(value, .1, .72) * 3;
      const frameIndex = Math.min(Math.floor(turn), 2);
      const blend = turn - frameIndex;
      statueMaterials.forEach((material, index) => {
        material.uniforms.opacity.value = index === frameIndex ? 1 - blend : index === frameIndex + 1 ? blend : 0;
      });
      movingGroup.position.x = THREE.MathUtils.lerp(2.55, 0, value);
      renderer.render(scene, camera);
      if (!reducedMotion) frame = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      planeGeometry.dispose();
      statueMaterials.forEach((material) => {
        material.uniforms.map.value.dispose();
        material.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} className="hero-statue" aria-hidden="true" />;
});
