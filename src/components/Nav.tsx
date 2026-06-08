import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import Wordmark from "./Wordmark";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/why-uae", label: "Why UAE" },
  { to: "/strategy", label: "Strategy" },
  { to: "/governance", label: "Governance" },
  { to: "/legal", label: "Legal" },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-luxe ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border/40"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-8 py-6">
        <Wordmark small={scrolled} />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active text-foreground" : ""}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="inline-flex items-center justify-center rounded-sm p-2 text-foreground/80 transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 md:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] border-border/40 bg-background/95 backdrop-blur-xl">
            <div className="flex flex-col gap-8 pt-10">
              <div className="flex flex-col gap-6">
                {links.map((l) => (
                  <SheetClose asChild key={l.to}>
                    <NavLink
                      to={l.to}
                      end={l.end}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `text-sm uppercase tracking-[0.25em] text-foreground/70 transition-colors hover:text-foreground ${
                          isActive ? "text-foreground" : ""
                        }`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </SheetClose>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Nav;
