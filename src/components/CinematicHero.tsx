import { useEffect, useRef, useState } from "react";
import dubaiSkyline from "@/assets/dubai-skyline.jpg";

/**
 * CinematicHero — abstract, non-literal scene evoking UAE: dunes, skyline lines,
 * structural grid, coastline curves, drifting gold particles, soft glow nodes.
 * All motion is slow, ease-in-out, parallax-layered.
 */
const CinematicHero = ({ className = "" }: { className?: string }) => {
  const [y, setY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setY(-rect.top);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stable particle positions
  const particles = Array.from({ length: 22 }).map((_, i) => ({
    x: (i * 53) % 100,
    y: (i * 37) % 100,
    d: 14 + (i % 7) * 3,
    delay: (i % 11) * 0.9,
    size: 1 + (i % 3) * 0.6,
  }));

  return (
    <div
      ref={ref}
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {/* Dubai skyline background — slow cinematic drone pan */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 hero-drone-pan"
          style={{
            backgroundImage: `url(${dubaiSkyline})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        />
        {/* Readability overlays — keep elegant/minimal */}
        <div className="absolute inset-0 bg-background/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/85" />
      </div>

      {/* Background grain + gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,_hsl(var(--gold)/0.08),_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_70%,_hsl(var(--gold)/0.06),_transparent_60%)]" />

      {/* Background — soft horizon glow (parallax slowest) */}
      <div
        className="absolute inset-x-0 bottom-[20%] h-[40%] opacity-70"
        style={{
          transform: `translate3d(0, ${y * 0.05}px, 0)`,
          background:
            "radial-gradient(ellipse at 50% 100%, hsl(var(--gold) / 0.18), transparent 65%)",
        }}
      />

      {/* Midground — structural finance grid */}
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        style={{ transform: `translate3d(0, ${y * 0.08}px, 0)` }}
      >
        <defs>
          <pattern id="dgrid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeOpacity="0.06"
              strokeWidth="0.5"
            />
          </pattern>
          <linearGradient id="gridFade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--background))" stopOpacity="0.6" />
            <stop offset="50%" stopColor="hsl(var(--background))" stopOpacity="0" />
            <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#dgrid)" />
        <rect width="1600" height="900" fill="url(#gridFade)" />
      </svg>

      {/* Midground — abstract skyline linework (no literal building) */}
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-0 bottom-0 h-[70%] w-full"
        style={{ transform: `translate3d(0, ${y * 0.12}px, 0)` }}
      >
        <g
          stroke="hsl(var(--foreground))"
          strokeOpacity="0.18"
          strokeWidth="0.8"
          fill="none"
        >
          {/* vertical thin lines suggesting tower silhouettes */}
          <line x1="180" y1="900" x2="180" y2="540" />
          <line x1="220" y1="900" x2="220" y2="600" />
          <line x1="260" y1="900" x2="260" y2="470" />
          <line x1="300" y1="900" x2="300" y2="380" />
          <line x1="340" y1="900" x2="340" y2="430" />
          <line x1="420" y1="900" x2="420" y2="320" />
          <line x1="460" y1="900" x2="460" y2="260" />
          <line x1="500" y1="900" x2="500" y2="200" />
          <line x1="540" y1="900" x2="540" y2="290" />
          <line x1="600" y1="900" x2="600" y2="380" />
          <line x1="700" y1="900" x2="700" y2="430" />
          <line x1="780" y1="900" x2="780" y2="350" />
          <line x1="840" y1="900" x2="840" y2="220" />
          <line x1="880" y1="900" x2="880" y2="160" />
          <line x1="920" y1="900" x2="920" y2="240" />
          <line x1="980" y1="900" x2="980" y2="320" />
          <line x1="1060" y1="900" x2="1060" y2="400" />
          <line x1="1120" y1="900" x2="1120" y2="470" />
          <line x1="1180" y1="900" x2="1180" y2="380" />
          <line x1="1240" y1="900" x2="1240" y2="290" />
          <line x1="1300" y1="900" x2="1300" y2="350" />
          <line x1="1360" y1="900" x2="1360" y2="450" />
          <line x1="1420" y1="900" x2="1420" y2="540" />
        </g>
        {/* a single tall accent line in gold */}
        <line
          x1="880"
          y1="900"
          x2="880"
          y2="120"
          stroke="hsl(var(--gold))"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
      </svg>

      {/* Foreground — dune curves */}
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-x-0 bottom-0 h-full w-full"
        style={{ transform: `translate3d(0, ${y * 0.18}px, 0)` }}
      >
        <defs>
          <linearGradient id="duneA" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity="0.18" />
            <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="duneB" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="0.10" />
            <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path
          d="M0,720 C220,640 420,760 700,690 C960,625 1180,740 1600,660 L1600,900 L0,900 Z"
          fill="url(#duneA)"
        />
        <path
          d="M0,800 C260,740 520,830 820,780 C1120,730 1340,820 1600,760 L1600,900 L0,900 Z"
          fill="url(#duneB)"
        />
        {/* coastline-like curve (top, fluid) */}
        <path
          d="M0,300 C260,260 480,360 760,320 C1040,280 1280,380 1600,330"
          fill="none"
          stroke="hsl(var(--gold))"
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeDasharray="1400"
          strokeDashoffset="1400"
          style={{ animation: "draw 4.5s var(--ease-luxe) 0.6s forwards" }}
        />
      </svg>

      {/* Traveling gold light line — left to right, continuous */}
      <div className="absolute inset-x-0 top-[42%] h-px overflow-hidden">
        <div className="hero-light-sweep h-full w-[40%]" />
      </div>

      {/* Soft glowing nodes (hints of activity, not a map) */}
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        {[
          [340, 360],
          [560, 280],
          [820, 420],
          [1080, 340],
          [1280, 460],
          [720, 540],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle
              cx={cx}
              cy={cy}
              r="2"
              fill="hsl(var(--gold))"
              style={{
                transformOrigin: `${cx}px ${cy}px`,
                animation: `pulse-node 6s ease-in-out ${i * 0.9}s infinite`,
              }}
            />
            <circle
              cx={cx}
              cy={cy}
              r="14"
              fill="hsl(var(--gold))"
              opacity="0.06"
            />
          </g>
        ))}
      </svg>

      {/* Drifting gold particles (capital flow) */}
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <span
            key={i}
            className="hero-particle absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.d}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Glass overlay (premium feel) */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/80 backdrop-blur-[1px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_hsl(var(--background)/0.4)_75%)]" />
    </div>
  );
};

export default CinematicHero;
