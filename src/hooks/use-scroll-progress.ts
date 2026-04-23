import { RefObject, useEffect, useState } from "react";

/** Returns 0..1 progress as the element scrolls through the viewport. */
export const useScrollProgress = <T extends HTMLElement>(ref: RefObject<T>) => {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.6;
      const seen = Math.min(Math.max(vh - rect.top, 0), total);
      setP(Math.min(1, Math.max(0, seen / total)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);
  return p;
};
