"use client";

import React, { useEffect, useState } from "react";

const GLYPHS = "01!@#$%^&*ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz<>?/|\\".split("");

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

export default function MatrixText({ text = "", totalDuration = 1800, flickerInterval = 40, className = "" }) {
  // use regular spaces so the browser can wrap lines; preserve them via whitespace-pre-wrap
  const chars = Array.from(text);

  // IMPORTANT: initialize to the final text so server-rendered HTML matches client initial HTML.
  // The animation (random glyph flicker) will be started only after mount in useEffect to avoid
  // hydration mismatches. This ensures aria-hidden and text content match during hydration.
  const [display, setDisplay] = useState(() => chars.slice());

  useEffect(() => {
    let mounted = true;
    const len = chars.length || 1;
    const revealInterval = Math.max(10, Math.floor(totalDuration / len));

    let revealIndex = 0;
    let flicker = null;
    let revealTimer = null;

    // Start animation only on the client after mount. To avoid hydration mismatches, we first
    // swap to randomized glyphs in the next tick, then run the flicker/reveal timers.
    const start = () => {
      // set initial random glyphs (leave spaces intact)
      setDisplay(chars.map((c) => (c === " " ? " " : randomGlyph())));

      flicker = setInterval(() => {
        if (!mounted) return;
        setDisplay((prev) =>
          prev.map((ch, i) => (i < revealIndex ? chars[i] : chars[i] === " " ? " " : randomGlyph()))
        );
      }, flickerInterval);

      revealTimer = setInterval(() => {
        revealIndex += 1;
        if (revealIndex >= len) {
          // finalize and stop
          clearInterval(revealTimer);
          clearInterval(flicker);
          if (mounted) setDisplay(chars);
        }
      }, revealInterval);
    };

    // Kick off in next tick so hydration has settled
    const kickoff = setTimeout(start, 0);

    return () => {
      mounted = false;
  clearTimeout(kickoff);
  if (flicker) clearInterval(flicker);
  if (revealTimer) clearInterval(revealTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    // preserve spacing and allow wrapping; use monospace green styling
    <span aria-label={text} className={`matrix-text font-mono text-green-400 whitespace-pre-wrap ${className}`}>
      {display.map((c, i) => (
        <span key={i} className="inline" aria-hidden={c !== chars[i]}>
          {c}
        </span>
      ))}
    </span>
  );
}
