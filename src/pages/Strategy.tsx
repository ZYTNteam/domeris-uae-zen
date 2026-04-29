import Layout from "@/components/Layout";
import SectionLabel from "@/components/SectionLabel";

const pillars = [
  { t: "Real Estate", d: "Tangible exposure across the Emirates' real economy." },
  { t: "Shareholder-led participation and private leads", d: "Selective, relationship-led participation in private deals." },
  { t: "Structured Allocations", d: "Risk shaped through deliberate position construction." },
  { t: "Opportunistic UAE Themes", d: "Conviction trades on national tailwinds and dislocations." },
];

const sliders = [
  { t: "Liquidity preference", v: 70 },
  { t: "Downside protection mindset", v: 88 },
  { t: "Monitoring cadence", v: 82 },
];

const Strategy = () => (
  <Layout>
    <section className="relative bg-background pb-24 pt-44 md:pt-56">
      <div className="mx-auto max-w-[1320px] px-8">
        <SectionLabel index="—" label="Strategy" />
        <h1 className="reveal in mt-8 max-w-5xl font-serif text-[clamp(2.6rem,6.5vw,5.5rem)] font-light leading-[1.05] text-foreground">
          Capital deployed with{" "}
          <span className="italic text-primary/90">conviction</span>, governed by{" "}
          <span className="italic text-primary/90">restraint.</span>
        </h1>
        <div className="gold-rule mt-12 w-40" />
        <p className="reveal mt-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          We invest where we can know the asset, the operator, and the
          environment — and where time is on our side.
        </p>
      </div>
    </section>

    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1320px] px-8">
        <SectionLabel index="I." label="Allocation Pillars" />
        <div className="mt-16 grid grid-cols-1 gap-px bg-border/40 md:grid-cols-2">
          {pillars.map((p, i) => (
            <article
              key={p.t}
              className="reveal luxe-card gold-sweep group bg-background p-12 hover:bg-secondary/30"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-primary">
                Pillar 0{i + 1}
              </span>
              <h3 className="mt-10 font-serif text-3xl font-light text-foreground md:text-5xl">
                {p.t}
              </h3>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                {p.d}
              </p>
              <div className="mt-12 h-px w-0 bg-primary/70 transition-all duration-700 group-hover:w-32" />
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-secondary/20 py-32 md:py-44">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-16 px-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <SectionLabel index="II." label="Risk Posture" />
          <h2 className="reveal mt-8 font-serif text-4xl font-light leading-tight text-foreground md:text-5xl">
            <span className="mask-reveal">A temperament,</span>{" "}
            <span className="mask-reveal italic text-primary/90">not a formula.</span>
          </h2>
        </div>
        <div className="md:col-span-8">
          <ul className="space-y-12">
            {sliders.map((s, i) => (
              <li key={s.t} className="reveal" style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-xl text-foreground md:text-2xl">{s.t}</span>
                  <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                    Disposition
                  </span>
                </div>
                <div className="mt-4 h-px w-full bg-border/60">
                  <div
                    className="h-px bg-primary transition-[width] duration-[1600ms] ease-luxe"
                    style={{ width: `${s.v}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  </Layout>
);

export default Strategy;