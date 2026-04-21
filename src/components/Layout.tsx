import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import { useReveal } from "@/hooks/use-reveal";

const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  useReveal();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main key={pathname} className="animate-fade-in">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;