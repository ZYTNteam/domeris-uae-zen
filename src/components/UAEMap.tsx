import { useEffect, useRef, useState } from "react";
import reliefMap from "@/assets/uae-relief-map.png";

/**
 * Premium embossed UAE map — uses a sculpted ivory + gold relief image
 * with overlaid champagne-gold city markers on the actual coastline.
 *
 * City coordinates are expressed as percentages (0–100) of the
 * displayed map image. They were tuned against the rendered relief
 * artwork so each marker sits on the correct landmass / coast.
 */

/**
 * Premium UAE map with a luxury "magnifying glass" interaction.
 *
 * On mouse enter, the map image scales up (~2.5x) with the transform-origin
 * anchored to the cursor position. As the cursor moves, the origin updates
 * smoothly so the zoomed view follows the cursor. On mouse leave, the map
 * eases back to its original scale and centered origin.
 */
const ZOOM = 1.7;

const UAEMap = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [hovering, setHovering] = useState(false);

  // Use refs (not state) for the cursor-follow loop so we don't trigger
  // React re-renders on every animation frame.
  const target = useRef({ x: 50, y: 50 });
  const current = useRef({ x: 50, y: 50 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const tick = () => {
      // Lerp towards the target for soft, premium follow
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      const img = imgRef.current;
      if (img) {
        img.style.transformOrigin = `${current.current.x}% ${current.current.y}%`;
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    target.current.x = Math.max(0, Math.min(100, x));
    target.current.y = Math.max(0, Math.min(100, y));
  };

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMove(e);
    setHovering(true);
  };

  const handleLeave = () => {
    setHovering(false);
    target.current.x = 50;
    target.current.y = 50;
  };

  return (
    <div className={`relative ${className}`}>
      <div
        ref={containerRef}
        className="relative h-full w-full cursor-zoom-in"
        onMouseEnter={handleEnter}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <img
          ref={imgRef}
          src={reliefMap}
          alt="Embossed relief map of the United Arab Emirates"
          className="pointer-events-none h-full w-full select-none object-contain"
          width={1024}
          height={1024}
          loading="lazy"
          draggable={false}
          style={{
            transform: hovering ? `scale(${ZOOM})` : "scale(1)",
            transition:
              "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)",
            willChange: "transform, transform-origin",
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 18%, black 38%, black 82%, rgba(0,0,0,0.65) 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 8%, black 22%, black 80%, rgba(0,0,0,0.6) 94%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 18%, black 38%, black 82%, rgba(0,0,0,0.65) 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 8%, black 22%, black 80%, rgba(0,0,0,0.6) 94%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        />
      </div>
    </div>
  );
};

export default UAEMap;
