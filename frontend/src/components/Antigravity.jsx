import { useEffect, useRef } from 'react';

// Canvas2D magnetic particle-ring cursor effect. Replaces an earlier
// Three.js/@react-three/fiber version — same visual idea (particles pulled
// into a ring around the cursor, or an auto-animated point when idle) at a
// fraction of the JS/bundle cost.

function drawParticle(ctx, x, y, r, shape, angle) {
  ctx.beginPath();
  switch (shape) {
    case 'box':
      ctx.rect(x - r, y - r, r * 2, r * 2);
      ctx.fill();
      break;
    case 'tetrahedron':
      ctx.moveTo(x, y - r);
      ctx.lineTo(x - r, y + r);
      ctx.lineTo(x + r, y + r);
      ctx.closePath();
      ctx.fill();
      break;
    case 'capsule': {
      const len = r * 1.8;
      const x1 = x - Math.cos(angle) * len * 0.5;
      const y1 = y - Math.sin(angle) * len * 0.5;
      const x2 = x + Math.cos(angle) * len * 0.5;
      const y2 = y + Math.sin(angle) * len * 0.5;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineWidth = Math.max(r, 1);
      ctx.lineCap = 'round';
      ctx.strokeStyle = ctx.fillStyle;
      ctx.stroke();
      break;
    }
    default:
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
  }
}

export default function Antigravity({
  count = 300,
  magnetRadius = 10,
  ringRadius = 10,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 2,
  lerpSpeed = 0.1,
  color = '#FF9FFC',
  autoAnimate = false,
  particleVariance = 1,
  rotationSpeed = 0,
  pulseSpeed = 3,
  particleShape = 'capsule',
  fieldStrength = 10
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const UNIT = 30; // approximate px-per-unit, matched to the old 3D scene's scale

    let width = 0;
    let height = 0;

    function resize() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: count }, () => {
      const x = (Math.random() - 0.5) * width;
      const y = (Math.random() - 0.5) * height;
      return {
        t: Math.random() * 100,
        speed: 0.01 + Math.random() / 200,
        mx: x,
        my: y,
        cx: x,
        cy: y,
        randomRadiusOffset: (Math.random() - 0.5) * 2
      };
    });

    const pointer = { x: 0, y: 0 };
    const virtualTarget = { x: 0, y: 0 };
    let lastMoveTime = Date.now();

    function handlePointerMove(e) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left - width / 2;
      pointer.y = e.clientY - rect.top - height / 2;
      lastMoveTime = Date.now();
    }
    window.addEventListener('pointermove', handlePointerMove);

    const magnet = magnetRadius * UNIT;
    const ring = ringRadius * UNIT;
    const baseRadius = 2.5 * particleSize;

    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animId = null;
    let clockStart = performance.now();

    function render(now) {
      const elapsed = (now - clockStart) / 1000;
      let destX = pointer.x;
      let destY = pointer.y;

      if (autoAnimate && Date.now() - lastMoveTime > 2000) {
        destX = Math.sin(elapsed * 0.5) * (width / 4);
        destY = Math.cos(elapsed * 1.0) * (height / 4);
      }

      virtualTarget.x += (destX - virtualTarget.x) * 0.05;
      virtualTarget.y += (destY - virtualTarget.y) * 0.05;

      const globalRotation = elapsed * rotationSpeed;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;

      for (const p of particles) {
        p.t += p.speed / 2;

        const dx = p.mx - virtualTarget.x;
        const dy = p.my - virtualTarget.y;
        const dist = Math.hypot(dx, dy);

        let targetX = p.mx;
        let targetY = p.my;

        if (dist < magnet) {
          const angle = Math.atan2(dy, dx) + globalRotation;
          const wave = Math.sin(p.t * waveSpeed + angle) * (0.5 * waveAmplitude) * UNIT * 0.15;
          const deviation = p.randomRadiusOffset * ((UNIT * 1.5) / (fieldStrength + 0.1));
          const currentRing = ring + wave + deviation;
          targetX = virtualTarget.x + currentRing * Math.cos(angle);
          targetY = virtualTarget.y + currentRing * Math.sin(angle);
        }

        p.cx += (targetX - p.cx) * lerpSpeed;
        p.cy += (targetY - p.cy) * lerpSpeed;

        const distToTarget = Math.hypot(p.cx - virtualTarget.x, p.cy - virtualTarget.y);
        const distFromRing = Math.abs(distToTarget - ring);
        const scaleFactor = Math.max(0, Math.min(1, 1 - distFromRing / (UNIT * 3)));
        if (scaleFactor <= 0) continue;

        const pulse = 0.8 + Math.sin(p.t * pulseSpeed) * 0.2 * particleVariance;
        const radius = scaleFactor * pulse * baseRadius;
        if (radius <= 0.15) continue;

        ctx.globalAlpha = 0.35 + scaleFactor * 0.65;
        const drawX = p.cx + width / 2;
        const drawY = p.cy + height / 2;
        const angleToTarget = Math.atan2(p.cy - virtualTarget.y, p.cx - virtualTarget.x);
        drawParticle(ctx, drawX, drawY, radius, particleShape, angleToTarget);
      }
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(render);
    }

    function stopLoop() {
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    }
    function startLoop() {
      if (animId === null && !document.hidden && !prefersReducedMotion) {
        clockStart = performance.now();
        animId = requestAnimationFrame(render);
      }
    }
    function handleVisibility() {
      if (document.hidden) stopLoop();
      else startLoop();
    }

    startLoop();
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      stopLoop();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [
    count,
    magnetRadius,
    ringRadius,
    waveSpeed,
    waveAmplitude,
    particleSize,
    lerpSpeed,
    color,
    autoAnimate,
    particleVariance,
    rotationSpeed,
    pulseSpeed,
    particleShape,
    fieldStrength
  ]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}
