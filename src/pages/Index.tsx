import Layout from "@/components/Layout";
import SectionLabel from "@/components/SectionLabel";
import UAEMap from "@/components/UAEMap";
import skyline from "@/assets/skyline-hero.jpg";
import architecture from "@/assets/architecture.jpg";
import dunes from "@/assets/dunes.jpg";
import { useEffect, useState } from "react";

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
  { t: "Real Assets", d: "Tangible exposure across the Emirates." },
  { t: "Private Opportunities", d: "Selective, relationship-led participation." },
  { t: "Structured Allocations", d: "Risk shaped through deliberate construction." },
  { t: "Opportunistic UAE Themes", d: "Conviction trades on national tailwinds." },
];

const timeline = [
  "Sourcing",
  "Underwriting",
  "Risk review",
  "Allocation committee",
  "Ongoing monitoring",
  "Reporting",
];

const Hero = () => {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <section className="relative h-[100svh] min-h-[720px] w-full overflow-hidden grain">
      <div
        className="absolute inset-0 scale-110"
        style={{ transform: `translate3d(0, ${y * 0.2}px, 0) scale(1.1)` }}
      >
        <img
          src={skyline}
          alt="Dubai skyline at dusk"
          className="h-full w-full object-cover opacity-70"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-veil" />
        <div className="absolute inset-0 bg-gradient-radial" />
      </div>

      {/* UAE Map overlay */}
      <UAEMap className="pointer-events-none absolute right-[-6%] top-[18%] hidden h-[70%] w-[60%] opacity-90 md:block" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1320px] flex-col justify-end px-8 pb-24">
        <div className="reveal in max-w-3xl">
          <p className="text-[10px] uppercase tracking-[0.5em] text-primary">
            Established in the United Arab Emirates
          </p>
          <h1 className="mt-8 font-serif text-[clamp(2.8rem,7vw,6.5rem)] font-light leading-[1.02] tracking-tight text-foreground">
            UAE-only investment.
            <br />
            <span className="italic text-primary/90">Built for long horizons.</span>
          </h1>
          <div className="mt-10 gold-rule w-40" />
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            We allocate shareholders' capital exclusively across UAE
            opportunities — with discipline, governance, and patience.
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground animate-float-slow">
        Scroll
      </div>
    </section>
  );
};

const Index = () => {
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
                className="reveal group relative bg-background p-10 transition-all duration-700 ease-luxe hover:bg-secondary/40"
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
              <span className="mask-reveal">How capital is</span>{" "}
              <span className="mask-reveal italic text-primary/90">deployed.</span>
            </h2>
          </div>

          <div className="mt-24 grid grid-cols-1 gap-px bg-border/40 md:grid-cols-2">
            {strategy.map((s, i) => (
              <article
                key={s.t}
                className="reveal group relative bg-background p-12 transition-all duration-700 hover:bg-secondary/30"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="text-[10px] uppercase tracking-[0.4em] text-primary">
                  Pillar 0{i + 1}
                </span>
                <h3 className="mt-10 font-serif text-3xl font-light text-foreground md:text-5xl">
                  {s.t}
                </h3>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {s.d}
                </p>
                <div className="mt-12 h-px w-0 bg-primary/70 transition-all duration-700 group-hover:w-32" />
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
              { k: "Shareholder distributions", v: "Disclosed in periodic reports" },
              { k: "Capital preservation", v: "Held as a primary mandate" },
              { k: "Deployment", v: "United Arab Emirates only" },
            ].map((m, i) => (
              <div
                key={m.k}
                className="reveal bg-background p-12"
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

          <ol className="mt-24 grid grid-cols-1 md:grid-cols-6">
            {timeline.map((step, i) => (
              <li
                key={step}
                className="reveal relative flex flex-col gap-6 border-l border-border/40 px-6 py-8 md:border-l-0 md:border-t"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <span className="absolute -left-[5px] top-8 h-2.5 w-2.5 rounded-full bg-primary md:-top-[5px] md:left-6" />
                <span className="text-[10px] uppercase tracking-[0.4em] text-primary">
                  Step 0{i + 1}
                </span>
                <span className="font-serif text-2xl font-light text-foreground">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
