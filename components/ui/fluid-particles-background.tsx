"use client";

import { useEffect, useMemo, useRef, type ReactNode } from "react";

interface FluidParticlesBackgroundProps {
  children?: ReactNode;
  particleCount?: number;
  noiseIntensity?: number;
  particleSize?: { min: number; max: number };
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  life: number;
  maxLife: number;
}

function createNoise() {
  const permutation = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 195, 78, 66, 215, 61, 156, 180];
  const p = new Array(512);
  for (let index = 0; index < 256; index += 1) p[index + 256] = p[index] = permutation[index];
  const fade = (value: number) => value * value * value * (value * (value * 6 - 15) + 10);
  const lerp = (value: number, start: number, end: number) => start + value * (end - start);
  const grad = (hash: number, x: number, y: number, z: number) => { const h = hash & 15; const u = h < 8 ? x : y; const v = h < 4 ? y : h === 12 || h === 14 ? x : z; return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v); };

  return (x: number, y: number, z: number) => {
    const X = Math.floor(x) & 255; const Y = Math.floor(y) & 255; const Z = Math.floor(z) & 255;
    const localX = x - Math.floor(x); const localY = y - Math.floor(y); const localZ = z - Math.floor(z);
    const u = fade(localX); const v = fade(localY); const w = fade(localZ);
    const A = p[X] + Y; const AA = p[A] + Z; const AB = p[A + 1] + Z; const B = p[X + 1] + Y; const BA = p[B] + Z; const BB = p[B + 1] + Z;
    return lerp(w, lerp(v, lerp(u, grad(p[AA], localX, localY, localZ), grad(p[BA], localX - 1, localY, localZ)), lerp(u, grad(p[AB], localX, localY - 1, localZ), grad(p[BB], localX - 1, localY - 1, localZ))), lerp(v, lerp(u, grad(p[AA + 1], localX, localY, localZ - 1), grad(p[BA + 1], localX - 1, localY, localZ - 1)), lerp(u, grad(p[AB + 1], localX, localY - 1, localZ - 1), grad(p[BB + 1], localX - 1, localY - 1, localZ - 1))));
  };
}

export function FluidParticlesBackground({ children, particleCount = 480, noiseIntensity = 0.003, particleSize = { min: 0.5, max: 1.6 }, className }: FluidParticlesBackgroundProps) {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const noise = useMemo(() => createNoise(), []);

  useEffect(() => {
    const container = root.current; const surface = canvas.current; const context = surface?.getContext("2d", { alpha: true });
    if (!container || !surface || !context) return;
    let width = 0; let height = 0; let frame = 0; let particles: Particle[] = [];
    const resize = () => { const bounds = container.getBoundingClientRect(); const ratio = Math.min(devicePixelRatio, 1.5); width = bounds.width; height = bounds.height; surface.width = Math.max(1, Math.round(width * ratio)); surface.height = Math.max(1, Math.round(height * ratio)); context.setTransform(ratio, 0, 0, ratio, 0, 0); particles = Array.from({ length: particleCount }, () => ({ x: Math.random() * width, y: Math.random() * height, size: particleSize.min + Math.random() * (particleSize.max - particleSize.min), life: Math.random() * 120, maxLife: 120 + Math.random() * 100 })); };
    const draw = (time: number, advance: boolean) => { context.clearRect(0, 0, width, height); for (const particle of particles) { if (advance) { particle.life = particle.life >= particle.maxLife ? 0 : particle.life + 1; if (particle.life === 0) { particle.x = Math.random() * width; particle.y = Math.random() * height; } const angle = noise(particle.x * noiseIntensity, particle.y * noiseIntensity, time * 0.0001) * Math.PI * 4; particle.x = (particle.x + Math.cos(angle) * 1.2 + width) % width; particle.y = (particle.y + Math.sin(angle) * 1.2 + height) % height; } const opacity = Math.sin((particle.life / particle.maxLife) * Math.PI) * 0.15; context.fillStyle = `rgba(245,245,245,${opacity})`; context.beginPath(); context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2); context.fill(); } };
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animate = (time: number) => { draw(time, true); frame = requestAnimationFrame(animate); };
    resize(); draw(0, false); const observer = new ResizeObserver(resize); observer.observe(container); if (!reduceMotion) frame = requestAnimationFrame(animate);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [noise, noiseIntensity, particleCount, particleSize.max, particleSize.min]);

  return <div ref={root} className={className}><canvas ref={canvas} aria-hidden="true" />{children ? <div className="fluid-particles-background__content">{children}</div> : null}</div>;
}
