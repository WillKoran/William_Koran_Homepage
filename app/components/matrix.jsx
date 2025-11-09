"use client";

import { useEffect, useRef, useState } from "react";

export default function Matrix({ duration = 3000 }) {
  const canvasRef = useRef(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const letters = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポ0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    const fontSize = 16;
    const columns = Math.floor(width / fontSize) + 1;
    const drops = Array(columns).fill(0);

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#00ff4c";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }

    let raf = null;
    let running = true;

    function loop() {
      if (!running) return;
      draw();
      raf = requestAnimationFrame(loop);
    }

    loop();

    function handleResize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", handleResize);

    // stop animation after duration and fade out
    const stopTimer = setTimeout(() => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      setHidden(true);
    }, duration);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(stopTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [duration]);

  return (
    <canvas
      ref={canvasRef}
      className={`matrix-canvas ${hidden ? 'matrix-hidden' : ''}`}
      aria-hidden
    />
  );
}
