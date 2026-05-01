import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="relative border-t border-border/40 bg-background">
    <div className="mx-auto max-w-[1320px] px-8 py-16">
      <div className="gold-rule mb-12 w-24" />
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <h3 className="font-serif text-3xl text-foreground md:text-4xl">
            Domaris Invest
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            A private UAE family office investing the family's own capital - no external clients, no third-party funds. Built for generational horizons.
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Jurisdiction
          </p>
          <p className="mt-3 text-sm text-foreground">United Arab Emirates</p>
          <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Contact
          </p>
          <a
            href="mailto:janne_b@domarisinvest.com"
            className="mt-3 inline-block font-serif text-base text-foreground transition-colors duration-500 hover:text-primary"
          >
            janne_b@domarisinvest.com
          </a>
        </div>
        <div className="md:col-span-3">
          <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Information
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/legal" className="text-foreground/80 hover:text-primary transition-colors">Legal</Link></li>
            <li><Link to="/legal" className="text-foreground/80 hover:text-primary transition-colors">Disclosures</Link></li>
            <li><Link to="/legal" className="text-foreground/80 hover:text-primary transition-colors">Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-16 flex flex-col items-start justify-between gap-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:flex-row">
        <span>© {new Date().getFullYear()} Domaris Invest</span>
        <span>Abu Dhabi · Dubai</span>
      </div>
    </div>
  </footer>
);

export default Footer;