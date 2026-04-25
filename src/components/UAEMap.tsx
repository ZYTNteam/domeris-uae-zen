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

        {/* City markers — positioned absolutely on top of the map */}
        {cities.map((c, i) => {
          const isActive = active === c.name;
          return (
            <div
              key={c.name}
              className="absolute"
              style={{
                left: `${c.x}%`,
                top: `${c.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Pulsing ring (active only) */}
              {isActive && (
                <span
                  className="absolute left-1/2 top-1/2 block h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                  style={{
                    borderColor: "hsl(var(--gold) / 0.55)",
                    animation: "city-ring 1800ms ease-out infinite",
                  }}
                />
              )}
              {/* Halo */}
              <span
                className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: isActive ? 28 : 14,
                  height: isActive ? 28 : 14,
                  background: "hsl(var(--gold) / 0.22)",
                  filter: isActive ? "blur(2px)" : "blur(1px)",
                  transition: "all 900ms cubic-bezier(0.22,1,0.36,1)",
                  opacity: isActive ? 1 : 0.7,
                  boxShadow: isActive
                    ? "0 0 24px hsl(var(--gold) / 0.7)"
                    : "0 0 8px hsl(var(--gold) / 0.35)",
                }}
              />
              {/* Soft pulse dot */}
              <span
                className="absolute left-1/2 top-1/2 block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background: "hsl(var(--gold) / 0.45)",
                  animation: `pulse-node 3.6s ease-in-out ${i * 0.4}s infinite`,
                }}
              />
              {/* Core dot */}
              <span
                className="absolute left-1/2 top-1/2 block h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ background: "hsl(var(--gold))" }}
              />
              {/* Leader line + label */}
              <div
                className="absolute top-1/2 flex -translate-y-1/2 items-center"
                style={{
                  left: c.align === "right" ? "100%" : "auto",
                  right: c.align === "left" ? "100%" : "auto",
                  flexDirection: c.align === "left" ? "row-reverse" : "row",
                }}
              >
                <span
                  className="block h-px"
                  style={{
                    width: isActive ? 36 : 28,
                    background:
                      "linear-gradient(90deg, hsl(var(--gold) / 0.7), hsl(var(--gold) / 0.2))",
                    transition: "width 700ms cubic-bezier(0.22,1,0.36,1)",
                  }}
                />
                <span
                  className="whitespace-nowrap px-2 text-[10px] uppercase tracking-[0.28em]"
                  style={{
                    color: isActive
                      ? "hsl(var(--gold-deep))"
                      : "hsl(var(--foreground) / 0.75)",
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: isActive ? "0.32em" : "0.28em",
                    transform: isActive ? "scale(1.06)" : "scale(1)",
                    transformOrigin: c.align === "left" ? "right" : "left",
                    transition:
                      "color 600ms ease, letter-spacing 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1), font-weight 600ms ease",
                    textShadow: isActive
                      ? "0 0 12px hsl(var(--gold) / 0.5)"
                      : "none",
                  }}
                >
                  {c.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UAEMap;
