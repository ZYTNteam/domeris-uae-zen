import Layout from "@/components/Layout";
import SectionLabel from "@/components/SectionLabel";
import CinematicHero from "@/components/CinematicHero";
import architecture from "@/assets/architecture.jpg";
import dunes from "@/assets/dunes.jpg";
import { useRef, useState } from "react";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import reBluewaters from "@/assets/re-bluewaters.jpg";
import reMarina from "@/assets/re-marina.jpeg";
import reJbr from "@/assets/re-jbr.webp";
import reBusinessBay from "@/assets/re-businessbay.webp";

const pillars = [
  { n: "01", t: "UAE Focus", d: "A single market, studied with depth." },
  { n: "02", t: "Capital Discipline", d: "Conviction expressed through restraint." },
  { n: "03", t: "Governance First", d: "Process precedes opportunity." },
];

const drivers = [
  "Policy stability",
  "Infrastructure",
  "Global talent magnet",
  "Liquidity & access",
];

const strategy = [
  { t: "Real Estate", d: "Tangible exposure across the Emirates." },
  { t: "Shareholder-led participation and private leads", d: "Selective, relationship-led participation." },
  { t: "Structured Allocations", d: "Risk shaped through deliberate construction." },
  { t: "Opportunistic UAE Themes", d: "Conviction trades on national tailwinds." },
];

const realEstateLocations = [
  { name: "Bluewaters", img: reBluewaters },
  { name: "Marina", img: reMarina },
  { name: "JBR", img: reJbr },
  { name: "Business Bay", img: reBusinessBay },
];

const timeline = [
  "Sourcing",
  "Underwriting",
  "Risk review",
  "Allocation committee",
  "Ongoing monitoring",
  "Reporting",
];

const Hero = () => (
  <section className="relative flex h-[100svh] min-h-[720px] w-full items-center overflow-hidden grain">
    <CinematicHero />
    <div className="relative z-10 mx-auto w-full max-w-[1320px] px-8">
      <div className="max-w-3xl">
        <p className="text-[10px] uppercase tracking-[0.5em] text-primary animate-[fade-rise_1100ms_var(--ease-luxe)_forwards] opacity-0 [animation-delay:150ms]">
          Established in the United Arab Emirates
        </p>
        <h1 className="mt-8 font-serif text-[clamp(2.8rem,7vw,6.5rem)] font-light leading-[1.02] tracking-tight text-foreground">
          <span className="line-mask delay-1"><span>DOMARIS INVEST.</span></span>
          <br />
          <span className="line-mask delay-2"><span className="italic text-primary/90">A single-family office</span></span>
        </h1>
        <div className="mt-10 hero-rule" />
        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg opacity-0 animate-[fade-rise_1200ms_var(--ease-luxe)_1300ms_forwards]">
          A private UAE family office investing the family's own capital - no external clients, no third-party funds. Built for generational horizons.
        </p>
      </div>
    </div>
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground animate-float-slow">
      Scroll
    </div>
  </section>
);

const Index = () => {
  const timelineRef = useRef<HTMLOListElement>(null);
  const progress = useScrollProgress(timelineRef);
  const [reOpen, setReOpen] = useState(false);
  return (
    <Layout>
      <Hero />

      {/* H2 — Three pillars */}
      <section className="relative bg-background py-32 md:py-44">
        <div className="mx-auto max-w-[1320px] px-8">
          <SectionLabel index="I." label="Principles" />
          <h2 className="reveal mt-8 max-w-3xl font-serif text-4xl font-light leading-tight text-foreground md:text-6xl">
            <span className="mask-reveal">Three commitments,</span>
            <br />
            <span className="mask-reveal italic text-primary/90">held without exception.</span>
          </h2>

          <div className="mt-24 grid grid-cols-1 gap-px bg-border/40 md:grid-cols-3">
            {pillars.map((p, i) => (
              <article
                key={p.t}
                className="reveal luxe-card gold-sweep group relative bg-background p-10 hover:bg-secondary/40"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-primary">
                    {p.n}
                  </span>
                  <span className="h-px w-12 translate-y-2 bg-primary/60 transition-all duration-700 group-hover:w-20" />
                </div>
                <h3 className="mt-16 font-serif text-3xl font-light text-foreground md:text-4xl">
                  {p.t}
                </h3>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  {p.d}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* H3 — UAE Advantage */}
      <section className="relative overflow-hidden bg-secondary/30 py-32 md:py-44">
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-screen"
          style={{ backgroundImage: `url(${architecture})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="relative mx-auto grid max-w-[1320px] grid-cols-1 gap-16 px-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel index="II." label="The UAE Advantage" />
            <h2 className="reveal mt-8 font-serif text-4xl font-light leading-tight text-foreground md:text-5xl">
              <span className="mask-reveal">Drivers we monitor.</span>
            </h2>
            <p className="reveal mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
              The UAE offers a rare combination of stability, infrastructure,
              and openness — a foundation we study continuously.
            </p>
          </div>
          <ul className="md:col-span-7">
            {drivers.map((d, i) => (
              <li
                key={d}
                className="reveal group flex items-baseline justify-between border-b border-border/40 py-8 transition-colors hover:bg-background/40"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="font-serif text-2xl font-light text-foreground transition-colors group-hover:text-primary md:text-4xl">
                  {d}
                </span>
                <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                  0{i + 1}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* H4 — Strategy preview */}
      <section className="relative bg-background py-32 md:py-44">
        <div className="mx-auto max-w-[1320px] px-8">
          <SectionLabel index="III." label="Strategy" />
          <div className="mt-8 flex flex-col items-baseline justify-between gap-6 md:flex-row">
            <h2 className="reveal max-w-2xl font-serif text-4xl font-light leading-tight text-foreground md:text-6xl">
              <span className="mask-reveal italic text-primary/90">Principles</span>
            </h2>
          </div>

          <div className="mt-24 grid grid-cols-1 gap-px bg-border/40 md:grid-cols-2">
            {strategy.map((s, i) => (
              <article
                key={s.t}
                className="reveal luxe-card gold-sweep group relative bg-background p-12 hover:bg-secondary/30"
                style={{ transitionDelay: `${i * 80}ms` }}
                onMouseEnter={i === 0 ? () => setReOpen(true) : undefined}
                onMouseLeave={i === 0 ? () => setReOpen(false) : undefined}
              >
                <span className="text-[10px] uppercase tracking-[0.4em] text-primary">
                  Pillar 0{i + 1}
                </span>
                <h3
                  className={
                    "mt-10 font-serif text-3xl font-light text-foreground md:text-5xl" +
                    (i === 0 ? " cursor-pointer select-none" : "")
                  }
                  onClick={i === 0 ? () => setReOpen((v) => !v) : undefined}
                >
                  {s.t}
                  {i === 0 && (
                    <span
                      className="ml-3 inline-block text-base text-primary/70 transition-transform duration-500"
                      style={{ transform: reOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      aria-hidden
                    >
                      ⌄
                    </span>
                  )}
                </h3>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {s.d}
                </p>
                <div className="mt-12 h-px w-0 bg-primary/70 transition-all duration-700 group-hover:w-32" />

                {i === 0 && (
                  <div
                    className="overflow-hidden transition-[max-height,opacity] duration-700 ease-luxe"
                    style={{
                      maxHeight: reOpen ? "640px" : "0px",
                      opacity: reOpen ? 1 : 0,
                    }}
                  >
                    <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {realEstateLocations.map((loc, idx) => (
                        <figure
                          key={loc.name}
                          className="group/item relative overflow-hidden border border-border/50 bg-secondary/30 transition-all duration-500 hover:border-primary/60"
                          style={{
                            transitionDelay: reOpen ? `${idx * 80}ms` : "0ms",
                            transform: reOpen ? "translateY(0)" : "translateY(8px)",
                            opacity: reOpen ? 1 : 0,
                          }}
                        >
                          <div className="aspect-[4/3] overflow-hidden">
                            <img
                              src={loc.img}
                              alt={loc.name}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-luxe group-hover/item:scale-110"
                            />
                          </div>
                          <figcaption className="flex items-center justify-between px-4 py-3">
                            <span className="font-serif text-sm font-light text-foreground">
                              {loc.name}
                            </span>
                            <span className="text-[9px] uppercase tracking-[0.3em] text-primary">
                              0{idx + 1}
                            </span>
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* H5 — Track record preview */}
      <section className="relative overflow-hidden bg-background py-32 md:py-44">
        <div
          className="absolute inset-x-0 bottom-0 h-[60%] opacity-60"
          style={{ backgroundImage: `url(${dunes})`, backgroundSize: "cover", backgroundPosition: "center top" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="relative mx-auto max-w-[1320px] px-8">
          <SectionLabel index="IV." label="Outcomes" />
          <h2 className="reveal mt-8 max-w-3xl font-serif text-4xl font-light leading-tight text-foreground md:text-6xl">
            <span className="mask-reveal">Reported with care.</span>{" "}
            <span className="mask-reveal italic text-primary/90">Measured over time.</span>
          </h2>

          <div className="mt-24 grid grid-cols-1 gap-px bg-border/40 md:grid-cols-3">
            {[
              { k: "Family distribution", v: "Disclosed in periodic reports" },
              { k: "Capital preservation", v: "Held as a primary mandate" },
              { k: "Deployment", v: "United Arab Emirates only" },
            ].map((m, i) => (
              <div
                key={m.k}
                className="reveal luxe-card bg-background p-12"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p className="text-[10px] uppercase tracking-[0.4em] text-primary">
                  Tile 0{i + 1}
                </p>
                <p className="mt-10 font-serif text-2xl font-light leading-snug text-foreground md:text-3xl">
                  {m.v}
                </p>
                <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  {m.k}
                </p>
              </div>
            ))}
          </div>

          <p className="reveal mt-16 max-w-2xl text-xs italic leading-relaxed text-muted-foreground">
            Past performance is not indicative of future results. Outcomes are
            communicated through formal shareholder reporting.
          </p>
        </div>
      </section>

      {/* H6 — Governance timeline */}
      <section className="relative bg-secondary/20 py-32 md:py-44">
        <div className="mx-auto max-w-[1320px] px-8">
          <SectionLabel index="V." label="Governance" />
          <h2 className="reveal mt-8 max-w-3xl font-serif text-4xl font-light leading-tight text-foreground md:text-6xl">
            <span className="mask-reveal">A process that</span>{" "}
            <span className="mask-reveal italic text-primary/90">precedes the position.</span>
          </h2>

          <div className="mt-24" ref={undefined}>
            <div
              className="timeline-progress hidden h-px w-full md:block"
              style={{ ["--progress" as string]: `${Math.round(progress * 100)}%` }}
            />
            <ol
              ref={timelineRef}
              className="grid grid-cols-1 md:grid-cols-6"
            >
            {timeline.map((step, i) => {
              const threshold = (i + 0.5) / timeline.length;
              const active = progress >= threshold;
              return (
                <li
                  key={step}
                  className="relative flex flex-col gap-6 border-l border-border/40 px-6 py-8 md:border-l-0"
                >
                  <span
                    className="absolute -left-[5px] top-8 h-2.5 w-2.5 rounded-full transition-all duration-700 md:-top-[5px] md:left-6"
                    style={{
                      backgroundColor: active
                        ? "hsl(var(--gold))"
                        : "hsl(var(--border))",
                      boxShadow: active
                        ? "0 0 14px hsl(var(--gold) / 0.6)"
                        : "none",
                      transform: active ? "scale(1.1)" : "scale(1)",
                    }}
                  />
                  <span
                    className="text-[10px] uppercase tracking-[0.4em] text-primary transition-all duration-700 ease-luxe"
                    style={{
                      opacity: active ? 1 : 0,
                      transform: active ? "translateY(0)" : "translateY(8px)",
                    }}
                  >
                    Step 0{i + 1}
                  </span>
                  <span
                    className="font-serif text-2xl font-light text-foreground transition-all duration-1000 ease-luxe"
                    style={{
                      opacity: active ? 1 : 0,
                      transform: active ? "translateY(0)" : "translateY(10px)",
                      transitionDelay: active ? "120ms" : "0ms",
                    }}
                  >
                    {step}
                  </span>
                </li>
              );
            })}
            </ol>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
