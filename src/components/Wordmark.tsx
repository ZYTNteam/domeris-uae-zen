import { Link } from "react-router-dom";

const Wordmark = ({ small = false }: { small?: boolean }) => (
  <Link to="/" className="group inline-flex items-baseline gap-3 select-none">
    <span
      className={`font-serif tracking-[0.35em] ${
        small ? "text-base" : "text-xl"
      } text-foreground transition-colors group-hover:text-primary`}
    >
      DOMERIS
    </span>
    <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
      Investment · UAE
    </span>
  </Link>
);

export default Wordmark;