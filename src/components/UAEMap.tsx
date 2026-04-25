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

type City = {
  name: string;
  x: number; // % of width
  y: number; // % of height
  // label offset relative to marker, in %
  lx: number;
  ly: number;
  align: "left" | "right";
};

const cities: City[] = [
  // Gulf coast — west to north-east
  { name: "Abu Dhabi",      x: 38.0, y: 64.0, lx: -2,  ly: 4,  align: "left"  },
  { name: "Dubai",          x: 55.5, y: 49.5, lx: -2,  ly: -2, align: "left"  },
  { name: "Sharjah",        x: 60.0, y: 45.5, lx: 4,   ly: 0,  align: "right" },
  { name: "Ajman",          x: 62.5, y: 43.0, lx: 4,   ly: 0,  align: "right" },
  { name: "Umm Al Quwain",  x: 65.0, y: 40.0, lx: 4,   ly: 0,  align: "right" },
  { name: "Ras Al Khaimah", x: 71.5, y: 25.0, lx: 4,   ly: -1, align: "right" },
  // Gulf of Oman (east coast)
  { name: "Fujairah",       x: 84.0, y: 38.0, lx: 4,   ly: 0,  align: "right" },
];

const UAEMap = ({ className = "" }: { className?: string }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      // proximity in percentage space
      const sx = px * 100;
      const sy = py * 100;
      let nearest: { name: string; d: number } | null = null;
      for (const c of cities) {
        const d = Math.hypot(c.x - sx, c.y - sy);
        if (!nearest || d < nearest.d) nearest = { name: c.name, d };
      }
      setActive(nearest && nearest.d < 8 ? nearest.name : null);
    };
    const onLeave = () => setActive(null);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`relative ${className}`}
    >
      {/* Map image — static, no zoom or parallax. No glow/halo behind it. */}
      <div className="relative h-full w-full">
        <img
          src={reliefMap}
          alt="Embossed relief map of the United Arab Emirates"
          className="pointer-events-none h-full w-full select-none object-contain"
          width={1024}
          height={1024}
          loading="lazy"
          draggable={false}
        />

        {/* Subtle hover glow on city positions (labels & dots are baked into the map image) */}
        {cities.map((c) => {
          const isActive = active === c.name;
          return (
            <span
              key={c.name}
              aria-hidden="true"
              className="pointer-events-none absolute block -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: `${c.x}%`,
                top: `${c.y}%`,
                width: isActive ? 26 : 10,
                height: isActive ? 26 : 10,
                background: "hsl(var(--gold) / 0.35)",
                filter: "blur(6px)",
                opacity: isActive ? 1 : 0,
                transition:
                  "opacity 600ms ease, width 700ms cubic-bezier(0.22,1,0.36,1), height 700ms cubic-bezier(0.22,1,0.36,1)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UAEMap;
