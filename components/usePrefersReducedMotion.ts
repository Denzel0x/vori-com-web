"use client";

import { useEffect, useState } from "react";

/**
 * Reads the "reduce motion" OS setting only AFTER the component has mounted.
 *
 * It always returns `false` on the server and on the first client render, so the
 * HTML React hydrates against is identical to what the server sent. (Reading the
 * media query during render makes the first client render differ from the server
 * for anyone with reduced motion on, which causes a hydration error.)
 */
export function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduce;
}
