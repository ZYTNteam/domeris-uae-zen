import Layout from "@/components/Layout";
import SectionLabel from "@/components/SectionLabel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    t: "Disclosures",
    d: "Domaris Invest is a private firm operating in the United Arab Emirates. The information presented on this website is intended for general informational purposes and does not constitute an offer, solicitation, or recommendation to acquire or dispose of any investment. Past performance is not indicative of future results. Performance and distribution information is communicated to shareholders through formal periodic reporting.",
  },
  {
    t: "Privacy",
    d: "We collect only the information necessary to maintain shareholder communications and comply with legal obligations. We do not sell personal information. For inquiries regarding personal data held by Domaris Invest, please contact the firm in writing.",
  },
  {
    t: "Terms",
    d: "Use of this website is subject to these terms. Content is provided 'as is' without warranty. Domaris Invest may revise these terms or update content at any time. By accessing this site you agree to these terms and acknowledge the disclosures above.",
  },
  {
    t: "Jurisdiction",
    d: "This website and the activities of Domaris Invest are governed by the laws of the United Arab Emirates.",
  },
];

const Legal = () => (
  <Layout>
    <section className="bg-background pb-24 pt-44 md:pt-56">
      <div className="mx-auto max-w-[1320px] px-8">
        <SectionLabel index="—" label="Legal" />
        <h1 className="reveal in mt-8 max-w-4xl font-serif text-[clamp(2.4rem,6vw,5rem)] font-light leading-[1.05] text-foreground">
          Disclosures &{" "}
          <span className="italic text-primary/90">notices.</span>
        </h1>
        <div className="gold-rule mt-12 w-40" />
      </div>
    </section>

    <section className="bg-background pb-32 md:pb-44">
      <div className="mx-auto max-w-[1320px] px-8">
        <Accordion type="single" collapsible className="w-full">
          {items.map((it, i) => (
            <AccordionItem
              key={it.t}
              value={it.t}
              className="reveal border-b border-border/40"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <AccordionTrigger className="py-8 hover:no-underline">
                <span className="flex items-baseline gap-6">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-primary">
                    0{i + 1}
                  </span>
                  <span className="font-serif text-2xl font-light text-foreground md:text-4xl">
                    {it.t}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-10">
                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {it.d}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  </Layout>
);

export default Legal;