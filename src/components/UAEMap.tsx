const nodes = [
  { name: "Abu Dhabi", x: 36, y: 70, d: 0 },
  { name: "Dubai", x: 60, y: 52, d: 0.6 },
  { name: "Sharjah", x: 64, y: 48, d: 1.1 },
  { name: "Fujairah", x: 78, y: 46, d: 1.6 },
  { name: "Ras Al Khaimah", x: 72, y: 36, d: 2.0 },
];

const UAEMap = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    aria-hidden="true"
  >
    {/* Stylised UAE outline (abstract) */}
    <path
      d="M14 78 L20 60 L26 50 L34 44 L44 38 L52 34 L60 30 L70 28 L80 32 L86 40 L88 50 L84 58 L78 56 L74 60 L70 66 L64 70 L58 74 L48 78 L38 82 L26 84 Z"
      stroke="hsl(var(--gold) / 0.55)"
      strokeWidth="0.4"
      strokeDasharray="600"
      strokeDashoffset="600"
      style={{ animation: "draw 3.4s cubic-bezier(0.22,1,0.36,1) 0.4s forwards" }}
    />
    {/* Inner contour lines */}
    <path
      d="M22 70 L34 56 L52 46 L72 40 L84 46"
      stroke="hsl(var(--gold) / 0.18)"
      strokeWidth="0.3"
      strokeDasharray="400"
      strokeDashoffset="400"
      style={{ animation: "draw 3.4s cubic-bezier(0.22,1,0.36,1) 0.9s forwards" }}
    />
    <path
      d="M30 78 L44 66 L60 56 L78 50"
      stroke="hsl(var(--gold) / 0.12)"
      strokeWidth="0.3"
      strokeDasharray="400"
      strokeDashoffset="400"
      style={{ animation: "draw 3.4s cubic-bezier(0.22,1,0.36,1) 1.3s forwards" }}
    />
    {nodes.map((n) => (
      <g key={n.name}>
        <circle
          cx={n.x}
          cy={n.y}
          r="2.4"
          fill="hsl(var(--gold) / 0.18)"
          style={{ animation: `pulse-node 3.2s ease-in-out ${n.d}s infinite`, transformOrigin: `${n.x}px ${n.y}px` }}
        />
        <circle cx={n.x} cy={n.y} r="0.6" fill="hsl(var(--gold))" />
        <text
          x={n.x + 3.5}
          y={n.y + 1}
          fontSize="2"
          fill="hsl(var(--foreground) / 0.7)"
          style={{ letterSpacing: "0.2px" }}
        >
          {n.name}
        </text>
      </g>
    ))}
  </svg>
);

export default UAEMap;