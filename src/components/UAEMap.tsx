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
  const [active, setActive] = useState<string | null>(null);
  const activeCity = cities.find((c) => c.name === active) ?? null;
  // Cinematic zoom around hovered city — scale 1.32x with origin at city
  const ZOOM = 1.32;
  const transform = activeCity ? `scale(${ZOOM})` : "scale(1)";
  const transformOrigin = activeCity
    ? `${activeCity.x}% ${activeCity.y}%`
    : "50% 50%";

  return (
    <div className={`relative ${className}`}>
      {/* Map zoom container — overflow hidden so the scaled image stays framed */}
      <div className="relative h-full w-full overflow-hidden">
        {/* The transforming layer holds both the image AND the per-city glow,
            so the glow stays anchored to the city as the map zooms. */}
        <div
          className="relative h-full w-full"
          style={{
            transform,
            transformOrigin,
            transition:
              "transform 800ms cubic-bezier(0.22, 1, 0.36, 1), transform-origin 800ms cubic-bezier(0.22, 1, 0.36, 1)",
            willChange: "transform",
          }}
        >
          <img
            src={reliefMap}
            alt="Embossed relief map of the United Arab Emirates"
            className="pointer-events-none h-full w-full select-none object-contain"
            width={1024}
            height={1024}
            loading="lazy"
            draggable={false}
          />

          {/* Per-city glow + pulsing ring (anchored on the zooming layer) */}
          {cities.map((c) => {
            const isActive = active === c.name;
            return (
              <div
                key={`fx-${c.name}`}
                aria-hidden="true"
                className="pointer-events-none absolute"
                style={{
                  left: `${c.x}%`,
                  top: `${c.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Soft champagne-gold glow */}
                <span
                  className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: isActive ? 22 : 8,
                    height: isActive ? 22 : 8,
                    background: "hsl(var(--gold) / 0.55)",
                    filter: "blur(5px)",
                    opacity: isActive ? 1 : 0,
                    boxShadow: isActive
                      ? "0 0 22px hsl(var(--gold) / 0.7)"
                      : "none",
                    transition:
                      "opacity 600ms ease, width 700ms cubic-bezier(0.22,1,0.36,1), height 700ms cubic-bezier(0.22,1,0.36,1), box-shadow 600ms ease",
                  }}
                />
                {/* Pulsing ring */}
                {isActive && (
                  <span
                    className="absolute left-1/2 top-1/2 block h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                    style={{
                      borderColor: "hsl(var(--gold) / 0.6)",
                      animation: "city-ring 1800ms ease-out infinite",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Invisible hover hotspots — sit ABOVE the zooming layer so the
            zoom doesn't move them out from under the cursor. */}
        {cities.map((c) => (
          <button
            key={`hot-${c.name}`}
            type="button"
            aria-label={c.name}
            onMouseEnter={() => setActive(c.name)}
            onMouseLeave={() => setActive((prev) => (prev === c.name ? null : prev))}
            onFocus={() => setActive(c.name)}
            onBlur={() => setActive((prev) => (prev === c.name ? null : prev))}
            className="absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--gold)/0.6)]"
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
          />
        ))}
      </div>
    </div>
  );
};

export default UAEMap;
