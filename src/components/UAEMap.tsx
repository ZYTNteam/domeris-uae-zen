import { useRef, useState } from "react";
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
const ZOOM = 2.5;

const UAEMap = ({ className = "" }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setOrigin({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMove(e);
    setHovering(true);
  };

  const handleLeave = () => {
    setHovering(false);
    setOrigin({ x: 50, y: 50 });
  };

  return (
    <div className={`relative ${className}`}>
      <div
        ref={containerRef}
        className="relative h-full w-full overflow-hidden cursor-zoom-in"
        onMouseEnter={handleEnter}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <img
          src={reliefMap}
          alt="Embossed relief map of the United Arab Emirates"
          className="pointer-events-none h-full w-full select-none object-contain"
          width={1024}
          height={1024}
          loading="lazy"
          draggable={false}
          style={{
            transform: hovering ? `scale(${ZOOM})` : "scale(1)",
            transformOrigin: `${origin.x}% ${origin.y}%`,
            transition: hovering
              ? "transform 600ms cubic-bezier(0.22, 1, 0.36, 1), transform-origin 200ms ease-out"
              : "transform 700ms cubic-bezier(0.22, 1, 0.36, 1), transform-origin 700ms cubic-bezier(0.22, 1, 0.36, 1)",
            willChange: "transform, transform-origin",
          }}
        />
      </div>
    </div>
  );
};

export default UAEMap;
