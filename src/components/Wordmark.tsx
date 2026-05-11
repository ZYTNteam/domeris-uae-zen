import { Link } from "react-router-dom";
import logo from "@/assets/domaris-logo.png";

const Wordmark = ({ small = false }: { small?: boolean }) => (
  <Link to="/" className="group inline-flex items-baseline gap-3 select-none">
    <img
      src={logo}
      alt="Domaris Invest"
      style={{ height: "40px", width: "auto", background: "transparent", mixBlendMode: "multiply" }}
    />
    <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
      Invest · UAE
    </span>
  </Link>
);

export default Wordmark;