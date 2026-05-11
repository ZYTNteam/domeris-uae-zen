import { useEffect, useState } from "react";
import logo from "@/assets/domaris-logo.png";

const Loader = () => {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 2700);
    return () => clearTimeout(t);
  }, []);
  if (gone) return null;
  return (
    <div className="loader-veil" aria-hidden>
      <img
        src={logo}
        alt="Domaris Invest"
        className="loader-mark"
        style={{ height: "64px", width: "auto", background: "transparent", mixBlendMode: "multiply" }}
      />
    </div>
  );
};

export default Loader;
