import Layout from "@/components/Layout";
import SectionLabel from "@/components/SectionLabel";
import UAEMap from "@/components/UAEMap";
import skylineMist from "@/assets/skyline-mist.jpg";
import dubaiSkyline2 from "@/assets/dubai-skyline-2.jpg";
import { useEffect, useRef, useState } from "react";
import { Compass, MapPin, Building2, Layers, ShieldCheck, Globe2 } from "lucide-react";

const drivers = [
  { t: "Stability & regulation", d: "A predictable environment for long-duration capital." },
  { t: "Infrastructure & logistics", d: "Ports, airports, and corridors that connect a region." },
  { t: "Regional hub dynamics", d: "A meeting point for capital, talent, and enterprise." },
  { t: "Capital markets maturity", d: "Deepening liquidity and increasingly diverse instruments." },
  { t: "Tourism & growth corridors", d: "Sustained demand expanding the real economy." },
];

const valueCards = [
  { icon: ShieldCheck, t: "Strategic Location",        d: "A bridge between global markets." },
  { icon: Building2,   t: "World-Class Infrastructure", d: "Built for movement, designed for scale." },
  { icon: Layers,      t: "Diverse Economy",            d: "Multiple engines of sustainable growth." },
  { icon: MapPin,      t: "Stable Foundation",          d: "Visionary leadership and future-focused governance." },
  { icon: Globe2,      t: "Global Connectivity",        d: "Open, connected and future-ready." },
];

const WhyUAE = () => {
  const [open, setOpen] = useState<number | null>(0);
  const focusRef = useRef<HTMLDivElement>(null);
  const [focusGlow, setFocusGlow] = useState(0);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [cardGlow, setCardGlow] = useState<number[]>([]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // Focus card proximity
      if (focusRef.current) {
        const r = focusRef.current.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const d = Math.hypot(e.clientX - cx, e.clientY - cy);
        const intensity = Math.max(0, 1 - d / 320);
        setFocusGlow(intensity);
      }
      // Value cards proximity
      if (cardsRef.current) {
        const items = Array.from(cardsRef.current.querySelectorAll<HTMLElement>("[data-vcard]"));
        setCardGlow(items.map((el) => {
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const d = Math.hypot(e.clientX - cx, e.clientY - cy);
          return Math.max(0, 1 - d / 260);
        }));
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <Layout>
      {/* Cinematic intro */}
      <section className="relative flex h-[100svh] min-h-[600px] max-h-[900px] items-center justify-center overflow-hidden grain">
        <div
          aria-hidden
          className="absolute inset-0 hero-pan-bg"
          style={{ backgroundImage: `url(${dubaiSkyline2})` }}
        />
        {/* Readability overlays — kept stationary above the panning image */}
        <div className="absolute inset-y-0 left-0 z-[1] w-[55%] bg-gradient-to-r from-background/75 via-background/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-[1] h-[55%] bg-gradient-to-b from-transparent via-background/55 to-background" />
        <div className="absolute inset-x-0 top-0 z-[1] h-[18%] bg-gradient-to-b from-background/35 to-transparent" />
        <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-col items-start px-8">
          <SectionLabel index="—" label="Why UAE" />
          <h1 className="mt-6 max-w-5xl font-serif text-[clamp(3rem,8vw,6.5rem)] font-light leading-[1.02] tracking-tight text-foreground">
            <span className="line-mask delay-1"><span>Why we choose</span></span>
            <br />
            <span className="line-mask delay-2"><span className="italic">the United Arab Emirates.</span></span>
          </h1>
          <div className="mt-10 hero-rule" />
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground opacity-0 animate-[fade-rise_1200ms_var(--ease-luxe)_1300ms_forwards]">
            A jurisdiction defined by stability, ambition, and the architecture of long-term capital.
          </p>
        </div>
      </section>

      {/* Drivers accordion */}
      <section className="bg-background py-32 md:py-44">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-16 px-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionLabel index="I." label="Five Drivers" />
            <h2 className="reveal mt-8 font-serif text-4xl font-light leading-tight text-foreground md:text-5xl">
              <span className="mask-reveal">A foundation we study</span>{" "}
              <span className="mask-reveal italic text-primary/90">continuously.</span>
            </h2>
          </div>
          <ul className="md:col-span-8">
            {drivers.map((d, i) => (
              <li key={d.t} className="reveal border-b border-border/40">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="group flex w-full items-baseline justify-between py-8 text-left transition-colors hover:text-primary"
                >
                  <span className="flex items-baseline gap-6">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-primary">
                      0{i + 1}
                    </span>
                    <span className="font-serif text-2xl font-light md:text-4xl">
                      {d.t}
                    </span>
                  </span>
                  <span className={`text-primary transition-transform duration-700 ease-luxe ${open === i ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                <div
                  className="grid overflow-hidden transition-all duration-700 ease-luxe"
                  style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="max-w-2xl pb-10 text-sm leading-relaxed text-muted-foreground">
                      {d.d}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Geography — luxury interactive */}
      <section className="relative overflow-hidden pt-32 pb-0 md:pt-40"
        style={{
          background:
            "linear-gradient(180deg, hsl(40 33% 97%) 0%, hsl(38 30% 94%) 50%, hsl(40 33% 97%) 100%)",
        }}
      >
        {/* Faint dune contour background */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]" aria-hidden="true">
          <g fill="none" stroke="hsl(var(--gold) / 0.35)" strokeWidth="0.6">
            {Array.from({ length: 14 }).map((_, i) => (
              <path key={i} d={`M -50 ${80 + i * 70} Q 700 ${20 + i * 70} 1600 ${100 + i * 70}`} />
            ))}
          </g>
        </svg>
        <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
        {/* Section gold sweep */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold) / 0.6), transparent)" }} />

        {/* Misty Dubai skyline — full-width, seamlessly faded into ivory on all sides */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[60%] w-full"
          aria-hidden="true"
          style={{
            backgroundImage: `linear-gradient(180deg, hsl(40 33% 97% / 0) 0%, hsl(40 33% 97% / 0.45) 55%, hsl(40 33% 97%) 100%), url(${skylineMist})`,
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
            backgroundRepeat: "no-repeat",
            opacity: 0.5,
            maskImage:
              "linear-gradient(180deg, transparent 0%, black 40%, black 85%, transparent 100%), linear-gradient(90deg, transparent 0%, black 18%, black 82%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, black 40%, black 85%, transparent 100%), linear-gradient(90deg, transparent 0%, black 18%, black 82%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-16 px-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel index="II." label="Geography" />
            <h2 className="reveal mt-8 font-serif text-5xl font-light leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              <span className="mask-reveal">Seven Emirates,</span>
              <br />
              <span className="mask-reveal italic" style={{ color: "hsl(var(--gold-deep))" }}>one mandate.</span>
            </h2>
            <div
              className="reveal mt-8 h-px w-24"
              style={{ background: "linear-gradient(90deg, hsl(var(--gold)), transparent)" }}
            />
            <p className="reveal mt-8 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Our work is rooted in the cities and corridors that define the
              modern UAE — studied with proximity, not from a distance.
            </p>

            {/* UAE-only focus glass card */}
            <div
              ref={focusRef}
              className="reveal mt-12 max-w-md"
              style={{
                transform: `translateY(${-focusGlow * 4}px) scale(${1 + focusGlow * 0.012})`,
                transition: "transform 900ms cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <div
                className="relative rounded-sm border border-border/60 p-7 backdrop-blur-md"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(0 0% 100% / 0.85), hsl(40 30% 95% / 0.65))",
                  boxShadow: `0 30px 60px -40px hsl(var(--gold) / ${0.25 + focusGlow * 0.45}), inset 0 0 0 1px hsl(var(--gold) / ${0.15 + focusGlow * 0.4})`,
                  transition: "box-shadow 900ms cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                {/* Traveling sparkle around the border */}
                <span className="sparkle-border" aria-hidden="true" />
                {/* Flicker overlay */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 20%, hsl(var(--gold) / 0.18), transparent 60%)",
                    opacity: focusGlow,
                    transition: "opacity 700ms ease",
                    mixBlendMode: "multiply",
                  }}
                />
                <div className="relative flex items-start gap-5">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/40"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--gold) / 0.18), transparent)",
                      boxShadow: `0 0 ${10 + focusGlow * 30}px hsl(var(--gold) / ${0.3 + focusGlow * 0.4})`,
                      transition: "box-shadow 700ms ease",
                    }}
                  >
                    <Compass className="h-5 w-5 text-primary" strokeWidth={1.2} />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.42em]" style={{ color: "hsl(var(--gold-deep))" }}>
                      UAE-only focus
                    </div>
                    <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                      All our capital is deployed exclusively within the United Arab Emirates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="reveal">
              <UAEMap className="h-[640px] w-full" />
            </div>
          </div>
        </div>

        {/* Value bar — five icon items with thin gold dividers */}
        <div
          ref={cardsRef}
          className="relative z-10 mx-auto mt-20 max-w-[1320px] px-8 pb-24 md:mt-28"
        >
          <div className="grid grid-cols-2 gap-y-12 sm:grid-cols-3 lg:grid-cols-5 lg:gap-y-0">
            {valueCards.map((c, i) => {
              const Icon = c.icon;
              const g = cardGlow[i] ?? 0;
              return (
                <div
                  key={c.t}
                  data-vcard
                  className="reveal group relative flex flex-col items-center px-4 text-center"
                  style={{
                    transform: `translateY(${-g * 6}px) scale(${1 + g * 0.015})`,
                    transition:
                      "transform 900ms cubic-bezier(0.22,1,0.36,1)",
                    transitionDelay: `${i * 60}ms`,
                  }}
                >
                  {/* Vertical divider (between items, not after the last) */}
                  {i < valueCards.length - 1 && (
                    <span
                      className="pointer-events-none absolute right-0 top-4 hidden h-20 w-px lg:block"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent, hsl(var(--gold) / 0.45), transparent)",
                      }}
                    />
                  )}
                  {/* Icon with soft glow */}
                  <div
                    className="relative flex h-12 w-12 items-center justify-center"
                    style={{
                      transition: "transform 700ms cubic-bezier(0.22,1,0.36,1)",
                      transform: `scale(${1 + g * 0.08})`,
                    }}
                  >
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, hsl(var(--gold) / 0.35), transparent 70%)",
                        filter: "blur(8px)",
                        opacity: 0.3 + g * 0.7,
                        transition: "opacity 700ms ease",
                      }}
                    />
                    <Icon
                      className="relative h-7 w-7"
                      strokeWidth={1.1}
                      style={{
                        color: g > 0.15 ? "hsl(var(--gold))" : "hsl(var(--gold-deep))",
                        transition: "color 600ms ease",
                      }}
                    />
                  </div>
                  <h3
                    className="mt-5 text-[11px] uppercase leading-tight tracking-[0.28em]"
                    style={{
                      color: "hsl(var(--gold-deep))",
                      fontWeight: 500,
                    }}
                  >
                    {c.t}
                  </h3>
                  <p className="mt-3 max-w-[14rem] text-[12px] leading-relaxed text-muted-foreground">
                    {c.d}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WhyUAE;