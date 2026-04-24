import Layout from "@/components/Layout";
import SectionLabel from "@/components/SectionLabel";
import UAEMap from "@/components/UAEMap";
import CinematicHero from "@/components/CinematicHero";
import architecture from "@/assets/architecture.jpg";
import { useState } from "react";

const drivers = [
  { t: "Stability & regulation", d: "A predictable environment for long-duration capital." },
  { t: "Infrastructure & logistics", d: "Ports, airports, and corridors that connect a region." },
  { t: "Regional hub dynamics", d: "A meeting point for capital, talent, and enterprise." },
  { t: "Capital markets maturity", d: "Deepening liquidity and increasingly diverse instruments." },
  { t: "Tourism & growth corridors", d: "Sustained demand expanding the real economy." },
];

const WhyUAE = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Layout>
      {/* Cinematic intro */}
      <section className="relative flex h-[100svh] min-h-[600px] max-h-[900px] items-center justify-center overflow-hidden grain">
        <CinematicHero />
        <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-col items-start px-8">
          <SectionLabel index="—" label="Why UAE" />
          <h1 className="mt-6 max-w-5xl font-serif text-[clamp(3rem,8vw,6.5rem)] font-light leading-[1.02] tracking-tight text-foreground">
            <span className="line-mask delay-1"><span>Why we choose</span></span>
            <br />
            <span className="line-mask delay-2"><span className="italic text-primary">the United Arab Emirates.</span></span>
          </h1>
          <div className="mt-10 hero-rule" />
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground opacity-0 animate-[line-rise_1200ms_var(--ease-luxe)_1300ms_forwards]" style={{ animationFillMode: "forwards" }}>
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

      {/* Map */}
      <section className="relative overflow-hidden bg-secondary/30 py-32 md:py-44">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: `url(${architecture})`, backgroundSize: "cover" }}
        />
        <div className="relative mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-16 px-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel index="II." label="Geography" />
            <h2 className="reveal mt-8 font-serif text-4xl font-light leading-tight text-foreground md:text-5xl">
              <span className="mask-reveal">Seven Emirates,</span>
              <br />
              <span className="mask-reveal italic text-primary/90">one mandate.</span>
            </h2>
            <p className="reveal mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
              Our work is rooted in the cities and corridors that define the
              modern UAE — studied with proximity, not from a distance.
            </p>
          </div>
          <div className="md:col-span-7">
            <UAEMap className="h-[480px] w-full" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WhyUAE;