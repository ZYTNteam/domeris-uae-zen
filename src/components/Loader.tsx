import { useEffect, useState } from "react";

const Loader = () => {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 2700);
    return () => clearTimeout(t);
  }, []);
  if (gone) return null;
  return (
    <div className="loader-veil" aria-hidden>
      <div className="loader-mark">D</div>
    </div>
  );
};

export default Loader;
