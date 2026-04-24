import { useEffect, useRef, useState } from "react";

/**
 * Geographically-grounded UAE outline with seven Emirate capitals.
 * Coordinates are normalized to a 1000x700 viewBox covering roughly
 * 51.5°E–56.5°E, 22.5°N–26.5°N. Coastal cities sit on the Gulf coast.
 */

type City = {
  name: string;
  short: string;
  x: number;
  y: number;
  align?: "left" | "right";
};

const cities: City[] = [
  // Abu Dhabi — on the Gulf coast (island/peninsula)
  { name: "Abu Dhabi", short: "AUH", x: 360, y: 470, align: "left" },
  // Dubai — Gulf coast, NE of Abu Dhabi
  { name: "Dubai", short: "DXB", x: 600, y: 330, align: "right" },
  // Sharjah — just NE of Dubai
  { name: "Sharjah", short: "SHJ", x: 640, y: 305, align: "right" },
  // Ajman — small, NE of Sharjah
  { name: "Ajman", short: "AJM", x: 668, y: 287, align: "right" },
  // Umm Al Quwain
  { name: "Umm Al Quwain", short: "UAQ", x: 700, y: 265, align: "right" },
  // Ras Al Khaimah — far north
  { name: "Ras Al Khaimah", short: "RAK", x: 760, y: 215, align: "right" },
  // Fujairah — east coast (Gulf of Oman)
  { name: "Fujairah", short: "FUJ", x: 855, y: 305, align: "right" },
];

// A more accurate UAE land outline (simplified but recognizable):
// Western desert border with Saudi Arabia, southern Empty Quarter edge,
// Omani border in the east, Musandam exclusion at the north tip,
// then the Arabian Gulf coast back down to Qatar peninsula area.
const UAE_PATH =
  "M 120 470 \
   L 180 430 L 260 410 L 340 405 L 430 415 L 520 430 L 610 445 \
   L 700 470 L 780 500 L 860 520 L 920 540 L 940 560 \
   L 920 590 L 870 605 L 800 612 L 720 615 L 640 612 L 560 608 \
   L 480 600 L 400 590 L 330 575 L 270 555 L 220 530 L 180 510 \
   L 150 495 Z \
   M 880 300 L 900 270 L 905 250 L 895 235 L 875 245 L 870 275 Z"; // Musandam-ish hint

// Cleaner, accurate outline using control over coast.
const UAE_OUTLINE =
  "M 110 520 \
   C 130 500 160 485 200 478 \
   C 250 470 305 470 355 478 \
   C 360 472 372 466 388 462 \
   L 410 458 L 430 452 L 460 446 \
   C 500 440 540 432 580 420 \
   C 615 410 650 395 685 378 \
   C 705 368 720 355 735 340 \
   C 745 320 752 295 760 268 \
   C 768 240 778 218 795 205 \
   C 808 198 822 200 832 212 \
   C 845 230 855 255 868 280 \
   C 880 305 890 330 895 355 \
   C 898 380 892 405 880 425 \
   C 870 442 858 455 845 462 \
   C 870 470 890 485 905 505 \
   C 918 525 922 548 915 568 \
   C 905 588 882 600 855 608 \
   C 800 622 740 626 680 624 \
   C 600 622 520 615 440 605 \
   C 360 595 285 580 220 558 \
   C 175 542 140 530 110 520 Z";

const UAEMap = ({ className = "" }: { className?: string }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setParallax({ x: px * 8, y: py * 6 }));

      // proximity activation
      const sx = (e.clientX - r.left) / r.width * 1000;
      const sy = (e.clientY - r.top) / r.height * 700;
      let nearest: { name: string; d: number } | null = null;
      for (const c of cities) {
        const d = Math.hypot(c.x - sx, c.y - sy);
        if (!nearest || d < nearest.d) nearest = { name: c.name, d };
      }
      setActive(nearest && nearest.d < 90 ? nearest.name : null);
    };
    const onLeave = () => setActive(null);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const activeCity = cities.find((c) => c.name === active);
  // smooth zoom — translate + scale viewBox via CSS transform
  const zoom = activeCity ? 1.08 : 1;
  const tx = activeCity ? (500 - activeCity.x) * 0.06 : 0;
  const ty = activeCity ? (350 - activeCity.y) * 0.06 : 0;

  return (
    <div
      ref={wrapRef}
      className={`relative ${className}`}
      style={{ perspective: "1200px" }}
    >
      {/* Soft ivory pedestal glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, hsl(var(--gold) / 0.10), transparent 65%)",
        }}
      />
      <svg
        viewBox="0 0 1000 700"
        className="relative h-full w-full"
        fill="none"
        aria-label="Geographically accurate map of the United Arab Emirates"
        style={{
          transform: `translate3d(${parallax.x + tx}px, ${parallax.y + ty}px, 0) scale(${zoom})`,
          transition: "transform 1400ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <defs>
          <linearGradient id="landFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(40 35% 95%)" />
            <stop offset="55%" stopColor="hsl(38 30% 90%)" />
            <stop offset="100%" stopColor="hsl(34 28% 82%)" />
          </linearGradient>
          <linearGradient id="landRim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--gold) / 0.85)" />
            <stop offset="100%" stopColor="hsl(var(--gold) / 0.35)" />
          </linearGradient>
          <radialGradient id="emboss" cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor="hsl(0 0% 100% / 0.65)" />
            <stop offset="60%" stopColor="hsl(0 0% 100% / 0)" />
          </radialGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
            <feOffset dx="0" dy="8" result="off" />
            <feComponentTransfer><feFuncA type="linear" slope="0.35" /></feComponentTransfer>
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="goldGlow">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Subtle dune contour lines in the background */}
        <g opacity="0.35" stroke="hsl(var(--gold) / 0.18)" strokeWidth="0.6" fill="none">
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              d={`M 60 ${120 + i * 60} Q 500 ${80 + i * 60} 940 ${140 + i * 60}`}
            />
          ))}
        </g>

        {/* Land — embossed UAE silhouette */}
        <g filter="url(#softShadow)">
          <path d={UAE_OUTLINE} fill="url(#landFill)" stroke="url(#landRim)" strokeWidth="1.4" />
          <path d={UAE_OUTLINE} fill="url(#emboss)" opacity="0.9" />
        </g>

        {/* Inner contour echoes (interior topography) */}
        <g opacity="0.5" stroke="hsl(var(--gold) / 0.22)" strokeWidth="0.7" fill="none">
          <path d="M 220 530 C 320 500 460 490 600 500 C 720 508 820 522 880 540" />
          <path d="M 280 555 C 380 530 500 522 620 530 C 730 538 820 548 870 562" />
          <path d="M 340 575 C 440 558 540 552 640 558 C 740 564 820 572 860 580" />
        </g>

        {/* Coastline accent (Gulf side) */}
        <path
          d="M 110 520 C 130 500 160 485 200 478 C 250 470 305 470 355 478 C 388 462 460 446 580 420 C 650 405 720 380 760 340"
          stroke="hsl(var(--gold) / 0.55)"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="1600"
          strokeDashoffset="1600"
          style={{ animation: "draw 3.6s cubic-bezier(0.22,1,0.36,1) 0.3s forwards" }}
        />

        {/* City markers */}
        {cities.map((c, i) => {
          const isActive = active === c.name;
          const labelX = c.align === "left" ? c.x - 14 : c.x + 14;
          const anchor = c.align === "left" ? "end" : "start";
          return (
            <g key={c.name} style={{ transition: "opacity 600ms ease" }}>
              {/* halo */}
              <circle
                cx={c.x}
                cy={c.y}
                r={isActive ? 18 : 10}
                fill="hsl(var(--gold) / 0.18)"
                style={{
                  transition: "r 900ms cubic-bezier(0.22,1,0.36,1), opacity 700ms ease",
                  opacity: isActive ? 1 : 0.55,
                  filter: isActive ? "url(#goldGlow)" : undefined,
                }}
              />
              <circle
                cx={c.x}
                cy={c.y}
                r="6"
                fill="hsl(var(--gold) / 0.30)"
                style={{
                  animation: `pulse-node 3.6s ease-in-out ${i * 0.4}s infinite`,
                  transformOrigin: `${c.x}px ${c.y}px`,
                }}
              />
              {/* core dot */}
              <circle cx={c.x} cy={c.y} r="2.4" fill="hsl(var(--gold))" />
              {/* leader line */}
              <line
                x1={c.x}
                y1={c.y}
                x2={labelX}
                y2={c.y}
                stroke="hsl(var(--gold) / 0.55)"
                strokeWidth="0.6"
              />
              {/* label */}
              <text
                x={labelX + (c.align === "left" ? -4 : 4)}
                y={c.y - 4}
                fontSize="14"
                fontFamily="'Cormorant Garamond', serif"
                fontStyle="italic"
                fill="hsl(var(--foreground) / 0.9)"
                textAnchor={anchor}
                style={{
                  transition: "fill 600ms ease, font-weight 600ms ease",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {c.name}
              </text>
              <text
                x={labelX + (c.align === "left" ? -4 : 4)}
                y={c.y + 10}
                fontSize="8"
                fontFamily="Inter, sans-serif"
                letterSpacing="3"
                fill="hsl(var(--gold-deep))"
                textAnchor={anchor}
                opacity="0.7"
              >
                {c.short}
              </text>
            </g>
          );
        })}

        {/* Compass rose */}
        <g transform="translate(920, 110)" opacity="0.6">
          <circle r="22" fill="none" stroke="hsl(var(--gold) / 0.5)" strokeWidth="0.6" />
          <path d="M 0 -18 L 3 0 L 0 18 L -3 0 Z" fill="hsl(var(--gold))" opacity="0.85" />
          <path d="M -18 0 L 0 -3 L 18 0 L 0 3 Z" fill="hsl(var(--gold) / 0.5)" />
          <text y="-26" fontSize="8" textAnchor="middle" fill="hsl(var(--gold-deep))" letterSpacing="2">N</text>
        </g>
      </svg>

      {/* Soft gold sweep across the map */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]"
        aria-hidden="true"
      >
        <div
          className="absolute inset-y-0 -left-1/3 w-1/3"
          style={{
            background:
              "linear-gradient(110deg, transparent 30%, hsl(var(--gold) / 0.10) 50%, transparent 70%)",
            animation: "hero-sweep 14s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
};

export default UAEMap;