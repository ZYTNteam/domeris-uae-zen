import Layout from "@/components/Layout";
import SectionLabel from "@/components/SectionLabel";

const principles = [
  { t: "Transparency", d: "Clarity in process, position, and performance." },
  { t: "Discipline", d: "A consistent method, exercised without exception." },
  { t: "Accountability", d: "Responsibility held at every level of decision." },
];

const oversight = [
  { t: "Investment Committee", d: "Final authority on every allocation." },
  { t: "Risk Review", d: "Independent challenge prior to commitment." },
  { t: "Operations & Reporting", d: "Stewardship of records and shareholder communication." },
];

const Governance = () => (
  <Layout>
    <section className="bg-background pb-24 pt-44 md:pt-56">
      <div className="mx-auto max-w-[1320px] px-8">
        <SectionLabel index="—" label="Governance" />
        <h1 className="reveal in mt-8 max-w-5xl font-serif text-[clamp(2.6rem,6.5vw,5.5rem)] font-light leading-[1.05] text-foreground">
          The architecture of{" "}
          <span className="italic text-primary/90">trust.</span>
        </h1>
        <div className="gold-rule mt-12 w-40" />
      </div>
    </section>

    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1320px] px-8">
        <SectionLabel index="I." label="Principles" />
        <div className="mt-16 grid grid-cols-1 gap-px bg-border/40 md:grid-cols-3">
          {principles.map((p, i) => (
            <article
              key={p.t}
              className="reveal bg-background p-12"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-primary">
                0{i + 1}
              </span>
              <h3 className="mt-10 font-serif text-3xl font-light text-foreground md:text-4xl">
                {p.t}
              </h3>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-secondary/20 py-32 md:py-44">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-16 px-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <SectionLabel index="II." label="Oversight" />
          <h2 className="reveal mt-8 font-serif text-4xl font-light leading-tight text-foreground md:text-5xl">
            <span className="mask-reveal">Roles,</span>{" "}
            <span className="mask-reveal italic text-primary/90">clearly held.</span>
          </h2>
        </div>
        <ul className="md:col-span-8">
          {oversight.map((o, i) => (
            <li
              key={o.t}
              className="reveal flex flex-col gap-3 border-b border-border/40 py-8 md:flex-row md:items-baseline md:justify-between"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span className="font-serif text-2xl font-light text-foreground md:text-3xl">
                {o.t}
              </span>
              <span className="max-w-md text-sm leading-relaxed text-muted-foreground">
                {o.d}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section className="bg-background py-32 md:py-44">
      <div className="mx-auto max-w-[1320px] px-8">
        <SectionLabel index="III." label="Reporting" />
        <h2 className="reveal mt-8 max-w-3xl font-serif text-4xl font-light leading-tight text-foreground md:text-5xl">
          <span className="mask-reveal">Periodic shareholder reporting,</span>{" "}
          <span className="mask-reveal italic text-primary/90">delivered with care.</span>
        </h2>
      </div>
    </section>
  </Layout>
);

export default Governance;